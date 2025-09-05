const libraryBooks = []; // Basic placeholder array to store the books we're adding from the frontend as i'm not handling databases just yet

// Them selectors
const bookContainer = document.querySelector("div.book-container");
const bookDialog = document.querySelector(".book-dialog");
const bookDialogs = document.querySelectorAll("#dialogs");
const bookAdderDialog = document.querySelector("dialog.book-add-dialog");
const bookRemoverDialog = document.querySelector("dialog.book-remover-dialog");
const bookForm = document.querySelector("#book-info"); // The form to add books

// Them dialog selectors
const dialogCancelBtn = document.querySelectorAll("#cancelBtn");
const dialogConfirmBtn = document.querySelector("#confirmBtn");

// The book adder button
const bookAdderBtn = document.querySelector("button#book-adder-btn");

// The book constructor
function Book(name, author, yearOfIssue, description) {
    this.name = name;
    this.author = author;
    this.yearOfIssue = yearOfIssue;
    this.description = description;
    this.uuid = crypto.randomUUID();
};

// A function to add books to the front-end
function addBook(arr) {
    // The data
    const name = arr.name;
    const author = arr.author;
    const year = arr.yearOfIssue;
    const desc = arr.description;

    const book = libraryBooks.push(new Book(name, author, year, desc));

    // Them elements
    const button = document.createElement("button");
    const remover = document.createElement("button");

    const div = document.createElement("div");
    const image = document.createElement("img");
    const paraName = document.createElement("p");
    const paraAuthor = document.createElement("p");

    // Them attributes
    button.setAttribute("class", "book card");
    button.setAttribute("index", book - 1);
    button.type = "button";
    button.id = "book-btn";

    remover.setAttribute("class", "card-remover remover");
    remover.id = "book-btn-remover";
        
    image.setAttribute("class", "book image-thumb");
    image.src = "";
    image.alt = name;

    paraName.textContent = name;
    paraAuthor.textContent = author;
    remover.textContent = "X";

    // Add event listeners to our buttons
    button.addEventListener("click", (event) => {
        if(event.target == button) {
            showBook(libraryBooks[book - 1]);
        }
        else if(event.target == remover) {
            showRemoverModal(libraryBooks[book - 1]);
        }
    }); 
        
    // Append the elements to our container
    button.appendChild(remover);
    button.appendChild(div);
    div.appendChild(image);
    div.appendChild(paraName);
    div.appendChild(paraAuthor);
    bookContainer.appendChild(button);

    console.log(`Successfully added book: ${name}`);

    return book;
};

// A function to fetch info about the book and show that in the corresponding dialog box
function showBook(book) {
    bookDialog.showModal(); 
    
    const dialog = bookDialog;

    const name = dialog.querySelector("p.book.name > span");
    const author = dialog.querySelector("p.book.author > span");
    const year = dialog.querySelector("p.book.year > span");
    const desc = dialog.querySelector("p.book.description > span");

    name.textContent = dialog.open ? book.name : "";
    author.textContent = dialog.open ? book.author : "";
    year.textContent = dialog.open ? book.yearOfIssue : "";
    desc.textContent = dialog.open ? book.description : "";
};

// A function to show the modal to remove our books
function showRemoverModal(book) {
    bookRemoverDialog.showModal();

    const btn = bookRemoverDialog.querySelector("#confirmBtn");
    const name = bookRemoverDialog.querySelector("p.book.name > span");

    name.textContent = bookRemoverDialog.open ? `"${book.name}"?` : "";

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        handleRemover(book);
    });
    return ;
};
   
function handleRemover(book) {
    let b = document.querySelector("button.book");
    b.querySelector(".card-remover");

    // Remove the book from the library
    (function(arr, value) {
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
            return arr;
        }
        console.error("Couldn't find any books at the specified index!");
        return ;
    })(libraryBooks, book);
    
    // Remove the listener, to avoid memory leaks
    b.removeEventListener("click", handleRemover);
    b.parentElement.removeChild(b); // Remove the element and their children from the DOM 
    bookRemoverDialog.close();

    console.log(`Succesfully removed book: ${book.name}`);

    b = null;
};

// Them event listeners
bookAdderBtn.addEventListener("click", () => {
    bookAdderDialog.showModal(); // To open our book adder dialog box
})

dialogCancelBtn.forEach((btn, i) => {
    // Close the dialog when the corresponding button gets clicked
    btn.addEventListener("click", event => {
        bookDialogs[i].close();
        event.preventDefault(); // Stop from accidentally creating a new book when we hit cancel or exit
    });
});

bookForm.addEventListener("submit", event => {
    // Stop the default submission behavior from occuring
    event.preventDefault();
    // Create a new FormData constructor, firing the FormData event
    new FormData(bookForm);
});

bookForm.addEventListener("formdata", event => {
    console.log("FormData fired");

    // Get the form data from the event
    const data = event.formData;
    const arr = [];

    // Push our form datae to an array. 
    data.forEach((value, key) => {
        arr.push([key, value]);
    });

    // Convert our array into an object 
    let obj = [Object.fromEntries(arr),];
    obj = obj[0]; 

    addBook(obj); // adds our books to the screen

    // Close the dialog 
    bookAdderDialog.close();  
});