import useSound from 'use-sound';

export const useGameSounds = () => {
  const [playBet] = useSound('/sounds/bet.mp3', { volume: 0.5 });
  const [playWin] = useSound('/sounds/win.mp3', { volume: 0.5 });
  const [playLose] = useSound('/sounds/lose.mp3', { volume: 0.25 });
  const [playTick] = useSound('/sounds/tick.mp3', { volume: 0.25 });

  return {
    playBet,
    playWin,
    playLose,
    playTick,
  };
};