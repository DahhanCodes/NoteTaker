
var noteTitle
var noteText
var saveNoteBtn
var newNoteBtn
var noteList
var newNote
if (window.location.pathname === '/notes') {
 noteTitle = $(".note-title");
 noteText =  $(".note-textarea");
 saveNoteBtn = $("#save-note");
 newNoteBtn = $("#new-note");
 noteList = $(".list-group");
 
}

fetch("../../../db/db.json").then(response => {
  console.log("trying to fetch the db")
  console.log(response);
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data);
}).catch(err => {
  // Do something for an error here
  console.log("Error Reading data " + err);
});

// Show an element
const show = (elem) => {
  $(""+elem).css("display","inline");
};

// Hide an element
const hide = (elem) => {
 $(""+elem).css("display","none");
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  function save(title, note) {
    $.post("/api/save", {
      title: title,
      note: note
    })
  }
// const saveNote = (note) =>
//   fetch('/api/save', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(note),
//   });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};
$("#save-note").on('click', function handleNoteSave(){
    newNote = {
    title: $(".note-Title").val(),
    text: $(".note-textarea").val()
  }
  save(newNote.title,newNote.text)
  getAndRenderNotes();
  renderActiveNote();
})

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
$("#new-note").on('click', function handleNewNoteView(){
  activeNote = {};
  renderActiveNote();

});

$(".note-title").on('keyup', function handleRenderSaveBtn(){
 
  if (!$(".note-title").val() || !$(".note-textarea").val()){
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }

});
$(".list-group").on('keyup', function handleRenderSaveBtn(){
 
  if (!$(".note-title").val() || !$(".note-textarea").val()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }

});

 

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);
$(".note-title").on('change', function (){
  noteTitle =$(this).val()
  console.log(noteTitle)
});

$(".note-textarea").on('change',  function (){
  noteText = $(this).val()
  console.log(noteText)
});


getAndRenderNotes();
