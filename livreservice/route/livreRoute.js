const express = require('express');
const router = express.Router();
const bookController = require('../controller/livreController');

// Ajouter un nouveau membre
router.post('/', bookController.addBook);

// R?cup?rer tous les membres
router.get('/', bookController.getAllBooks);

// R?cup?rer un membre par son identifiant
router.get('/:id', bookController.getBookById);

// Mettre ? jour les informations d'un membre
router.put('/:id', bookController.updateBook);

// Supprimer un membre
router.delete('/:id', bookController.deleteBook);

module.exports = router;