const date = new Date();

const time = date.getTime();

const addedTime = time + Math.pow(10, 9)

const newDate = new Date(addedTime).toLocaleDateString()

console.log(newDate)