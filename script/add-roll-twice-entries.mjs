#!/usr/bin/env node
/**
 * Convert roll-instruction results into document results that reference the
 * same roll table (Foundry rolls multiple times on overlapping ranges).
 *
 * Handles "Roll twice" (2 rows), "Roll three times" (3 rows), and common
 * variants (parenthetical, semicolon, "roll twice more on this table", etc.).
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packDir = path.join(__dirname, '../json-packs/starforged-custom-oracles')

const MODULE = 'starforged-custom-oracles'
const COMPENDIUM = 'starforgedcustomoracles'

function resultPlainText(result) {
	const raw = result.description ?? result.text ?? ''
	return raw.replace(/<\/?p>/gi, '').trim()
}

function rollInstructionInfo(text) {
	if (!text) return null
	const trimmed = text.replace(/<\/?p>/gi, '').trim()
	const normalized = trimmed.replace(/\.+$/, '').toLowerCase()

	if (normalized === 'roll twice') {
		return { count: 2, label: trimmed }
	}
	if (normalized === 'roll three times') {
		return { count: 3, label: trimmed }
	}
	if (/\(roll twice\)$/.test(normalized)) {
		return { count: 2, label: trimmed }
	}
	if (/\(roll three times\)$/.test(normalized)) {
		return { count: 3, label: trimmed }
	}
	if (normalized.startsWith('roll twice more on this table')) {
		return { count: 2, label: trimmed }
	}
	if (normalized.startsWith('roll twice;')) {
		return { count: 2, label: trimmed }
	}
	if (normalized.startsWith('roll twice and')) {
		return { count: 2, label: trimmed }
	}
	return null
}

function instructionKey(result) {
	const info = rollInstructionInfo(resultPlainText(result))
	if (!info) return null
	return `${result.range[0]}-${result.range[1]}:${info.count}:${info.label.toLowerCase()}`
}

function genId(existing) {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	do {
		let id = ''
		const bytes = crypto.randomBytes(16)
		for (let i = 0; i < 16; i++) id += chars[bytes[i] % chars.length]
		if (!existing.has(id)) return id
	} while (true)
}

function documentUuid(tableId) {
	return `Compendium.${MODULE}.${COMPENDIUM}.RollTable.${tableId}`
}

function makeDocumentResult(source, tableId, tableName, id, label) {
	return {
		range: [...source.range],
		_id: id,
		type: 'document',
		weight: source.weight ?? 1,
		drawn: false,
		flags: {},
		img: source.img ?? 'icons/dice/d10black.svg',
		_stats: source._stats ?? {
			coreVersion: '13.351',
			systemId: null,
			systemVersion: null,
			createdTime: null,
			modifiedTime: null,
			lastModifiedBy: null,
			compendiumSource: null,
			duplicateSource: null,
			exportSource: null
		},
		description: `<p>${label}</p>`,
		name: tableName,
		documentUuid: documentUuid(tableId),
		_key: `!tables.results!${tableId}.${id}`
	}
}

function processTable(doc) {
	const tableId = doc._id
	if (!tableId || !doc.results) return false

	const expandedByKey = new Map()
	for (const result of doc.results) {
		const key = instructionKey(result)
		if (!key) continue
		if (!expandedByKey.has(key)) expandedByKey.set(key, [])
		expandedByKey.get(key).push(result)
	}

	if (expandedByKey.size === 0) return false

	let changed = false
	const newResults = []
	const existingIds = new Set(doc.results.map((r) => r._id))

	for (const result of doc.results) {
		const key = instructionKey(result)
		if (!key) {
			newResults.push(result)
			continue
		}

		if (expandedByKey.get(key)[0] !== result) {
			continue
		}

		const info = rollInstructionInfo(resultPlainText(result))
		if (!info) {
			newResults.push(result)
			continue
		}

		const group = expandedByKey.get(key)
		const documentRows = group.filter((r) => r.type === 'document')
		if (documentRows.length >= info.count) {
			newResults.push(...documentRows.slice(0, info.count))
			continue
		}

		changed = true
		const source = group.find((r) => r.type !== 'document') ?? result
		const ids = documentRows.map((r) => r._id)
		if (ids.length === 0 && source._id) {
			ids.push(source._id)
		}
		while (ids.length < info.count) {
			const id = genId(existingIds)
			existingIds.add(id)
			ids.push(id)
		}
		for (const id of ids.slice(0, info.count)) {
			newResults.push(
				makeDocumentResult(source, tableId, doc.name, id, info.label)
			)
		}
	}

	if (changed) {
		doc.results = newResults
	}
	return changed
}

let updated = 0
for (const file of fs.readdirSync(packDir).sort()) {
	if (!file.endsWith('.json')) continue
	const filePath = path.join(packDir, file)
	const doc = JSON.parse(fs.readFileSync(filePath, 'utf8'))
	if (!doc.results) continue
	if (!processTable(doc)) continue
	fs.writeFileSync(filePath, `${JSON.stringify(doc, null, 2)}\n`)
	console.log(`updated ${file}`)
	updated++
}

console.log(`\nDone. Updated ${updated} tables.`)
