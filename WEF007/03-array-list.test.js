function Array(length) {



  let data = []
  function checkIndex(index) {
    if (index < 0) throw new Error('index should be at least zero')
    if (index >= length) throw new Error('index should be less than ' + length)
  }
  function set(index, value) {
    checkIndex(index)
    data[index] = value
  }
  function get(index) {
    checkIndex(index)
    return data[index]
  }
  return {
    length,
    get,
    set,
  }
}

function ArrayList(capacity) {
  let array = Array(capacity)
  let size = 0
  function checkIndex(index) {
    if (index < 0) throw new Error('index should be at least zero')
    if (index >= size) throw new Error('index should be less than ' + size)
  }
  function push(value) {
    if (size < capacity) {
      array.set(size, value)
      size++
      return
    }

    let newArray = Array(Math.ceil(capacity * 1.5))
    

    for (let i = 0; i < capacity; i++) {
      let value = array.get(i)
      newArray.set(i, value)
    }
    newArray.set(capacity, value)
    size++
    array = newArray
    capacity = Math.ceil(capacity * 1.5)

    console.log(capacity, newArray)
  }
  function getSize() {
    return size
  }
  function get(index) {
    checkIndex(index)
    return array.get(index)
  }
  function set(index, value) {
    checkIndex(index)
    array.set(index, value)
  }
  return {
    getSize,
    set,
    get,
    push,
  }
}

let scores = ArrayList(4)

console.assert(scores.getSize() === 0, 'should be empty initially')

scores.push(6)

console.assert(
  scores.getSize() === 1,
  'the size should be 1, got ' + scores.getSize(),
)

console.assert(scores.get(0) === 6, 'should get first element')

let error = null
try {
  scores.get(1)
} catch (err) {
  error = err
}
console.assert(error != null, 'should reject getting by unused index')

scores.push(1)
scores.push(1)
scores.push(1)
console.assert(
  scores.getSize() === 4,
  'the size should be 4, got ' + scores.getSize(),
)

scores.push(10)
console.assert(
  scores.getSize() === 5,
  'the list should auto expand, new size should be 5, got ' + scores.getSize(),
)

console.assert(scores.get(4) === 10, 'should get last element')


scores.push(15)

console.assert(scores.getSize() === 6, 'should be 6')

scores.push(17)

console.assert(scores.getSize() === 7, 'should be 7')


console.log(scores.getSize(), scores.get(6))


