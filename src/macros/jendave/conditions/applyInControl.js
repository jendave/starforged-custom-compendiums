if (!canvas.tokens.controlled.length) {
    ui.notifications.warn("Please select at least one token.");
    return;
}

const statusDesired = "inControl";

for (let token of canvas.tokens.controlled) {
    const actor = token.actor;

    const existingStatus = actor.system.combatPosition === statusDesired;
    if (existingStatus) {
        ui.notifications.info(`${token.name} is already ${statusDesired}.`);
    } else {
        const data = {
            system: {
                combatPosition: statusDesired,
            },
        };
        await actor.update(data);
    }
}
