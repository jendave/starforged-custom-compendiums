const target = game.user.targets.first();
let sequence = new Sequence()
    .effect()
    .file("jb2a.energy_beam.normal.blue.01")
    .attachTo(token)
    .stretchTo(target, { attachTo: true })
    .persist()
    .duration(1)
    .scale({ x: 1.0, y: 0.5 })
    .play();