// Fungsi untuk menampilkan div "Selesai Dibaca"
function showReadContent() {
    const readDiv = document.getElementById("read");
    readDiv.style.display = "block";

    const unreadDiv = document.getElementById("unread");
    unreadDiv.style.display = "none";

    // Gulir ke div "Selesai Dibaca"
    readDiv.scrollIntoView({ behavior: "smooth" });

    // Menambahkan kelas "active" ke tombol "Read"
    const readButton = document.querySelector(".read-button");
    const unreadButton = document.querySelector(".unread-button");
    readButton.classList.add("active");
    unreadButton.classList.remove("active");
}

// Fungsi untuk menampilkan div "On Progress Dibaca"
function showUnreadContent() {
    const readDiv = document.getElementById("read");
    readDiv.style.display = "none";

    const unreadDiv = document.getElementById("unread");
    unreadDiv.style.display = "block";

    // Gulir ke div "On Progress Dibaca"
    unreadDiv.scrollIntoView({ behavior: "smooth" });

    // Menambahkan kelas "active" ke tombol "Unread"
    const readButton = document.querySelector(".read-button");
    const unreadButton = document.querySelector(".unread-button");
    readButton.classList.remove("active");
    unreadButton.classList.add("active");
}

// Fungsi untuk menampilkan div "Tambah Buku Baru"
function showAddContent() {
    const modalDiv = document.getElementById("modal");
    modalDiv.style.display = "block";

    // Gulir ke elemen "Tambah Buku Baru"
    const addContainer = document.querySelector(".my-container");
    addContainer.scrollIntoView({ behavior: "smooth" });

    // Menghapus kelas "active" dari semua tombol
    const readButton = document.querySelector(".read-button");
    const unreadButton = document.querySelector(".unread-button");
    readButton.classList.remove("active");
    unreadButton.classList.remove("active");
}

// Mengaitkan fungsi-fungsi di atas ke tombol-tombol yang sesuai
document.querySelector(".read-button").addEventListener("click", showReadContent);
document.querySelector(".unread-button").addEventListener("click", showUnreadContent);
document.querySelector(".add-button").addEventListener("click", showAddContent);

// Inisialisasi dengan menambahkan kelas "active" ke tombol "Read" secara default
const readButton = document.querySelector(".read-button");
readButton.classList.add("active");

// Fungsi untuk menampilkan buku dalam elemen "read" atau "unread"
function displayBook(book, parentElementId, status) {
    // Membuat elemen buku baru
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const titleElement = document.createElement("h5");
    titleElement.textContent = `Judul Buku: ${book.title}`;

    const authorElement = document.createElement("p");
    authorElement.textContent = `Penulis: ${book.author}`;

    const yearElement = document.createElement("p");
    yearElement.textContent = `Tahun: ${book.year}`;

    const moveButton = document.createElement("button");
    moveButton.textContent = status === "Dibaca" ? "Belum Selesai" : "Tandai Selesai";
    moveButton.addEventListener("click", function () {
        moveBook(book, status);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", function () {
        deleteBook(book);
    });

    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(authorElement);
    bookDiv.appendChild(yearElement);
    bookDiv.appendChild(moveButton);
    bookDiv.appendChild(deleteButton);

    const parentElement = document.getElementById(parentElementId);
    parentElement.appendChild(bookDiv);
}

// Fungsi untuk memindahkan buku dari "Read" ke "Unread" atau sebaliknya
function moveBook(book, status) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const index = books.findIndex((b) => b.title === book.title);

    if (status === "Dibaca") {
        books[index].status = "Belum Dibaca";
    } else {
        books[index].status = "Dibaca";
    }
    localStorage.setItem('books', JSON.stringify(books));

    // Tampilkan kembali data pada div "Read" dan "Unread"
    displayReadBooks();
    displayUnreadBooks();
}
    // Menambahkan elemen-elemen buku ke dalam elemen buku baru
    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(authorElement);
    bookDiv.appendChild(yearElement);
    bookDiv.appendChild(deleteButton);

    // Menambahkan elemen buku baru ke dalam elemen "read" atau "unread" yang sesuai
    const parentDiv = document.getElementById(parentElementId);
    parentDiv.appendChild(bookDiv);

