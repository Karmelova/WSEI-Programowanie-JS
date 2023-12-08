// Global variables
let indexOfNoteEdited = undefined;
const colorLabels = document.querySelectorAll('.color-label');
const checkbox = document.getElementById('star');
const starIcon = document.getElementById('starIcon');
const palleteIcon = document.getElementById('palleteIcon');
const colorsBar = document.getElementById('color-list');


displayNotes()
// Set up color labels
colorLabels.forEach(label => {
  const value = label.getAttribute('data-value');
  label.style.backgroundColor = value;
});

// Function to display notes
function displayNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  if (notes != '') {
    const notesContainer = document.getElementById('notes-table');
    notesContainer.innerHTML = '';
    const tableHeaders = document.createElement('tr');
    tableHeaders.innerHTML = `<tr>
      <th><span class="material-symbols-outlined">star</span></th>
      <th>Tytuł</th>
      <th>Treść</th>
      <th>Modyfikacja</th>
    </tr>`;
    notesContainer.appendChild(tableHeaders);

    notes.forEach((note, index) => {
      const noteElement = document.createElement('tr');
      noteElement.style.background = note.color;
      noteElement.innerHTML = `
        <td> ${
          note.starred
            ? `<span class="material-symbols-outlined filled-star">star</span>`
            : `<span class="material-symbols-outlined">star</span>`
        }</td>
        <td>${note.title}</td>
        <td>${note.content}</td>
        <td>${new Date(note.createdDate).toISOString().slice(2, 19).replace("T", "<br>")}</td>`;
      notesContainer.appendChild(noteElement);
      noteElement.addEventListener('click', () => openModal(index));
    });
  }
}

// Function to open the modal
function openModal(index) {
  const modal = document.getElementById('noteModal');
  modal.classList.add('open');
  const form = document.getElementById('noteForm');
  form.reset();

  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const title = document.getElementById('title');
  const content = document.getElementById('note-content');
  const color = getSelectedColor();
  const starred = document.getElementById('star');
  const binIcon = document.getElementById('binIcon');
  binIcon.style.display = 'none';
  const createdDate = new Date().toISOString();

  // Set focus on the 'note-content' field
  setTimeout(function () {
    const contentField = modal.querySelector('#note-content');
    contentField.focus();
  }, 100);

  // If index exists, set form data
  if (index != undefined) {
    indexOfNoteEdited = index;
    binIcon.style.display = 'flex';
    title.value = notes[index].title;
    content.value = notes[index].content;
    setSavedColor(notes[index].color);
    starred.checked = notes[index].starred;
    createdDate.value = notes[index].createdDate;
  }
  updateStarIcon();
  setModalBackgroundColor();
  const exits = modal.querySelectorAll('.modal-exit');
  exits.forEach(function (exit) {
    exit.addEventListener('click', closeModal);
    const colorsBar = document.getElementById('color-list');
    colorsBar.style.display == 'none' ? {} : (colorsBar.style.display = 'none');
  });
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('noteModal');
  modal.classList.remove('open');
  saveNote();

  // Remove event listeners after modal is closed
  const exits = modal.querySelectorAll('.modal-exit');
  exits.forEach(function (exit) {
    exit.removeEventListener('click', closeModal);
    indexOfNoteEdited = undefined;
  });
}

// Function to set modal background color
function setModalBackgroundColor() {
  const noteBgColor = document.querySelector('.modal-container');
  const initialColor = document.querySelector(
    'input[type="radio"][name="color"]:checked'
  ).value;
  noteBgColor.style.backgroundColor = initialColor;
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="color"]'
  );

  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
      const colorValue = radioButton.value;
      noteBgColor.style.backgroundColor = colorValue;
    });
  });
}

// Event listener for document ready
document.addEventListener('DOMContentLoaded', function () {});

// Function to get the selected color
function getSelectedColor() {
  const colorOptions = document.getElementsByName('color');
  let selectedColor = null;

  for (const option of colorOptions) {
    if (option.checked) {
      selectedColor = option.value;
      break;
    }
  }

  return selectedColor;
}

// Function to set saved color
function setSavedColor(savedColor) {
  const colorOptions = document.getElementsByName('color');
  for (const option of colorOptions) {
    if (option.value == savedColor) {
      option.checked = true;
      break;
    }
  }
}

// Function to save note
function saveNote() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('note-content').value;
  const color = getSelectedColor();
  const starred = document.getElementById('star').checked;
  const createdDate = new Date().toISOString();
  const form = document.getElementById('noteForm');
  const note = {
    title,
    content,
    color,
    starred,
    createdDate
  };

  // Save note to localStorage
  if (title != '' || content != '') {
    saveNoteToLocalStorage(note);
    displayNotes();
    form.reset();
  }
}

// Function to save note to localStorage
function saveNoteToLocalStorage(note) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  indexOfNoteEdited != undefined ? (notes[indexOfNoteEdited] = note) : notes.push(note);

  // Sort by date and place starred items at the top
  notes.sort((a, b) => {
    if (a.starred - b.starred !== 0) {
      return b.starred - a.starred;
    }
    return new Date(b.createdDate) - new Date(a.createdDate);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}

// Update star icon based on checkbox state
function updateStarIcon() {
  if (checkbox.checked) {
    starIcon.classList.add('filled-star');
  } else {
    starIcon.classList.remove('filled-star');
  }
}

// Event listeners for checkbox, star icon, and palette icon
checkbox.addEventListener('change', updateStarIcon);
starIcon.addEventListener('click', function () {
  checkbox.checked = !checkbox.checked;
  updateStarIcon();
});
palleteIcon.addEventListener('click', function () {
  colorsBar.style.display == 'none' ? (colorsBar.style.display = 'flex') : (colorsBar.style.display = 'none');
});

// Function to adjust textarea height dynamically
const adjustTextareaHeight = function () {
  const numberOfLines = this.value.split('\n').length;
  const maxLines = 6;

  this.style.overflowY = numberOfLines > maxLines ? 'scroll' : 'hidden';
  this.style.height = `${Math.min(maxLines, numberOfLines) * 20}px`;
};

document.querySelectorAll('.auto-resize-textarea').forEach(textarea => {
  textarea.addEventListener('input', adjustTextareaHeight);
});
