// Fungsi untuk menyimpan data buku ke dalam localStorage
function saveBook(book) {
    let books = [];
    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

// Fungsi untuk menampilkan jumlah buku yang sesuai dengan data di localStorage
function displayBookCount() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const jumlahBukuElement = document.getElementById('jumlahBuku');
    jumlahBukuElement.textContent = books.length.toString();
  }
  // Panggil fungsi displayBookCount() saat halaman dimuat
  displayBookCount();
  
// Fungsi untuk menangani pengiriman formulir tambah buku
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const yearInput = document.getElementById("year");
    const statusInput = document.getElementById("status");
  
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const year = yearInput.value.trim();
    const status = statusInput.checked ? "Dibaca" : "Belum Dibaca";
  
    if (title === "" || author === "" || year === "") {
      alert("Lengkapi Semua Data");
      return;
    }
    const book = {
      title,
      author,
      year,
      status,
    };
  
    saveBook(book);
  
    // Reset formulir setelah buku disimpan
    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    statusInput.checked = false;

    alert("Buku berhasil ditambahkan!");
  
    // Tampilkan kembali data pada div "Read" dan "Unread"
    displayReadBooks();
    displayUnreadBooks();
  
    // Update jumlah buku
    displayBookCount();
});

// Fungsi untuk menampilkan data buku pada div "Read" dengan tombol "move" dan "edit"
function displayReadBooks() {
    // ...
    books.forEach((book, index) => {
      if (book.status === "Dibaca") {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
          <h4>${book.title}</h4>
          <p>Penulis: ${book.author}</p>
          <p>Tahun: ${book.year}</p>
          <button class="delete-button" onclick="deleteBook(${index})">Hapus</button>
          <button class="edit-button" onclick="editBook(${index})">Edit</button>
          <button class="move-button" onclick="moveToUnread(${index})">Belum Selesai</button>
        `;
        readDiv.appendChild(bookDiv);
      }
    });
  }
  
  // Fungsi untuk menampilkan data buku pada div "Unread" dengan tombol "move" dan "edit"
  function displayUnreadBooks() {
    // ...
    books.forEach((book, index) => {
      if (book.status !== "Dibaca") {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
          <h4>${book.title}</h4>
          <p>Penulis: ${book.author}</p>
          <p>Tahun: ${book.year}</p>
          <button class="delete-button" onclick="deleteBook(${index})">Hapus</button>
          <button class="edit-button" onclick="editBook(${index})">Edit</button>
          <button class="move-button" onclick="moveToRead(${index})">Tandai Selesai</button>
        `;
        unreadDiv.appendChild(bookDiv);
      }
    });
  }
  
  // Fungsi untuk menghapus buku dari localStorage berdasarkan indeks
  function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  
    // Setelah menghapus buku, tampilkan kembali data pada div "Read" dan "Unread"
    displayReadBooks();
    displayUnreadBooks();
  }
  
  // Panggil fungsi untuk menampilkan data buku saat halaman dimuat
  displayReadBooks();
  displayUnreadBooks();

  // Fungsi untuk memindahkan buku dari "Read" ke "Unread" berdasarkan indeks
function moveToUnread(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
  
    if (books[index].status === "Dibaca") {
      books[index].status = "Belum Dibaca";
      localStorage.setItem('books', JSON.stringify(books));
  
      // Tampilkan kembali data pada div "Read" dan "Unread"
      displayReadBooks();
      displayUnreadBooks();
    }
  }
  
  // Fungsi untuk memindahkan buku dari "Unread" ke "Read" berdasarkan indeks
  function moveToRead(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
  
    if (books[index].status === "Belum Dibaca") {
      books[index].status = "Dibaca";
      localStorage.setItem('books', JSON.stringify(books));
  
      // Tampilkan kembali data pada div "Read" dan "Unread"
      displayReadBooks();
      displayUnreadBooks();
    }
  }
  
  // Fungsi untuk menampilkan data buku pada div "Read" dengan tombol "move"
  function displayReadBooks() {
    const readDiv = document.getElementById("read");
    const books = JSON.parse(localStorage.getItem('books')) || [];
  
    // Kosongkan div "Read" sebelum menambahkan buku-buku
    readDiv.innerHTML = '';
  
    if (books.length === 0) {
      readDiv.innerHTML = "<p>Tidak ada buku yang selesai dibaca.</p>";
    } else {
      books.forEach((book, index) => {
        if (book.status === "Dibaca") {
          const bookDiv = document.createElement("div");
          bookDiv.classList.add("book");
          bookDiv.innerHTML = `
            <h4>${book.title}</h4>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <button class="delete-button" onclick="deleteBook(${index})">Hapus</button>
            <button class="edit-button" onclick="editBook(${index})">Edit</button>
            <button class="move-button" onclick="moveToUnread(${index})">Belum Selesai</button>
          `;
          readDiv.appendChild(bookDiv);
        }
      });
    }
  }
  
  // Fungsi untuk menampilkan data buku pada div "Unread" dengan tombol "move"
  function displayUnreadBooks() {
    const unreadDiv = document.getElementById("unread");
    const books = JSON.parse(localStorage.getItem('books')) || [];
  
    // Kosongkan div "Unread" sebelum menambahkan buku-buku
    unreadDiv.innerHTML = '';
  
    if (books.length === 0) {
      unreadDiv.innerHTML = "<p>Tidak ada buku yang belum selesai dibaca.</p>";
    } else {
      books.forEach((book, index) => {
        if (book.status !== "Dibaca") {
          const bookDiv = document.createElement("div");
          bookDiv.classList.add("book");
          bookDiv.innerHTML = `
            <h4>${book.title}</h4>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <button class="delete-button" onclick="deleteBook(${index})">Hapus</button>
            <button class="edit-button" onclick="editBook(${index})">Edit</button>
            <button class="move-button" onclick="moveToRead(${index})">Tandai Selesai</button>
          `;
          unreadDiv.appendChild(bookDiv);
        }
      });
    }
  }
 
  // Fungsi untuk mengedit buku berdasarkan indeks
function editBook(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const bookToEdit = books[index];
  
    // Tampilkan modal edit dengan data buku yang dipilih
    const modalEdit = document.getElementById("modal-edit");
    const titleEditInput = document.getElementById("title-edit");
    const authorEditInput = document.getElementById("author-edit");
    const yearEditInput = document.getElementById("year-edit");
    const statusEditInput = document.getElementById("status-edit");
  
    titleEditInput.value = bookToEdit.title;
    authorEditInput.value = bookToEdit.author;
    yearEditInput.value = bookToEdit.year;
    statusEditInput.checked = bookToEdit.status === "Dibaca";
  
    // Definiskan fungsi untuk mengupdate data buku setelah diedit
    const updateButton = document.getElementById("update");
    updateButton.addEventListener("click", function () {
      const editedBook = {
        title: titleEditInput.value.trim(),
        author: authorEditInput.value.trim(),
        year: yearEditInput.value.trim(),
        status: statusEditInput.checked ? "Dibaca" : "Belum Dibaca",
      };
  
      if (
        editedBook.title === "" ||
        editedBook.author === "" ||
        editedBook.year === ""
      ) {
        alert("Lengkapi Semua Data");
        return;
      }
  
      books[index] = editedBook;
      localStorage.setItem('books', JSON.stringify(books));
  
      // Tutup modal edit
      modalEdit.style.display = "none";
  
      // Tampilkan kembali data pada div "Read" dan "Unread" setelah mengedit
      displayReadBooks();
      displayUnreadBooks();
    });
  
    // Tampilkan modal edit
    modalEdit.style.display = "block";
  
    // Definiskan fungsi untuk membatalkan edit
    const cancelEditButton = document.getElementById("cancel-edit");
    cancelEditButton.addEventListener("click", function () {
      modalEdit.style.display = "none";
    });
  }
  