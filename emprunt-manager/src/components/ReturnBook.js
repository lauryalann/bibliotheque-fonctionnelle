import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
const ReturnBook = () => {
    const [emprunts, setEmprunts] = useState([]);
    const [selectedEmprunt, setSelectedEmprunt] = useState('');

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
                dateRetour: new Date().toISOString().split('T')[0]
            });
            alert('Livre retourné avec succes');
        } catch (error) {
            console.error('Erreur lors du retour du livre:', error);
        }
    };

    return (
        <div>
            <h2>Retourner un Livre</h2>
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

                <button type="submit">Retourner</button>
            </form>
        </div>
    );
};

export default ReturnBook;
