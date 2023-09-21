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


  const columnNameToThElement = columnName => {
    const thElement = document.createElement('th')
    thElement.innerText = columnName
    return thElement
  }


  const getThead = columnNames => {
    const thElements = columnNames.map(columnNameToThElement)

    const trElement = document.createElement('tr')
    trElement.replaceChildren(...thElements)

    const theadElement = document.createElement('thead')
    theadElement.appendChild(trElement)

    return theadElement
  }


  const rowToTrElement = row => {
    const tdElements = row.map(datum => {
      const tdElement = document.createElement('td')
      tdElement.innerText = datum
      return tdElement
    })

    const trElement = document.createElement('tr')
    trElement.replaceChildren(...tdElements)

    return trElement
  }


  const getTbody = rows => {
    const trElements = rows.map(rowToTrElement)

    const tbodyElement = document.createElement('tbody')
    tbodyElement.replaceChildren(...trElements)

    return tbodyElement
  }


  const tableToHtmlElement = ({ column_names, rows }) => {
    const theadElement = getThead(column_names)
    const tbodyElement = getTbody(rows)

    const tableElement = document.createElement('table')
    tableElement.appendChild(theadElement)
    tableElement.appendChild(tbodyElement)

    return tableElement
  }


  const showTables = tables => {
    const htmlTables = tables.map(tableToHtmlElement)
    const tablesContainer = document.getElementById('tables')
    tablesContainer.replaceChildren(...htmlTables)
  }


  return Object.freeze({
    showErrorMessage,
    hideErrorMessage,
    showArticles,
    showTables,
  })
})()
