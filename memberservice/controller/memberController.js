const memberService = require('../service/memberService');

const addMember = async (req, res) => {
    try {
        const savedMember = await memberService.addMember(req.body);
        res.status(201).json(savedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    } 
};

const getAllMembers = async (req, res) => {
    try {
        const members = await memberService.getAllMembers();
        res.json(members);
        //res.send('Hello World')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMemberById = async (req, res) => {
    try {
        const member = await memberService.getMemberById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Membre non trouvé' });
        }
        res.json(member);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateMember = async (req, res) => {
    try {
        const updatedMember = await memberService.updateMember(req.params.id, req.body);
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        await memberService.deleteMember(req.params.id);
        res.json({ message: 'Membre supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
};
