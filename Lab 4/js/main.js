

displayNotes()
//ustaw kolory w modalu
const colorLabels = document.querySelectorAll('.color-label')

// Iteruj przez każdy element i ustaw jego tło na podstawie atrybutu data-value
colorLabels.forEach(label => {
  const value = label.getAttribute('data-value')
  label.style.backgroundColor = value
})



function openModal (index) {
  const modal = document.getElementById('noteModal')
  modal.classList.add('open')
  setModalBackgroundColor()
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const title = document.getElementById('title')
    const content = document.getElementById('note-content')
    const color = getSelectedColor()
    const starred = document.getElementById('star')
    // const tags = document.getElementById('tags').value.split(',');
    //const reminder = document.getElementById('reminder').value
    // const list = document.getElementById('list').value.split('\n');
    const createdDate = new Date().toISOString()
    const form = document.getElementById('noteForm')
    title.value=notes[index].title;
    content.value=notes[index].content;
    color.value=notes[index].color
    starred.value=notes[index].starred
  
  
  
  // Ustawianie focusu na polu 'note-content'
  setTimeout(function () {
    const contentField = modal.querySelector('#note-content')
    contentField.focus()
  }, 100)

  const exits = modal.querySelectorAll('.modal-exit')
  exits.forEach(function (exit) {
    exit.addEventListener('click', closeModal)
  })
}

function closeModal (event) {
  event.preventDefault()
  const modal = event.currentTarget.closest('.modal')
  modal.classList.remove('open')
  createNote()

  // Usunięcie nasłuchiwania zdarzeń po zamknięciu modala
  const exits = modal.querySelectorAll('.modal-exit')
  exits.forEach(function (exit) {
    exit.removeEventListener('click', closeModal)
  })
}
function setModalBackgroundColor () {
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="color"]'
  )
  const noteBgColor = document.querySelector('.modal-container')
  
  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
      const colorValue = radioButton.value
      noteBgColor.style.backgroundColor = colorValue
    })
  })
}

document.addEventListener('DOMContentLoaded', function () {})

function createNote () {
  const title = document.getElementById('title').value
  const content = document.getElementById('note-content').value
  const color = getSelectedColor()
  const starred = document.getElementById('star').checked
  // const tags = document.getElementById('tags').value.split(',');
  //const reminder = document.getElementById('reminder').value
  // const list = document.getElementById('list').value.split('\n');
  const createdDate = new Date().toISOString()
  const form = document.getElementById('noteForm')
  const note = {
    title,
    content,
    color,
    starred,
    //   tags,
    //reminder,
    //list,
    createdDate
  }

  // Zapis notatki do localStorage
  if (title != '' || content != '') {
    saveNoteToLocalStorage(note)
    displayNotes()
    form.reset()
  }
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
  const notes = JSON.parse(localStorage.getItem('notes')) || []

  if (notes != '') {
    // notes.sort((a, b) => {
    //   // Sortowanie według gwiazdek (starred)
    //   if (a.starred - b.starred !== 0) {
    //     return b.starred - a.starred;
    //   }

    //   // Jeśli gwiazdki są takie same, sortuj według daty utworzenia (najnowsze pierwsze)
    //   return new Date(b.createdDate) - new Date(a.createdDate);
    // });
    const notesContainer = document.getElementById('notes-table')
    notesContainer.innerHTML = ''
    const tableHeaders = document.createElement('tr')
    tableHeaders.innerHTML = `<tr>
  <th><span class="material-symbols-outlined">
  star
  </span></th>
  <th>Tytuł</th>
  <th>Treść</th>
  <th>Utworzono</th>
</tr>
  `
    notesContainer.appendChild(tableHeaders)

    notes.forEach((note, index) => {
      const noteElement = document.createElement('tr')
      noteElement.style.background = note.color
      noteElement.innerHTML = `
        <td> ${
          note.starred
            ? `<span class="material-symbols-outlined filled-star">
        star
        </span>`
            : `<span class="material-symbols-outlined">
        star
        </span>`
        }</td>
        <td>${note.title}</td>
        <td>${note.content}</td>
        <td>${new Date(note.createdDate).toLocaleString()}</td>        
      `
      notesContainer.appendChild(noteElement)
      noteElement.addEventListener('click', () => openModal(index))
    })
  }
}

const checkbox = document.getElementById('star')
const starIcon = document.getElementById('starIcon')

function updateStarIcon () {
  if (checkbox.checked) {
    starIcon.classList.add('filled-star')
  } else {
    starIcon.classList.remove('filled-star')
  }
}

checkbox.addEventListener('change', updateStarIcon)

starIcon.addEventListener('click', function () {
  checkbox.checked = !checkbox.checked
  updateStarIcon()
})

const adjustTextareaHeight = function () {
  const numberOfLines = this.value.split('\n').length
  const maxLines = 6

  this.style.overflowY = numberOfLines > maxLines ? 'scroll' : 'hidden'
  this.style.height = `${Math.min(maxLines, numberOfLines) * 20}px`
}

document.querySelectorAll('.auto-resize-textarea').forEach(textarea => {
  textarea.addEventListener('input', adjustTextareaHeight)
})

// Obsługa modala
