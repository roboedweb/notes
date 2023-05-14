const noteInput = document.getElementById("note");
const dateFilter = document.getElementById("date-filter");
const filterButton = document.getElementById("filter-button");
const notesList = document.getElementById("notes-list");
const formWrapper = document.querySelector(".form-wrapper");
const formExpand = document.querySelector(".form-expand");

formExpand.addEventListener('click', () => {
    if (formExpand.classList.contains("form-disabled")) {
        formExpand.classList.remove("form-disabled");
        formExpand.classList.add("form-enabled");
        formWrapper.classList.add("form-active");
        formExpand.innerHTML = '&#8593';
    }
    else {
        formExpand.classList.add("form-disabled");
        formExpand.classList.remove("form-enabled");
        formWrapper.classList.remove("form-active");
        formExpand.innerHTML = '+';
    }
});

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addNote();
});

filterButton.addEventListener("click", filterNotes);
noteInput.addEventListener('input', autoresize);

let notes = JSON.parse(localStorage.getItem("notes")) || [];

renderNotes(notes);

function addNote() {
    const noteText = noteInput.value.trim();
    if(noteText) {
        const note = {
            text: noteText,
            date: new Date()
        };
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = '';
        renderNotes(notes);
    }
}

function renderNotes(renderedNote) {
    notesList.innerHTML = '';
    renderedNote.forEach((note) => {
        const li = document.createElement("li");
        li.textContent = `${note.text} /// ${note.date}`;
        notesList.appendChild(li);
    });
}

function filterNotes() {
    const filteredNotes = notes.filter(
        (note) => note.date.slice(0, 10) == dateFilter.value
    );
    renderNotes(filteredNotes);
}

function autoresize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight - 20 + 'px';
}