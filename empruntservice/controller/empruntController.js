const Emprunt = require('../model/emprunt');; // Assurez-vous que le modèle Emprunt est exporté depuis models.js
const axios = require('axios');

// Méthode pour emprunter un livre
exports.emprunterLivre = async (req, res) => {
    const { memberId, livreId, dateEmprunt, dateRetour } = req.body;

    try {
        // Vérifier que le membre et le livre existent
        const memberResponse = await axios.get(`http://172.16.20.25:3002/api/members/${memberId}`);
        const livreResponse = await axios.get(`http://172.16.20.25:3001/api/books/${livreId}`);

        if (!memberResponse.data || !livreResponse.data) {
            return res.status(404).json({ message: 'Membre ou livre non trouvé' });
        }

        // Créer l'emprunt
        const emprunt = await Emprunt.create({
            memberId,
            livreId,
            dateEmprunt,
            dateRetour
        });

        res.status(201).json(emprunt);
    } catch (error) {
        console.error('Erreur lors de l\'emprunt:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Obtenir tous les emprunts
exports.getAllEmprunts = async (req, res) => {
    try {
        const emprunts = await Emprunt.findAll();
        res.json(emprunts);
    } catch (error) {
        console.error('Erreur lors de la récupération des emprunts:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Obtenir un emprunt par ID
exports.getEmpruntById = async (req, res) => {
    const { id } = req.params;

    try {
        const emprunt = await Emprunt.findByPk(id);

        if (!emprunt) {
            return res.status(404).json({ message: 'Emprunt non trouvé' });
        }

        res.json(emprunt);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'emprunt:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Mettre à jour un emprunt
exports.updateEmprunt = async (req, res) => {
    const { id } = req.params;
    const { memberId, livreId, dateEmprunt, dateRetour } = req.body;

    try {
        const emprunt = await Emprunt.findByPk(id);

        if (!emprunt) {
            return res.status(404).json({ message: 'Emprunt non trouvé' });
        }

        if (memberId) emprunt.memberId = memberId;
        if (livreId) emprunt.livreId = livreId;
        if (dateEmprunt) emprunt.dateEmprunt = dateEmprunt;
        if (dateRetour) emprunt.dateRetour = dateRetour;

        await emprunt.save();
        res.json(emprunt);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'emprunt:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un emprunt
exports.deleteEmprunt = async (req, res) => {
    const { id } = req.params;

    try {
        const emprunt = await Emprunt.findByPk(id);

        if (!emprunt) {
            return res.status(404).json({ message: 'Emprunt non trouvé' });
        }

        await emprunt.destroy();
        res.json({ message: 'Emprunt supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'emprunt:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Méthode pour retourner un livre
exports.retournerLivre = async (req, res) => {
    const { id } = req.params;
    const { dateRetour } = req.body;

    try {
        const emprunt = await Emprunt.findByPk(id);

        if (!emprunt) {
            return res.status(404).json({ message: 'Emprunt non trouvé' });
        }

        emprunt.dateRetour = dateRetour;
        await emprunt.save();

        res.json(emprunt);
    } catch (error) {
        console.error('Erreur lors du retour du livre:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Méthode pour renouveler un emprunt
exports.renouvelerEmprunt = async (req, res) => {
    const { id } = req.params;
    const { newDateRetour } = req.body;

    try {
        const emprunt = await Emprunt.findByPk(id);

        if (!emprunt) {
            return res.status(404).json({ message: 'Emprunt non trouvé' });
        }

        emprunt.dateRetour = newDateRetour;
        await emprunt.save();

        res.json(emprunt);
    } catch (error) {
        console.error('Erreur lors du renouvellement de l\'emprunt:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
