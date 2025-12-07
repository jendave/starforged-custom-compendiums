if (!canvas.tokens.controlled.length) {
    ui.notifications.warn("Please select at least one token.");
    return;
}

const statusField = "permanentlyHarmed";
const statusDesired = true;

for (let token of canvas.tokens.controlled) {
    const actor = token.actor;
    const data = {
        system: {
            debility: {
                [statusField]: statusDesired,
            },
        },
    };
    await actor.update(data);
}
