const Book = require('../model/livre');

// Ajouter un nouveau membre
const addBook = async (bookData) => {
    return await Book.create(bookData);
};

// Récupérer tous les membres
const getAllBooks = async () => {
    return await Book.findAll();
};

// Récupérer un membre par son identifiant
const getBookById = async (id) => {
    return await Book.findByPk(id);
};

// Mettre à jour les informations d'un membre
const updateBook = async (id, bookData) => {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new Error('Livre non trouve');
    }

    Object.assign(book, bookData);
    return await book.save();
};

// Supprimer un membre
const deleteBook = async (id) => {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new Error('Livre non trouvé');
    }
    await book.destroy();
};

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
