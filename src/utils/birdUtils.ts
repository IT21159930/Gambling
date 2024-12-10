export function generateBirds(): Bird[] {
  const values = [-50, -30, -20, 20, 30, 50];
  return values.map((value, index) => ({
    id: index,
    value,
    position: {
      x: Math.random() * window.innerWidth * 0.8,
      y: Math.random() * window.innerHeight * 0.6,
    },
    direction: Math.random() * Math.PI * 2,
    speed: 2 + Math.random() * 2,
    isClicked: false,
  }));
}

export function updateBirdPosition(bird: Bird): Bird {
  const newX = bird.position.x + Math.cos(bird.direction) * bird.speed;
  const newY = bird.position.y + Math.sin(bird.direction) * bird.speed;

  // Bounce off walls
  let newDirection = bird.direction;
  if (newX < 0 || newX > window.innerWidth * 0.8) {
    newDirection = Math.PI - newDirection;
  }
  if (newY < 0 || newY > window.innerHeight * 0.6) {
    newDirection = -newDirection;
  }

  return {
    ...bird,
    position: {
      x: Math.max(0, Math.min(newX, window.innerWidth * 0.8)),
      y: Math.max(0, Math.min(newY, window.innerHeight * 0.6)),
    },
    direction: newDirection,
  };
}