/* exported View */
const View = (() => {
  const showErrorMessage = message => {
    const errorMessageElement = document.getElementById('error-message')
    errorMessageElement.innerText = message
  }


  const hideErrorMessage = () => showErrorMessage('')


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

  function interleave(arr, arr2) {
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i], arr2[i])
    }

    return newArr
  }


  const getHtmlTableTitles = ({ table_name }) => {
    const h2Element = document.createElement('h2')
    h2Element.setAttribute('class', 'table-title')
    h2Element.innerText = table_name
    return h2Element
  }


  const showTables = tables => {
    const htmlTableTitles = tables.map(getHtmlTableTitles)
    const htmlTables = tables.map(tableToHtmlElement)
    const tablesContainer = document.getElementById('tables')
    tablesContainer.replaceChildren(...interleave(htmlTableTitles, htmlTables))
  }


  return Object.freeze({
    showErrorMessage,
    hideErrorMessage,
    showTables,
  })
})()
