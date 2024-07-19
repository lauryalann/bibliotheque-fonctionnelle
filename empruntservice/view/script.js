document.addEventListener('DOMContentLoaded', () => {
    // Charger les membres et les livres au chargement de la page
    loadOptions();
    fetchEmprunts();
    // Formulaires
    const reservationForm = document.getElementById('reservation-form');
    const returnForm = document.getElementById('return-form');
    const renewalForm = document.getElementById('renewal-form');

    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const memberId = document.getElementById('member').value;
        const livreId = document.getElementById('book').value;
        const dateEmprunt = document.getElementById('dateEmprunt').value;
        const dateRetour = document.getElementById('dateRetour').value;
        try {
            await axios.post('/api/emprunts', { memberId, livreId, dateEmprunt, dateRetour });
            alert('Réservation effectuée avec succès!');
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
        }
    });

    returnForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const memberId = document.getElementById('return-member').value;
        const bookId = document.getElementById('return-book').value;

        try {
            await axios.post('/api/emprunts/return', { memberId, bookId });
            alert('Livre retourné avec succès!');
        } catch (error) {
            console.error('Erreur lors du retour du livre:', error);
        }
    });

    renewalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const memberId = document.getElementById('renew-member').value;
        const bookId = document.getElementById('renew-book').value;

        try {
            await axios.post('/api/emprunts/renew', { memberId, bookId });
            alert('Emprunt renouvelé avec succès!');
        } catch (error) {
            console.error('Erreur lors du renouvellement de l\'emprunt:', error);
        }
    });
});

async function loadOptions() {
    try {
        const membersResponse = await axios.get('http://172.16.20.25:3002/api/members');
        const booksResponse = await axios.get('http://172.16.20.25:3001/api/books');
        
        console.log('Members response:', membersResponse.data); // Log the members response
        console.log('Books response:', booksResponse.data); // Log the books response
        
        const members = membersResponse.data;
        const books = booksResponse.data;

        populateSelect('member', members);
        populateSelect('return-member', members);
        populateSelect('renew-member', members);

        BookSelect('book', books);
        BookSelect('return-book', books);
        BookSelect('renew-book', books);

    } catch (error) {
        console.error('Erreur lors du chargement des options:', error);
    }
}

function populateSelect(id, items) {
    const select = document.getElementById(id);
    select.innerHTML = '<option value="">-- Selectionner --</option>';
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.nom; // Adaptez cela en fonction des données reçues
        select.appendChild(option);
    });
}
function BookSelect(id, items) {
    const select = document.getElementById(id);
    select.innerHTML = '<option value="">-- Selectionner --</option>';
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent =item.title; // Adaptez cela en fonction des données reçues
        select.appendChild(option);
    });
}
async function fetchEmprunts(query = '') {
    try {
        const response = await axios.get(`/api/emprunts?search=${query}`);
        const emprunts = response.data;
        const empruntList = document.getElementById('emprunt-list');
        empruntList.innerHTML = '';

        emprunts.forEach(emprunt => {
            const empruntItem = document.createElement('div');
            empruntItem.className = 'emprunt-item';
            empruntItem.innerHTML = `
                <strong>${emprunt.memberId}</strong>, ${emprunt.livreId}, ${emprunt.dateEmprunt}, ${emprunt.dateRetour}
                <button class="edit" onclick="editEmprunt(${emprunt.id})">Modifier</button>
                <button onclick="deleteEmprunt(${emprunt.id})">Supprimer</button>
            `;
            empruntList.appendChild(empruntItem);
        });
    } catch (error) {
        console.error('Error fetching emprunts:', error);
    }
}
async function editEmprunt(id) {
    const memberId = prompt("Entrez le nouveau membre:");
    const livreId = prompt("Entrez le nouvel livre:");
    const dateEmprunt = prompt("Entrez la nouvelle date");
    const dateRetour = prompt("Entrez la nouvelle date");
    if (memberId && livreId && dateEmprunt && dateRetour) {
        try {
            await axios.put(`/api/emprunts/${id}`, { memberId, livreId, dateEmprunt, dateRetour });
            console.log('Emprunt updated');
            fetchEmprunts();
        } catch (error) {
            console.error('Error updating emprunt:', error);
        }
    }
}

async function deleteEmprunt(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet emprunt?')) {
        try {
            await axios.delete(`/api/emprunts/${id}`);
            console.log('Emprunt deleted');
            fetchEmprunts();
        } catch (error) {
            console.error('Error deleting Emprunt:', error);
        }
    }
}
