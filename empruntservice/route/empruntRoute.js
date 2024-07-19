const express = require('express');
const router = express.Router();
const empruntController = require('../controller/empruntController');

// Ajouter un nouveau emprunt
router.post('/', empruntController.emprunterLivre);

// R?cup?rer tous les emprunts
router.get('/', empruntController.getAllEmprunts);

// R?cup?rer un emprunt par son identifiant
router.get('/:id', empruntController.getEmpruntById);

// Mettre ? jour les informations d'un emprunt
router.put('/:id', empruntController.updateEmprunt);

// Renouveler un emprunt(Modifier sa date de retour)
router.put('/renouveler/:id', empruntController.renouvelerEmprunt);

// Retourner un livre
router.put('/retourner/:id', empruntController.retournerLivre);

// Supprimer un membre
router.delete('/:id', empruntController.deleteEmprunt);

module.exports = router;