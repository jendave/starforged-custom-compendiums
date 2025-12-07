if (!canvas.tokens.controlled.length) {
    ui.notifications.warn("Please select at least one token.");
    return;
}

const statusDesired = "none";

for (let token of canvas.tokens.controlled) {
    const actor = token.actor;
    const data = {
        system: {
            combatPosition: statusDesired,
        },
    };
    await actor.update(data);
}
