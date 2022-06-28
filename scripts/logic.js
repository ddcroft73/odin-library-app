/**
 * Library app project app for the Odin Project. The assignment was to create a library app that adds book objects
 * to an array. The use should be able to delete the books and when added they should be displayed in a table or
 * via "cards".
 * 
 * I added localStorage support so it could be used. But it never will. I used 2 differnt OOD design patterns for this
 * project. A factory fucntion pattern to create the books, and a module patern to create the library the books are 
 * kept in.
 */

'use strict' 




//Factory function pattern to create book objects.
const createBook = ( {title, author, num_pages, genre, read, bookID}) => {
             
    return {
        title: title,
        author: author,
        num_pages: num_pages,
        genre: genre,
        read: read,
        bookID: bookID,
        
        // I really wanted to play with dynamic generation of HTML so I did this the long way. A better way with less
        // code would have been to create it by hand, hide it, and then clone the div for each new book.
        generateBookCard() {         
            const main_container = document.querySelector('.main-container');
            const card_add = document.querySelector('.add-card');

            // create a new div for a card give it a class name and set data-index. 
            const main_div = document.createElement('div');
            main_div.classList.add('nadd-card');
            main_div.setAttribute('data-index', bookID);
            main_container.insertBefore(main_div, card_add);

            // add the div for the Title and add the title Info
            const title = document.createElement('div');
            title.classList.add('title');
            title.textContent = this.title;
            main_div.appendChild(title);

            // add the div for the Title and add the title Info
            const author = document.createElement('div');
            author.classList.add('author');
            author.textContent = `By: ${this.author}`;
            main_div.appendChild(author);
    
            // add HR effect
            const rule = document.createElement('div');
            rule.classList.add('rule');
            main_div.appendChild(rule);
        
            // add the div for the Title and add the title Info
            const pages = document.createElement('div');
            pages.classList.add('pages');
            pages.innerHTML = `Total Pages: <span class="special">${this.num_pages}</span>`;
            main_div.appendChild(pages);

            // add the div for the Title and add the title Info
            const genre = document.createElement('div');
            genre.classList.add('genre');
            genre.innerHTML = `Genre: <span class="special">${this.genre}</span>`;
            main_div.appendChild(genre);
    
            // add the footer container.
            const footer_container = document.createElement('div');
            footer_container.classList.add('card-footer');
            main_div.appendChild(footer_container);

            // add the div inside the footer to house the "read toggle"
            const book_read = document.createElement('div');
            book_read.classList.add('card-footer-book-read');
            footer_container.appendChild(book_read);
            
            // add label into the footer for the toggle
            const label = document.createElement('label');
            label.classList.add('switch');
            book_read.appendChild(label);

            // put a checkbox inside the switch label
            const checkbox = document.createElement('input');
            checkbox.type = `checkbox`;
            checkbox.id = `read` + this.bookID; // add ID
            label.appendChild(checkbox);   

            // append  a span inside label under the checkbox
            const span_slider = document.createElement('span');
            span_slider.classList.add('slider');
            span_slider.classList.add('round')
            label.appendChild(span_slider);

            // ADD THE span that holds the text status of the checkbox
            // inside card-footer.
            const read_status = document.createElement('div');
            read_status.classList.add('status' + this.bookID); // add ID
            read_status.textContent = "Not Read";
            book_read.appendChild(read_status);

            // OTHER DIV FOR DELETE RIGHT SIDE OF FOOTER
            const delete_div = document.createElement('div');
            delete_div.classList.add('card-footer-delete');
            delete_div.id = `delete`+this.bookID;
            footer_container.appendChild(delete_div)

            // add the image for deleting the book.
            const img = document.createElement('img');
            img.src = './images/delete.png';
            img.width = '20';
            delete_div.appendChild(img);

            // trap the click event when user clicks on the "read" toggle
            this.bindEvent_clickOnRead(this.bookID);
            // addevent and actions for the Delete Icon.
            this.bindEvent_clickOnDelete(this.bookID);
            // display the status of the book as per the users input.
            this.toggleRead(this.read, this.bookID);
        },

        toggleRead(status, bookID) {
            console.log(`book is ${status}`);
            document.querySelector('#read'+bookID).checked = status;
            const status_text = document.querySelector('.status'+bookID);
            if (status) {
                status_text.textContent = 'Read';
            } else {
                status_text.textContent = 'Not Read';
            }
        },

        // dynamically create events for each book created.
        bindEvent_clickOnRead(bookID){  
            const read_checkbox = document.querySelector('#read'+bookID);
            const status_text = document.querySelector('.status'+bookID);
        
            read_checkbox.addEventListener('click', () => {
                if ( read_checkbox.checked ) { 
                     status_text.textContent = 'Read';
                } else {
                     status_text.textContent = 'Not Read';
                }
            });
        },

        // handles any clicks on the Delete icon... again for each book and card
        bindEvent_clickOnDelete(bookID){
            const deleteIconContainer = document.querySelector('#delete'+bookID);
            deleteIconContainer.addEventListener('click', () => {
                // delete this book from the aray and from the local storage
                library.deleteBook(bookID);
            });
        } 
        
    }; 
}

// Module design pattern to create the Library Object. This function fires when the script is
// loaded and creates the library object which handles the books.
let library = (() =>  {
    
    let _book;            // individual book object  
    let _userInput;       // object to hold input from user
    let _num_books = 0;   
    let _bookStorage = [];
    let _books = [];       // an array of books
 
    let bookIDsInStorage = [];
    
    // get any books already saved, this function auto invokes onLoad right
    //with the ligrary object function.
    (() => {
        _bookStorage = localStorage.getItem('books') ? JSON.parse(localStorage.getItem("books")) : [];
        bookIDsInStorage = fetchBookIds();
        console.log(_bookStorage);
        // for each object in the array, create a book and generate a card.    
        _bookStorage.forEach(loadBook);
    })();
 
    // load the books in storage one by one.
    function loadBook(item){
       // destructure the object and create a book for each one saved.
       _book = createBook(item);
       _book.generateBookCard();
    };
 
    // gets all the IDs of the previuosly saved books so that a comparison is made when
    // creating a unique ID 
    function fetchBookIds()  {
         let returnArray = [];
         for (let i = 0; i < _bookStorage.length; i++) {
             returnArray.push(_bookStorage[i].bookID);
         }
         return returnArray;
    };
 
    // save this book to locaStorage
    const saveBookToStorage = (book) => {    
         _bookStorage.push(book);
         localStorage.setItem('books', JSON.stringify(_bookStorage));
    }
    
    const deleteBookFromStorage = (bookID) => {    
         //
         // get the element by data Index
         let container = document.querySelector('.main-container');
         let all_cards = document.querySelectorAll('.nadd-card');
         let index = null;
 
         for (let i = 0; i < all_cards.length; i++) {
             index = all_cards[i].getAttribute('data-index');
             if (index == bookID) {
                 container.removeChild(all_cards[i]);
             }
         }    
         // loop through the bookStorage array and find the index of this book
         for (let i = 0; i < _bookStorage.length; i++){
             if (_bookStorage[i].bookID == bookID) {
                 console.log(index + ' ' + bookID);
                 _bookStorage.splice(i, 1);
                 localStorage.setItem('books', JSON.stringify(_bookStorage));
                 console.log(`Book ID ${bookID} has been removed from DOM and localStorage.`);
             }
         }        
     }
 
     // update this books Read attribute
    const updateBookInStorage = (bookID) => {    
         //
         //
     } 
 
    return { 
         newBook: () => {
            _userInput = validInput(bookIDsInStorage);
            if (_userInput) {
                 // fire the factory to make the book
                 _book = createBook(_userInput);
                 _book.generateBookCard();
                 library.addBook(_book);                
             }
         },
 
         addBook: (newBook) => {
            _books.push(newBook)
            _num_books++;
            saveBookToStorage(newBook);             
         },  
 
         deleteBook: (bookID) => {
             _num_books--;
             deleteBookFromStorage(bookID);
         },
 
         updateBook: (bookID) => {
             console.log(`book ${bookID} updated.`);
         },
      // books,      // 
      // bookIDsInStorage // returns all books in storage to refer to for unique IDS
    };
 })();

const validInput = (currIds) => {  
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const num_pages = document.getElementById('num-pages').value;
    const genre = document.getElementById('book-genre').value;
    let read = document.getElementById('modal-status').textContent; 
    let msg = '';
   
   if (title === '' || author === '') {
       if (title === '') msg = `a title for the book`;
       if (author === '') msg = `an author for the book`;
       if (title === '' && author === '') msg = 'the title and author information.'
       alert(`Please enter ${msg}.`);
       return false;
   }
   read ==='Read' ? read = true : read = false;
   
   let userInput = {
        title: title,
        author: author,
        num_pages: num_pages,
        genre: genre,
        read: read,
        bookID: createUniqueID(currIds)
   };

   userInput = formatInput(userInput);
   resetModalFileds();

   return userInput;    
}

// gets a unique book ID witha random # 1-300. 
const createUniqueID = (currBookIds) => {    
    let idExists = true;
    let newID = null;

    while (idExists) {
        // generate anew ID # between 1 and 300
        newID = Math.floor(Math.random() * 300) + 1; 
        // is it in use?
        if (currBookIds.indexOf(newID)) {
          idExists = false;
        }
    }
    return newID;
}

// resets all the fields after a submission. I did not use 'submit' with this because
// the form is for nothing but userinput. Nothing to submit. No backend to process the input.
const resetModalFileds = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('num-pages').value = 1;
    document.getElementById('book-genre').selectedIndex = 0;
    document.getElementById("modal-read").checked = false;
    document.getElementById('modal-status').textContent = 'Not Read';     
    
    let modal = document.getElementById("add-modal");
    modal.style.display = 'none';
}
// capitalize all words and insert commas as needed.
const formatInput = (input) => {
    let num_pages = input.num_pages;
    let strArray = [];

    for (let i = 0; i < num_pages.length; i++){                        
        strArray.push(num_pages[i]);

        if (num_pages.length === 4) {
           if (i === 0 ) strArray.push(',');
        } 
        else if (num_pages.length === 5) {
           if (i === 1 ) strArray.push(',');
        }
    }

    num_pages = strArray.join('');

    return {
        title: input.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
        author: input.author.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
        num_pages: num_pages,
        genre: input.genre,
        read: input.read,
        bookID: input.bookID
    };
}

