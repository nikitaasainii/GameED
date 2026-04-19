export const playClick = () => {
  const audio = new Audio("/sound/click1.wav");
  audio.play().catch(e => console.log("Audio play blocked until user interacts"));
};