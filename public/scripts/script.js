console.log(`script.js begin`)

const weatherForm = document.querySelector(`form`),
  search = document.querySelector(`input`),
  messageOne = document.getElementById(`messageOne`),
  messageTwo = document.getElementById(`messageTwo`)

weatherForm.addEventListener(`submit`, (e) => {
  e.preventDefault()
  messageOne.textContent = `Loading...`
  messageTwo.textContent = ``
  if (search.value === '') {
    console.log(`Must provide a location.`)
  } else {
    console.log(search.value)
    const weather = `/weather?address=${search.value}`
    fetch(weather).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error
          return console.log(data.error)
        } else {
          console.log(data.location)
          console.log(data.forecast)
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        }
      })
    })
  }
})

console.log(`script.js end`)
