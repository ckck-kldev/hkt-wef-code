const cards = [
    ["Spade", "A"],
    ["Diamond", "J"],
    ["Club", "3"],
    ["Heart", "6"],
    ["Spade", "K"],
    ["Club", "2"],
    ["Heart", "Q"],
    ["Spade", "6"],
    ["Heart", "J"],
    ["Spade", "10"],
    ["Club", "4"],
    ["Diamond", "Q"],
    ["Diamond", "3"],
    ["Heart", "4"],
    ["Club", "7"],
  ];



// Without using for-loop, try to do the following with map, filter, reduce :
// 1. Count the number of card which is of suit Spade ♠️. (Hints: using reduce)

let countSpade = cards.reduce(function(previous, current, index) {
  if (cards[index][0] == "Spade") {
    return previous + 1;
  } else {
    return previous;
  }
}, 0)
console.log(`1. The number of the card with suit Spade are ${countSpade}.` + '\n')


// 2. Remove all the card that is smaller than ["Club", "3"].

let removeSmallCards = cards.filter(function(card, index) {
  if ((Number.isNaN(Number.parseInt(cards[index][1])) != true)) {
    if ((Number.parseInt(cards[index][1]) >= 3) && ((cards[index][0]) != "Diamond")) {
      return true;
    }
  } else {
    return true;
  }
})
removeSmallCards = removeSmallCards.map(function(value, index, array) {
  return value.join(" ");
})

console.log('2. After remove the card smaller than Club 3: \n' + removeSmallCards.join(", ") + '\n')


// 3. Count the number of card which is of suit Diamond ♦️ or Heart ♥️ and with the rank larger than or equal to J.

let countDH3 = cards.reduce(function(previous, current, index) {
  if (((cards[index][0] == "Diamond") || (cards[index][0] == "Heart")) && (Number.isNaN(Number.parseInt(cards[index][1])))) {
    return previous + 1;
  } else {
    return previous;
  }
}, 0)

console.log('3. The number of card with ♦️ or Heart ♥️ and larger than or equal to J are: ' + countDH3 + '\n')


// 4. Replace all of the cards with suit Club ♣️ to suit Diamond ♦️, keeping the same rank.

let replaceCards = cards.map(function(value,index) {
  if (value[0] = "Club") {
    cards
  }
})


// 5. Replace all of the cards with rank A to rank 2. Keeping the same suit.
