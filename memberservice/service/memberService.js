const Member = require('../model/member');

// Ajouter un nouveau membre
const addMember = async (memberData) => {
    return await Member.create(memberData);
};

// Récupérer tous les membres
const getAllMembers = async () => {
    return await Member.findAll();
};

// Récupérer un membre par son identifiant
const getMemberById = async (id) => {
    return await Member.findByPk(id);
};

// Mettre à jour les informations d'un membre
const updateMember = async (id, memberData) => {
    const member = await Member.findByPk(id);
    if (!member) {
        throw new Error('Membre non trouvé');
    }

    Object.assign(member, memberData);
    return await member.save();
};

// Supprimer un membre
const deleteMember = async (id) => {
    const member = await Member.findByPk(id);
    if (!member) {
        throw new Error('Membre non trouvé');
    }
    await member.destroy();
};

module.exports = {
    addMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
};
