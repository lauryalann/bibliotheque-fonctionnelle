import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const RenewEmprunt = () => {
    const [emprunts, setEmprunts] = useState([]);
    const [selectedEmprunt, setSelectedEmprunt] = useState('');
    const [newReturnDate, setNewReturnDate] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://172.16.20.25:3003/api/emprunts');
                setEmprunts(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des emprunts:', error);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://172.16.20.25:3003/api/emprunts/${selectedEmprunt}`, {
                dateRetour: newReturnDate
            });
            alert('Emprunt renouvele avec succes');
        } catch (error) {
            console.error('Erreur lors du renouvellement de l\'emprunt:', error);
        }
    };

    return (
        <div>
            <h2>Renouveler un Emprunt</h2>
            <form onSubmit={handleSubmit}>
                <label>Selectionner un Emprunt:</label>
                <select value={selectedEmprunt} onChange={(e) => setSelectedEmprunt(e.target.value)} required>
                    <option value="">Choisir un emprunt</option>
                    {emprunts.map(emprunt => (
                        <option key={emprunt.id} value={emprunt.id}>
                            Membre: {emprunt.memberId}, Livre: {emprunt.livreId}, Date Emprunt: {emprunt.dateEmprunt}
                        </option>
                    ))}
                </select>

                <label>Nouvelle Date de Retour:</label>
                <input type="date" value={newReturnDate} onChange={(e) => setNewReturnDate(e.target.value)} required />

                <button type="submit">Renouveler</button>
            </form>
        </div>
    );
};

export default RenewEmprunt;
