/* DOM event listeners and actions. */

//Save Book Event 
const save_book = document.querySelector('#save');
save_book.addEventListener('click', () => {
    library.newBook();
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
//show
btn.addEventListener('click', () => modal.style.display = "block");
// close button
span.addEventListener('click', () => resetModalFileds());
// click outside modal window
window.addEventListener('click', (event) =>{
    if (event.target == modal) {
        resetModalFileds();
    }
});    
