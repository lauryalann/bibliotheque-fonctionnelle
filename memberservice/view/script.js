document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();

    const addMemberForm = document.getElementById('add-member-form');
    addMemberForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nom = document.getElementById('nom').value;
        const adresse = document.getElementById('adresse').value;
        const telephone = document.getElementById('telephone').value;

        try {
            const response = await axios.post('/api/members', { nom, adresse, telephone });
            console.log('Member added:', response.data);
            fetchMembers();
        } catch (error) {
            console.error('Error adding member:', error);
        }
    });

    const searchMemberForm = document.getElementById('search-member-form');
    searchMemberForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchQuery = document.getElementById('search').value;
        fetchMembers(searchQuery);
    });
});

async function fetchMembers(query = '') {
    try {
        const response = await axios.get(`/api/members?search=${query}`);
        const members = response.data;
        const memberList = document.getElementById('member-list');
        memberList.innerHTML = '';

        members.forEach(member => {
            const memberItem = document.createElement('div');
            memberItem.className = 'member-item';
            memberItem.innerHTML = `
                <strong>${member.nom}</strong>, ${member.adresse}, ${member.telephone}
                <button class="edit" onclick="editMember(${member.id})">Modifier</button>
                <button onclick="deleteMember(${member.id})">Supprimer</button>
            `;
            memberList.appendChild(memberItem);
        });
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

async function editMember(id) {
    const nom = prompt("Entrez le nouveau nom:");
    const adresse = prompt("Entrez la nouvelle adresse:");
    const telephone = prompt("Entrez le nouveau téléphone:");
    
    if (nom && adresse && telephone) {
        try {
            await axios.put(`/api/members/${id}`, { nom, adresse, telephone });
            console.log('Member updated');
            fetchMembers();
        } catch (error) {
            console.error('Error updating member:', error);
        }
    }
}

async function deleteMember(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre?')) {
        try {
            await axios.delete(`/api/members/${id}`);
            console.log('Member deleted');
            fetchMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    }
}
