function LinkedList() {
  let head = null
  function push(value) {
    head = {
      value,
      tail: head,
      
    }
    console.log(head, value)
  }
  function printAllValues() {
    if (!head) {
      console.log(' <empty>')
    }

    let pointer = head
    while (pointer) {
      console.log('-', pointer.value)
      pointer = pointer.tail
    }
  }
  function getSize() {
    let size = 0
    let pointer = head 
    while (pointer ) {
      size++;
      pointer=pointer.tail
    }
  }
  function get(index) {}
  function toArray() {}
  function remove(index) {}
  return {
    push,
    printAllValues,
    getSize,
  }
}

let students = LinkedList()

console.log('1. empty list')
students.printAllValues()
console.assert(students.getSize()===0, `size should be 0`)

console.log('2. pushed alice')
students.push('alice')
students.printAllValues()
console.assert(students.getSize()===1, `size should be 1`)

console.log('3. pushed bob')
students.push('bob')
students.printAllValues()
console.assert(students.getSize()===2, `size should be 2`)

console.log('4. pushed charlie')
students.push('charlie')
students.printAllValues()
console.assert(students.getSize()===3, `size should be 3`)

