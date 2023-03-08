function MapList() {
  let array = new Array(10)
  for (let i = 0; i < 10; i++) {
    array[i] = new Array()
  }
  function append(key, value) {
    let index = hash(key)
    console.log('append', key, '->', index)
    let box = array[index].find(box => box.key == key)
    if (box) {
      box.values.push(value)
    } else {
      box = { key, values: [value] }
      array[index].push(box)
    }
  }
  function getAll(key) {
    let index = hash(key)
    let box = array[index].find(box => box.key == key)
    return box.values
  }
  function hash(key) {
    let acc = 0
    for (let i = 0; i < key.length; i++) {
      let int = key.charCodeAt(i)
      acc = (acc * 10 + int) % 10
    }
    return acc
  }
  return {
    append,
    getAll,
  }
}

let map = MapList()

map.append('alice', 20)
map.append('bob', 30)
map.append('alice', 40)

map.append('alico', 50)

console.log('alice:', map.getAll('alice'))
console.log('bob:', map.getAll('bob'))
console.log('alico:', map.getAll('alico'))
