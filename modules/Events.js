/* exported Events */
const Events = (() => {
  const onEnter = handler => event => {
    if (event.key === 'Enter') {
      handler(event)
    }
  }

  return Object.freeze({ onEnter })
})()
