export default function getTimeDiff(pastTime:string) {
  const currentTime = new Date();

  const pastDate = new Date(pastTime);

  const timeDiff = Number(currentTime) - Number(pastDate);

  let seconds = Math.floor(timeDiff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  days %= 30;
  hours %= 24;
  minutes %= 60;
  seconds %= 60;

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}
