function createNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    // const tags = document.getElementById('tags').value.split(',');
    const reminder = document.getElementById('reminder').value;
    // const list = document.getElementById('list').value.split('\n');
    const createdDate = new Date().toISOString();

    const note = {
      title,
      content,
      color,
      pin,
    //   tags,
      reminder,
      //list,
      createdDate
    };

    // Zapis notatki do localStorage
    saveNoteToLocalStorage(note);

    // Odświeżanie listy notatek
    displayNotes();
  }

  // Funkcja zapisująca notatkę do localStorage
  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  // Funkcja wyświetlająca notatki na stronie
  function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p>Color: ${note.color}</p>
        <p>Pin: ${note.pin ? 'Tak' : 'Nie'}</p>
        <p>Reminder: ${note.reminder}</p>
        <p>Created: ${new Date(note.createdDate).toLocaleString()}</p>
      `;
      notesContainer.appendChild(noteElement);
    });
  }

  // Wywołaj funkcję przy załadowaniu strony
  displayNotes();