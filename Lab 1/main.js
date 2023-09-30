// notatnik z zajęć
const liczby = document.querySelectorAll(".liczba");
const wynikiPojemnik = document.querySelector('#wyniki')

function calculateValues(){
    let sum = 0;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;

    for (const input of liczby) {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            sum += value;
            min = Math.min(min, value);
            max = Math.max(max, value);
        }
    }
    const average = sum / liczby.length;

    wynikiPojemnik.innerHTML = `
    <p>Suma: ${sum}</p>
    <p>Średnia: ${average}</p>
    <p>Min: ${min}</p>
    <p>Max: ${max}</p>
`
liczby.forEach((element, index) => {
    console.log(`Element ${index + 1}: ${element.value}`);
  });
}