/* exported Queries */
const Queries = (() => {
  const baseUrl = 'http://localhost/Ada3/api/search.php'

  const search = query => {
    const params = new URLSearchParams({
      q: query,
    })
    return fetch(`${baseUrl}?${params}`)
      .then(response => response.json())
  }


  return Object.freeze({ search })
})()
