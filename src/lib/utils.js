// Cannot reference materials by name like assets, so this gets the correct Phaser.Physics.P2.Material from game state.
export const getMaterial = (game, name) => game.physics.p2.materials.find(material => material.name === name);

// Collision groups don't have names, so this function creates one with a name so we can easily reference and get later on.
// Don't want to just add them to a new object in game incase this overwrites anything (now or in future Phaser).
export const createCollisionGroup = (game, name) => {
  const collisionGroup = game.physics.p2.createCollisionGroup();
  collisionGroup.name = name;

  return collisionGroup;
};

export const getCollisionGroup = (game, name) => game.physics.p2.collisionGroups.find(group => group.name === name);
