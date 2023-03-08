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

  function compareCard(cardA, cardB) {
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    const suits = ["Diamond", "Club", "Heart", "Spade"];
    const [suitA, rankA] = cardA;
    const [suitB, rankB] = cardB;
    const ranksDiff = ranks.indexOf(rankA) - ranks.indexOf(rankB);
    if (ranksDiff !== 0) {
      return ranksDiff;
    } else {
      return suits.indexOf(suitA) - suits.indexOf(suitB);
    }
  }

// Count the number of card which is of suit Spade. (Hints: using reduce)

let numberOfSpadeCards = cards.reduce(function(prev, curr, index) {
    if (cards[index][0] == "Spade") {
        return prev + 1;
    } else {
        return prev;
    }
}, 0)

console.log("1. The number of card which is of suit Spade: " + numberOfSpadeCards)
console.log(`\n`)

// Remove all the card that is smaller than ["Club", "3"].

let removeClub3 = cards.filter(function(card, index) {
    if (Number.isNaN(Number.parseInt(cards[index][1])) != true) {
        // console.log(cards[index][0])
        if ((Number.parseInt(cards[index][1]) > 3) && (cards[index][0] == "Diamond" || "Club")) {
            // console.log(Number.parseInt(cards[index][1]))
            return true
        }
    } else {
        return true;
    }
    
    // console.log(cards[index][1])
})

function display(array) {
    for (let data of array) {
        console.log(data.toString())
    }
}

console.log(`2. After remove all the card that is smaller than ["Club", "3"]:`);
// console.log(removeClub3)
console.log(display(removeClub3))
console.log(`\n`)


// Count the number of card which is of suit Diamond or Heart and with the rank larger than or equal to J.

let numberOfDH3Cards = cards.reduce(function(prev, current, index) {
    // console.log(cards[index][0], cards[index][1])
    // console.log((cards[index][0] == ("Heart") || cards[index][0] == ("Diamond")) && ((Number.parseInt(cards[index][1]) > 3) || (Number.isNaN(Number.parseInt(cards[index][1])) == true)))
    if ((cards[index][0] == ("Heart") || cards[index][0] == ("Diamond")) && ((Number.parseInt(cards[index][1]) > 3) || (Number.isNaN(Number.parseInt(cards[index][1])) == true))) {
        return prev + 1;
    } else {
        return prev;
    }
        
}, 0)

console.log(`3. The number of card which is of suit Diamond or Heart and with the rank larger than or equal to J: ` + numberOfDH3Cards)
console.log(`\n`)

// Replace all of the cards with suit Club to suit Diamond, keeping the same rank.

let replaceCtoD = cards.map(function(array, index) {
    if (array[0] == "Club") {
        array[0] = "Diamond"
        // console.log(array)
    } else {
        // console.log(array)
    }
    return array;
})

console.log(`4. After replace all of the cards with suit Club to suit Diamond: `)
console.log(display(replaceCtoD))
console.log(`\n`)

// Replace all of the cards with rank A to rank 2. Keeping the same suit.

let replaceAto2 = cards.map(function(array, index) {
    if (array[1] == "A") {
        array[1] = "2"
        // console.log(array)
    } else {

    }
    return array;
})

console.log(`5. After replace all of the cards with rank A to rank 2: `)
console.log(display(replaceAto2))
