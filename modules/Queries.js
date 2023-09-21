/* exported Queries */
const Queries = (() => {
  const baseUrl = 'https://es.wikipedia.org/w/api.php'
  const baseParams = Object.freeze({
    srlimit: '500',
    srqiprofile: 'classic',
    srinfo: 'totalhits',
    action: 'query',
    list: 'search',
    format: 'json',
    origin: '*',
    srprop: [
      'size',
      'timestamp',
      'snippet',
    ].join('|'),
  })

  const search = (srsearch, sroffset = 0) => {
    const params = new URLSearchParams({
      ...baseParams,
      srsearch,
      sroffset,
    })
    return fetch(`${baseUrl}?${params}`)
      .then(response => response.json())
  }

  const _searchAll = previousHits => offset => srsearch =>
    search(srsearch, offset)
      .then(result => {
        const totalHitsSoFar = Object.freeze([ ...previousHits, ...result.query.search ])
        if (result.continue) {
          return _searchAll(totalHitsSoFar)(result.continue.sroffset)(srsearch)
        } else {
          return totalHitsSoFar
        }
      })

  const searchAll = _searchAll([])(0)


  return Object.freeze({ searchAll })
})()
