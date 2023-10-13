// notatnik z zajęć
let numbers = document.querySelectorAll('.input-number')
const resultDiv = document.querySelector('#results')
const inputContainer = document.getElementById('input-container')

function addField () {
  let newInput = document.createElement('input')
  newInput.setAttribute('type', 'text')
  newInput.classList.add('input-number')
  inputContainer.appendChild(newInput)
  newInput.addEventListener('input', () => calculateValues());
}

// obliczanie wartości z wszystkich pól teksowych. Pole wylicza sumę, średnią, maksymalną podaną liczbę oraz minimalną podaną liczbę
function calculateValues () {
  numbers = document.querySelectorAll('.input-number')
  let sum = 0
  let min = Number.MAX_VALUE
  let max = Number.MIN_VALUE

  for (const input of numbers) {
    const value = parseFloat(input.value)
    if (!isNaN(value)) {
      sum += value
      min = Math.min(min, value)
      max = Math.max(max, value)
    }
  }
  const average = sum / numbers.length

  resultDiv.innerHTML = `
    <p>Suma: ${sum}</p>
    <p>Średnia: ${average}</p>
    <p>Min: ${min}</p>
    <p>Max: ${max}</p>
`
}

//wykrywanie zmian w polach teksowych i wywołanie funkcji obliczającej wartości
numbers.forEach(element =>
  element.addEventListener('input', () => calculateValues())
)
