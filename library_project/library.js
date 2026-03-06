function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        console.log(
            `${title} by ${author}, ${pages} pages, ${isRead ? 'has been read' : 'not read yet'}`
        );
    };
}

const Hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);

console.log(Hobbit.info());
console.log(Hobbit.isRead);
console.log(Hobbit.title);
console.log(Hobbit.author);
console.log(Hobbit.pages);
