// Cannot reference materials by name like assets, so this gets the correct Phaser.Physics.P2.Material from game state.
export const getMaterial = (game, name) => game.physics.p2.materials.find(material => material.name === name);
