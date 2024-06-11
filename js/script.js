document.addEventListener('DOMContentLoaded', (event) => {
    const note = document.getElementById('note');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const savedNotesContainer = document.getElementById('savedNotes');
    const deleteNotesBtn = document.getElementById('deleteNotesBtn');
    const deleteNotesSelect = document.getElementById('deleteNotesSelect');

    loadSavedNotes();

    saveBtn.addEventListener('click', () => {
        saveNote();
    });

    clearBtn.addEventListener('click', () => {
        clearNote();
    });

    deleteNotesBtn.addEventListener('click', () => {
        deleteSelectedNotes();
    });

    function saveNote() {
        const noteText = note.value.trim();
        if (noteText !== '') {
            const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            savedNotes.push({ text: noteText, date: formattedDate });
            localStorage.setItem('notes', JSON.stringify(savedNotes));
            displaySavedNotes(savedNotes);
            fillDeleteNotesSelect(savedNotes);
            note.value = '';
        }
    }



    function clearNote() {
        note.value = '';
    }


    function loadSavedNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        displaySavedNotes(savedNotes);
        fillDeleteNotesSelect(savedNotes);
    }

    function displaySavedNotes(notes) {
        savedNotesContainer.innerHTML = '';
        notes.reverse().forEach((noteObj, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
            <div class="note-container">
            <div class="note-info">
            <div>${noteObj.date}</div>
            <div class="note-text">${noteObj.text}</div>
            </div>
            <button class="editBtn" data-index="${index}">Edit</button>
            </div>
            `;
            savedNotesContainer.appendChild(noteElement);
        });
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('editBtn')) {
            const index = event.target.getAttribute('data-index');
            const noteTextElement = event.target.previousElementSibling;
            const newText = prompt('Enter new note:', noteTextElement.textContent);
            if (newText !== null) {
                const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
                savedNotes[index].text = newText;
                localStorage.setItem('notes', JSON.stringify(savedNotes));
                noteTextElement.textContent = newText;
            }
        }
    });





    function fillDeleteNotesSelect(notes) {
        deleteNotesSelect.innerHTML = '';
        notes.forEach((noteObj, index) => {
            const option = document.createElement('option');
            option.value = index.toString();
            option.textContent = `${noteObj.date}`;
            deleteNotesSelect.appendChild(option);
        });
    }

    function deleteSelectedNotes() {
        const selectedIndex = deleteNotesSelect.value;
        if (selectedIndex !== '') {
            const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            savedNotes.splice(selectedIndex, 1);
            localStorage.setItem('notes', JSON.stringify(savedNotes));
            displaySavedNotes(savedNotes);
            fillDeleteNotesSelect(savedNotes);
        }
    }
});
