/* exported View */
const View = (() => {
  const showErrorMessage = message => {
    const errorMessageElement = document.getElementById('error-message')
    errorMessageElement.innerText = message
  }


  const hideErrorMessage = () => showErrorMessage('')

  const dateFormatter = new Intl.DateTimeFormat('es-MX', { dateStyle: 'full' })

  const articleToHtmlElement = ({ title, pageid, snippet, size, date }) => {
    const titleElement = document.createElement('a')
    titleElement.setAttribute('href', `https://es.wikipedia.org/?curid=${pageid}`)
    titleElement.setAttribute('class', 'article-title')
    titleElement.innerText = title

    const snippetElement = document.createElement('p')
    snippetElement.setAttribute('class', 'article-snippet')
    snippetElement.innerHTML = snippet

    const dateElement = document.createElement('p')
    dateElement.setAttribute('class', 'article-metadata')
    dateElement.innerText = `Última modificación: ${dateFormatter.format(date)}`

    const sizeElement = document.createElement('p')
    sizeElement.setAttribute('class', 'article-metadata')
    sizeElement.innerText = `${size} Bytes`

    const containerElement = document.createElement('div')
    containerElement.appendChild(titleElement)
    containerElement.appendChild(snippetElement)
    containerElement.appendChild(dateElement)
    containerElement.appendChild(sizeElement)
    return containerElement
  }


  const showArticles = articles => {
    const articleElements = articles.map(articleToHtmlElement)
    const articlesContainerElement = document.getElementById('articles')
    articlesContainerElement.replaceChildren(...articleElements)
  }


  return Object.freeze({
    showErrorMessage,
    hideErrorMessage,
    showArticles,
  })
})()
