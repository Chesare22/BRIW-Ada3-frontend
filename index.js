/* global View:readonly Queries:readonly Events:readonly List:readonly */

let cache = Object.freeze({})
let currentSearch = ''

const selectAndShowArticles = () => {
  const searchedArticles = cache[currentSearch]
  const articlesOfFirstPage = searchedArticles.slice(0, 10)
  View.showArticles(articlesOfFirstPage)
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
      .searchAll(searchedValue)
      .then(List.map(({ timestamp, ...article }) => ({
        date: new Date(timestamp),
        ...article,
      })))
      .then(saveArticlesInCache(searchedValue))
      .then(selectAndShowArticles)
  }
}

searchButton.addEventListener('click', searchEventListener)
searchInput.addEventListener('keyup', Events.onEnter(searchEventListener))
