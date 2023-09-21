/* global View:readonly Queries:readonly Events:readonly */

let cache = Object.freeze({})
let currentSearch = ''

const selectAndShowArticles = () => {
  const searchedArticles = cache[currentSearch]
  console.log(searchedArticles)
}

const saveArticlesInCache = key => searchedArticles => {
  cache = Object.freeze({
    ...cache,
    [key]: searchedArticles,
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
    selectAndShowArticles()
  } else {
    Queries
      .search(searchedValue)
      .then(saveArticlesInCache(searchedValue))
      .then(selectAndShowArticles)
  }
}

searchButton.addEventListener('click', searchEventListener)
searchInput.addEventListener('keyup', Events.onEnter(searchEventListener))
