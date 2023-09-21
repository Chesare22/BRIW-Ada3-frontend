/* global View:readonly Queries:readonly Events:readonly */

let cache = Object.freeze({})
let currentSearch = ''

const selectAndShowTables = () => {
  const searchedTables = cache[currentSearch]
  View.showTables(searchedTables)
}

const saveTablesInCache = key => searchedTables => {
  cache = Object.freeze({
    ...cache,
    [key]: searchedTables.tables,
  })
}

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

const searchEventListener = () => {
  const searchedValue = searchInput.value
  if (searchedValue === '') {
    View.showErrorMessage('La búsqueda no puede ser vacía')
    return
  } else {
    View.hideErrorMessage()
  }

  currentSearch = searchedValue

  if (cache[searchedValue]) {
    selectAndShowTables()
  } else {
    Queries
      .search(searchedValue)
      .then(saveTablesInCache(searchedValue))
      .then(selectAndShowTables)
  }
}

searchButton.addEventListener('click', searchEventListener)
searchInput.addEventListener('keyup', Events.onEnter(searchEventListener))
