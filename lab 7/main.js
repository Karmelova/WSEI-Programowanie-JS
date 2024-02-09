// DOM elements
const form = document.querySelector('#search-form')
const input = document.querySelector('#search-term')
const msg = document.querySelector('.form-msg')
const list = document.querySelector('.cities')

// Function to create delete button
function createDeleteButton (cityName) {
  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Delete'
  deleteBtn.classList.add('delete-btn')
  deleteBtn.dataset.city = cityName.toLowerCase() // Save city name in lowercase
  deleteBtn.addEventListener('click', e => {
    // Retrieve the city name from the data attribute
    const cityName = e.target.dataset.city

    // Remove the city from localStorage
    const savedCities = JSON.parse(localStorage.getItem('cities')) || []
    const updatedCities = savedCities.filter(
      city => city.toLowerCase() !== cityName
    )
    localStorage.setItem('cities', JSON.stringify(updatedCities))

    // Remove the city from the list
    const listItem = e.target.parentElement
    listItem.remove()
  })
  return deleteBtn
}

// Function to fetch weather data for a city
async function fetchWeather (city) {
  const apiKey = '771d31232c52be91939341c9cdb1bb5d'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return false // Indicate failure if response is not ok
    }
    const data = await response.json()

    // Let's destructure the data object
    const { main, name, sys, weather, wind } = data

    // Define the icon location
    const icon = `img/weather/${weather[0]['icon']}.svg`

    // Create the list item for the new city
    const li = document.createElement('li')

    // Define markup
    const markup = `
    <figure>
        <img src="${icon}" alt="${weather[0]['description']}">
    </figure>

    <div>
        <h2>${Math.round(main.temp)}<sup>°C</sup></h2>
        <p class="city__conditions">${weather[0][
            'description'
            ].toUpperCase()}</p>
        <h3><span class="city__name">${name}</span><span class="city__country">${sys.country}</span></h3>
        <p>Temperature feels like: ${Math.round(main.feels_like)}°C</p>
        <p>Minimum Temperature: ${main.temp_min}°C</p>
        <p>Maximum Temperature: ${main.temp_max}°C</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Pressure: ${main.pressure} hPa</p>
    </div>
        `

    // Add the new markup to the list item
    li.innerHTML = markup

    // Create and add delete button
    const deleteBtn = createDeleteButton(name)
    li.appendChild(deleteBtn)

    // Add the new list item to the page
    list.appendChild(li)

    return true // Indicate success
  } catch (error) {
    throw error // Propagate any error
  }
}

// Event listener for form submission
form.addEventListener('submit', async e => {
  e.preventDefault()

  // Hide any message that might be displayed
  msg.textContent = ''
  msg.classList.remove('visible')

  // Get the search value
  let inputVal = input.value.trim()

  // Check if the input is empty
  if (inputVal === '') {
    return
  }

  // Check if there are already ten cities added
  if (list.children.length > 10) {
    msg.textContent = 'You can only add up to ten cities!'
    msg.classList.add('visible')
    return
  }

  // Check if the city is already in the list
  const cities = Array.from(list.querySelectorAll('.cities li'))
  const existingCity = cities.find(
    city =>
      city.querySelector('.city__name').textContent.toLowerCase() ===
      inputVal.toLowerCase()
  )

  if (existingCity) {
    msg.textContent = `You already know the weather for ${inputVal}`
    msg.classList.add('visible')
    form.reset()
    input.focus()
    return
  }

  try {
    // Fetch weather data for the input city
    const fetchSuccess = await fetchWeather(inputVal)

    // Save the city to localStorage only if the fetch was successful
    if (fetchSuccess) {
      const savedCities = JSON.parse(localStorage.getItem('cities')) || []
      savedCities.push(inputVal)
      localStorage.setItem('cities', JSON.stringify(savedCities))
    } else {
      throw new Error('Please search for a valid city!')
    }
  } catch (error) {
    msg.textContent = error.message
    msg.classList.add('visible')
  }

  // Reset form
  form.reset()
  input.focus()
})

// Load cities from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const savedCities = JSON.parse(localStorage.getItem('cities')) || []
  savedCities.forEach(city => {
    fetchWeather(city)
  })
  console.log(savedCities)
})
