function MapList() {
  let array = new Array(10);
  for (let i = 0; i < 10; i++) {
    array[i] = new Array();
  }
  function append(key, value) {
    let index = hash(key);
    console.log("append", key, "->", index);
    let box = array[index].find((box) => box.key == key);
    if (box) {
      box.values.push(value);
    } else {
      box = { key, values: [value] };
      array[index].push(box);
    }
  }
  function getAll(key) {
    let index = hash(key);
    let box = array[index].find((box) => box.key == key);
    return box?.values || []
  }
  function hash(key) {
    let acc = 0;
    for (let i = 0; i < key.length; i++) {
      let int = key.charCodeAt(i);
      acc = (acc * 10 + int) % 10;
    }
    return acc;
  }
  return {
    append,
    getAll,
  };
}

function set() {
    let map = MapList()
  function add(value) {
    map.append(value, 1)
  }
  function remove(value) {}
  function has(value) {
    return map.getAll(value).length == 1
  }
  return {
    add,
    delete: remove,
    has,
  };
}

let students = set()

students.add('alice')
students.add('bob')
