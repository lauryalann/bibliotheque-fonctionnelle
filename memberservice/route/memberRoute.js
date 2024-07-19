const express = require('express');
const router = express.Router();
const memberController = require('../controller/memberController');

// Ajouter un nouveau membre
router.post('/', memberController.addMember);

// R?cup?rer tous les membres
router.get('/', memberController.getAllMembers);

// R?cup?rer un membre par son identifiant
router.get('/:id', memberController.getMemberById);

// Mettre ? jour les informations d'un membre
router.put('/:id', memberController.updateMember);

// Supprimer un membre
router.delete('/:id', memberController.deleteMember);

module.exports = router;