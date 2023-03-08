
let boxes = document.querySelectorAll(".box")
let turn = 1;

const isSubset = (array1, array2) =>
  array2.every((element) => array1.includes(element));

const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]


for (let box of boxes) {

  box.addEventListener("click",function(event) {
    if (turn % 2 == 1 && box.innerHTML == "") {
      box.innerHTML = '<i class="bi bi-x-lg x-player"></i>'
      turn++;
    } else if (turn % 2 == 0 && box.innerHTML == "") {
      box.innerHTML = '<i class="bi bi-circle o-player"></i>'
      turn++;
    }
    // console.log(boxes)

    // console.log(boxes[0].innerHTML)

    let htmlArr = []
    let scoreArr = []
    for (let innerText of boxes) {
      if (innerText.innerHTML == "") {
        htmlArr.push(null)
      } else if (innerText.innerHTML == '<i class="bi bi-x-lg x-player"></i>') {
        htmlArr.push(true)
      } else if (innerText.innerHTML == '<i class="bi bi-circle o-player"></i>') {
        htmlArr.push(false)
      }
      // console.log(innerText.innerHTML)
      
      

      let testArr = []
      
      if (htmlArr.length == 9){
        for (let i = 0; i < htmlArr.length; i++) {
          if (htmlArr[i] == true) {
            testArr.push(i)
          }
        }
        for (let winningCondition of winningConditions) {
        if (isSubset(testArr, winningCondition)) {
          console.log("win")
        }
          
        }
        // console.log(htmlArr, testArr)
      }
    }
  })
}
