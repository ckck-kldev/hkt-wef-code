const date = new Date();
const newTime = date.getTime() + Math.pow(10, 9);

newDate = new Date(newTime)

console.log(date, newTime, newDate)