document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();

    const addBookForm = document.getElementById('book-form');
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const publicationDate = document.getElementById('publicationDate').value;
        const available = document.getElementById('available').value === 'true';

        try {
            const response = await axios.post('/api/books', { title, author, publicationDate, available });
            console.log('Book added:', response.data);
            fetchBooks();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    });

    const searchBookForm = document.getElementById('search-book-form');
    searchBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchQuery = document.getElementById('search').value;
        fetchBooks(searchQuery);
    });
});

async function fetchBooks(query = '') {
    try {
        const response = await axios.get(`/api/books?search=${query}`);
        const books = response.data;
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';

        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <strong>${book.title}</strong>, ${book.author}, ${book.publicationDate}, ${book.available}
                <button class="edit" onclick="editBook(${book.id})">Modifier</button>
                <button onclick="deleteBook(${book.id})">Supprimer</button>
            `;
            bookList.appendChild(bookItem);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

async function editBook(id) {
    const title = prompt("Entrez le nouveau titre:");
    const author = prompt("Entrez le nouvel auteur:");
    const publicationDate = prompt("Entrez la nouvelle date");
    const available = prompt("Entrez Disponible ou Indisponible");
    if (title && author && publicationDate && available) {
        try {
            await axios.put(`/api/books/${id}`, { title, author, publicationDate, available });
            console.log('Book updated');
            fetchBooks();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    }
}

async function deleteBook(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre?')) {
        try {
            await axios.delete(`/api/books/${id}`);
            console.log('Book deleted');
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
}
