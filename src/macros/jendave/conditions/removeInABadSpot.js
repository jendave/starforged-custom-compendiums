if (!canvas.tokens.controlled.length) {
    ui.notifications.warn("Please select at least one token.");
    return;
}

const positionDesired = "none";
const positionOther = "inControl";

for (let token of canvas.tokens.controlled) {
    const actor = token.actor;
    if (actor.system.combatPosition === positionOther) {
        continue;
    } else {
        const data = {
            system: {
                combatPosition: positionDesired,
            },
        };
        await actor.update(data);
    }
}
