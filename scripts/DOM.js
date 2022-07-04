/* DOM event listeners and actions. */

/* detect when the user is typin in title or author box */
const titleTip = document.querySelector('.tooltip-title');
const authorTip = document.querySelector('.tooltip-author');
const pagesTip = document.querySelector('.tooltip-pages');

const titleBox = document.querySelector('#title');
const authorBox = document.querySelector('#author');
const pagesBox = document.querySelector('#num-pages');

titleBox.addEventListener('keydown', () => {
    // disable the typing reminder.
    titleTip.style.visibility = 'hidden';
});
authorBox.addEventListener('keydown', () => {
    // disable the typing reminder.
    authorTip.style.visibility = 'hidden';
});
pagesBox.addEventListener('keydown', () => {
    // disable the typing reminder.
    pagesTip.style.visibility = 'hidden';
});

//Save Book Event 
const save_book = document.querySelector('#save');
save_book.addEventListener('click', () => {
    library.newBook(false);
});

/* trap click events for the test button */
const testButton = document.querySelector('.sample-data');
testButton.addEventListener('click', () => {
     // generate book data for 7 books.
     buildSampleData();
 });

 /* trap click events for the reset button */
const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
     // clear all the books.
    library.deleteAll();
 });


// toggle for read slider on the addbook modal
const modal_read_checkbox = document.querySelector('#modal-read');
const modal_status_text = document.querySelector('.modal-status');

modal_read_checkbox.addEventListener('click', () => {
    if ( modal_read_checkbox.checked ) { 
          modal_status_text.textContent = 'Read';
    } else {
          modal_status_text.textContent = 'Not Read';
    }
}); 


/* Events and actions for showing and closing the modal */
const modal = document.getElementById("add-modal");
const btn = document.getElementById("add-btn");
const span = document.getElementsByClassName("close")[0];
const resetBtn = document.getElementById('reset');

//show
btn.addEventListener('click', () => modal.style.display = "block");

// close button
span.addEventListener('click', () => resetModalFields());

// click outside modal window
window.addEventListener('click', (event) =>{
    if (event.target == modal) {
        resetModalFields();
    }
});    

resetBtn.addEventListener('click', () => resetModalFields(true));




