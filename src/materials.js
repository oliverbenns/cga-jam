export const bounce = {
  friction: 0.3,     // Friction to use in the contact of these two materials.
  restitution: 1,  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
  stiffness: 1e7,    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
  relaxation: 3,     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
  frictionStiffness: 1e7,    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
  frictionRelaxation: 3,     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
  surfaceVelocity: 0,        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
};
