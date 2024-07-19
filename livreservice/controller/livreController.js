const livreService = require('../service/livreService');

const addBook = async (req, res) => {
    try {
        const savedBook = await livreService.addBook(req.body);
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    } 
};

const getAllBooks = async (req, res) => {
    try {
        const books = await livreService.getAllBooks();
        res.json(books);
        //res.send('Hello World')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await livreService.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await livreService.updateBook(req.params.id, req.body);
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        await livreService.deleteBook(req.params.id);
        res.json({ message: 'Livre supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};