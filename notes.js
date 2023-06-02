const noteInput = document.getElementById("note");
const dateFilter = document.getElementById("date-filter");
const filterButton = document.getElementById("filter-button");
const notesList = document.getElementById("notes-list");
const formWrapper = document.querySelector(".form-wrapper");
const formExpand = document.querySelector(".form-expand");
const findString = document.getElementById("find");
const findButton = document.getElementById("find-button");
const findExpand = document.querySelector(".find-expand");
const findWrapper = document.querySelector(".find-wrapper");
const exportButton = document.getElementById("export-button");
const importButton = document.getElementById("import-button");
const importFile = document.getElementById("import-file");

formExpand.addEventListener('click', () => {
    if (formExpand.classList.contains("form-disabled")) {
        formExpand.classList.remove("form-disabled");
        formExpand.classList.add("form-enabled");
        formWrapper.classList.add("form-active");
        findExpand.classList.add("find-disabled");
        findExpand.classList.remove("find-enabled");
        findWrapper.classList.remove("find-active");
        findExpand.innerHTML = '&#1422';
        formExpand.innerHTML = '&#8593';
    }
    else {
        formExpand.classList.add("form-disabled");
        formExpand.classList.remove("form-enabled");
        formWrapper.classList.remove("form-active");
        formExpand.innerHTML = '+';
    }
});

findExpand.addEventListener('click', () => {
    if (findExpand.classList.contains("find-disabled")) {
        findExpand.classList.remove("find-disabled");
        findExpand.classList.add("find-enabled");
        findWrapper.classList.add("find-active");
        findExpand.innerHTML = '&#8595';
        formExpand.classList.add("form-disabled");
        formExpand.classList.remove("form-enabled");
        formWrapper.classList.remove("form-active");
        formExpand.innerHTML = '+';
    }
    else {
        findExpand.classList.add("find-disabled");
        findExpand.classList.remove("find-enabled");
        findWrapper.classList.remove("find-active");
        findExpand.innerHTML = '&#1422';
    }
});

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addNote();
});

filterButton.addEventListener("click", filterNotes);
findButton.addEventListener("click", findNotes);
noteInput.addEventListener('input', autoresize);
exportButton.addEventListener("click", saveBackup);
importButton.addEventListener("click", uploadBackup);

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

function findNotes() {
    const findedNotes = [];
    notes.forEach((note) => {
        note.text.includes(findString.value) ? findedNotes.push(note) : false;
    });
    findString.value = '';
    findedNotes.length > 0 ? renderNotes(findedNotes) : renderNotes([{text: 'not found', date: 'try another word'}]);
}

function saveBackup() {
    const data = localStorage.getItem("notes");
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup_notes.json';
    link.click();
}

function uploadBackup() {
    const file = importFile.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e) {
        const fileData = e.target.result;
        localStorage.setItem('notes', fileData);
        let backNotes = JSON.parse(localStorage.getItem("notes"));
        renderNotes(backNotes);
    }
}