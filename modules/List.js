/* exported List */
const List = (() => {
  const sortDescendingBy = key => array =>
    array.sort((elementA, elementB) => elementB[key] - elementA[key])


  const map = fun => arr =>
    arr.map(fun)


  return Object.freeze({
    sortDescendingBy,
    map,
  })
})()
