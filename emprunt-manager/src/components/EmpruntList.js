import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const EmpruntList = () => {
    const [emprunts, setEmprunts] = useState([]);

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

    return (
        <div>
            <h2>Liste des Emprunts</h2>
            <div>
                {emprunts.map(emprunt => (
                    <div key={emprunt.id} className="emprunt-item">
                        <strong>Membre: {emprunt.Id}</strong>, Livre: {emprunt.livreId}, Date Emprunt: {emprunt.dateEmprunt}, Date de Retour: {emprunt.dateRetour || 'En cours'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmpruntList;
