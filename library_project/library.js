const libWrapper = document.querySelector('.library__wrapper');
const openModalBtn = document.querySelector('.open_modal');
const modal = document.querySelector('.new_book_modal');
const closeModalBtn = modal.querySelector('.close_btn');
const form = document.querySelector('#new_book_form');
const submitBtn = document.querySelector('.add_book_btn');

const library = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 295,
        isRead: false,
    },
    { title: '1984', author: 'George Orwell', pages: 328, isRead: true },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        pages: 281,
        isRead: true,
    },
    { title: 'Dune', author: 'Frank Herbert', pages: 412, isRead: false },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        pages: 180,
        isRead: true,
    },
];

library.forEach((book) => {
    const newBook = new Book(book.title, book.author, book.pages, book.isRead);
    libWrapper.append(newBook.createBook());
});

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.createBook = function () {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        title.textContent = this.title;
        author.textContent = this.author;
        pages.textContent = this.pages + ' pages';
        deleteBtn.classList.add('delete_book_btn');
        deleteBtn.classList.add('closed');
        title.classList.add('book__title');
        author.classList.add('book__author');
        pages.classList.add('book__pages');
        bookDiv.append(title, author, pages, deleteBtn);
        if (this.isRead === true) {
            bookDiv.style.borderLeft = '10px solid lightgreen';
        } else {
            bookDiv.style.borderLeft = '10px solid red';
        }
        return bookDiv;
    };
    this._id = crypto.randomUUID();
}

function toggleModal(e) {
    e.preventDefault();
    if (modal.classList.contains('closed')) {
        modal.classList.remove('closed');
        modal.classList.add('open');
    } else {
        modal.classList.remove('open');
        modal.classList.add('closed');
    }
}

function addBook(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    library.push(formObject);
    if (formObject.isRead === 'on') {
        const freshBook = new Book(
            formObject.title,
            formObject.author,
            formObject.pages,
            true
        );
        libWrapper.append(freshBook.createBook());
    } else if (!formObject.title || !formObject.author || !formObject.pages) {
        return console.error(
            'You must fill every field of the form out in order to add the book!!'
        );
    } else {
        const freshBook = new Book(
            formObject.title,
            formObject.author,
            formObject.pages,
            false
        );
        libWrapper.append(freshBook.createBook());
    }
    toggleModal(e);
}

libWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete_book_btn')) {
        const book = e.target.closest('.book');
        book.remove();
    }
});

libWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('book')) {
        const book = e.target;
        book.style.borderLeft === '10px solid lightgreen'
            ? (book.style.borderLeft = '10px solid red')
            : (book.style.borderLeft = '10px solid lightgreen');
    }
});

openModalBtn.addEventListener('click', toggleModal);

closeModalBtn.addEventListener('click', toggleModal);

submitBtn.addEventListener('click', addBook);
