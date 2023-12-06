displayNotes()
document.addEventListener('DOMContentLoaded', function () {
  //ustaw kolory w modalu
  const colorLabels = document.querySelectorAll('.color-label')

  // Iteruj przez każdy element i ustaw jego tło na podstawie atrybutu data-value
  colorLabels.forEach(label => {
    const value = label.getAttribute('data-value')
    label.style.backgroundColor = value
  })

  //zmiana koloru tła notatki
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="color"]'
  )
  const noteBgColor = document.getElementById('note-bg')
  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
      const colorValue = radioButton.value
      noteBgColor.style.backgroundColor = colorValue
    })
  })

  //obsługa modala
  const modals = document.querySelectorAll('[data-modal]')
  modals.forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault()
      const modal = document.getElementById(trigger.dataset.modal)
      modal.classList.add('open')
      // Ustawianie focusu na polu 'note-content'
      setTimeout(function () {
        const contentField = modal.querySelector('#note-content')
          contentField.focus()
      }, 100);
    
      const exits = modal.querySelectorAll('.modal-exit')
      exits.forEach(function (exit) {
        exit.addEventListener('click', function (event) {
          event.preventDefault()
          modal.classList.remove('open')
          tempNewNoteItem.removeAttribute('hidden')
          createNote()
          
        })
      })
    })
  })
})

function createNote () {
  const title = document.getElementById('title').value
  const content = document.getElementById('note-content').value
  const color = getSelectedColor()
  //const pin = document.getElementById('pin').checked
  // const tags = document.getElementById('tags').value.split(',');
  //const reminder = document.getElementById('reminder').value
  // const list = document.getElementById('list').value.split('\n');
  // const createdDate = new Date().toISOString()

  const note = {
    title,
    content,
    color
    //pin,
    //   tags,
    //reminder,
    //list,
    //createdDate
  }

  // Zapis notatki do localStorage
  if(title.value != "" || content.value != ""){
    saveNoteToLocalStorage(note)
    document.getElementById('create-Note').reset();
    displayNotes()
  }

  // Odświeżanie listy notatek
}

// Funkcja zapisująca notatkę do localStorage
function saveNoteToLocalStorage (note) {
  let notes = JSON.parse(localStorage.getItem('notes')) || []
  notes.push(note)
  localStorage.setItem('notes', JSON.stringify(notes))
}
//funkcja sprawdzająca aktualnie wybrany kolor
function getSelectedColor () {
  const colorOptions = document.getElementsByName('color')
  let selectedColor = null

  for (const option of colorOptions) {
    if (option.checked) {
      selectedColor = option.value
      break
    }
  }

  return selectedColor
}

// Funkcja wyświetlająca notatki na stronie
function displayNotes () {
  const notesContainer = document.getElementById('notes-container')
  notesContainer.innerHTML = ''

  const notes = JSON.parse(localStorage.getItem('notes')) || []

  notes.forEach(note => {
    const noteElement = document.createElement('div')
    noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p>Color: ${note.color}</p>
        <p>Pin: ${note.pin ? 'Tak' : 'Nie'}</p>
        <p>Reminder: ${note.reminder}</p>
        <p>Created: ${new Date(note.createdDate).toLocaleString()}</p>
      `
    notesContainer.appendChild(noteElement)
  })
}



