export function generateCards() {
  const numbers = [1, 2, 3, 1, 2, 3];
  return shuffle(numbers).map((number, index) => ({
    id: index,
    number,
    isFlipped: false,
    isMatched: false,
  }));
}

export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}