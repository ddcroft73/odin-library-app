
// an array of sample book data to populate the app with quick data for testing
const sampleBooks = {

    books: [
        {
            title: 'The vanishing Half',
            author: 'Brit Bennett',
            num_pages: '352',
            genre: 'Non-Fiction',
            read: false,
            bookID: 102
        },
        {
            title: 'Object oriented programming pyrhon 3',
            author: 'dusty phillips',
            num_pages: '365',
            genre: 'Non-Fiction',
            read: true,
            bookID: 225
        },
        {
            title: 'This America: The Case for the Nation',
            author: 'Jill Lepore',
            num_pages: '160',
            genre: 'Non-Fiction',
            read: false,
            bookID: 160
        },
        {
            title: 'the scandalous hamiltons',
            author: 'bill schaffer',
            num_pages: '315',
            genre: 'Crime',
            read: false,
            bookID: 300
        },
        {
            title: 'Star Trek IV: The Voyage Home',
            author: 'Vonda N. McIntyre',
            num_pages: '288',
            genre: 'Sci-Fi',
            read: true,
            bookID: 235
        },
        {
            title: 'The Stand',
            author: 'stephen king',
            num_pages: '1152',
            genre: 'Fiction',
            read: false,
            bookID: 253
        },
        {
            title: 'les miserables',
            author: 'Victor Hugo',
            num_pages: '1488',
            genre: 'Novel',
            read: true,
            bookID: 110
        }
    ]            
}

function buildSampleData() {
    // build and display 7 books
    for(let i = 0; i < 7; i++) {
        library.newBook(true, formatInput(sampleBooks.books[i]));
    }
}

// removes the sample data(only sample data) from the DOM and from localStorage
function removeSampleData() {
    for(let i = 0; i < 7; i++) {
        library.deleteBook(sampleBooks.books[i].bookID);
    }
}
