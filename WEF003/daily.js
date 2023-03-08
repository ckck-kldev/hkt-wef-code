// Scrabble scores from a legacy system.

const scores = [
    ['1', 'A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    ['2', 'D', 'G'],
    ['3', 'B', 'C', 'M', 'P'],
    ['4', 'F', 'H', 'V', 'W', 'Y'],
    ['5', 'K'],
    ['8', 'J', 'X'],
    ['10', 'Q', 'Z']
]

function scrabbleScore(inputText) {
    inputText = inputText.toUpperCase()
    let prev = 0
    let curr = 0
    let textsArray = inputText.split('')
    for (let i = 0; i < textsArray.length; i++) {
        for (let score of scores) {
            if (score.find(function(scoreText, index) {
                return scoreText == textsArray[i];
            })) {
                curr = parseInt(score[0])
            }
        }
        if (textsArray[i] == " ") {
        } else {
            prev = prev + curr
        }
    }
}


scrabbleScore('hi bye');