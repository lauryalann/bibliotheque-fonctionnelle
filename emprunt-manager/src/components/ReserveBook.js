import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReserveBook = () => {
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editReservationId, setEditReservationId] = useState(null);
    const [newEmpruntDate, setNewEmpruntDate] = useState('');
    const [newReturnDate, setNewReturnDate] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const [membersRes, booksRes, reservationsRes] = await Promise.all([
                    axios.get('http://172.16.20.25:3002/api/members'),
                    axios.get('http://172.16.20.25:3001/api/books'),
                    axios.get('http://172.16.20.25:3003/api/emprunts')
                ]);
                setMembers(membersRes.data);
                setBooks(booksRes.data);
                setReservations(reservationsRes.data);
            } catch (error) {
                console.error('Erreur lors du chargement des donnees:', error);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://172.16.20.25:3003/api/emprunts/${editReservationId}`, {
                    memberId: selectedMember,
                    livreId: selectedBook,
                    dateEmprunt: new Date().toISOString().split('T')[0],
                    dateRetour: new Date().toISOString().split('T')[0]
                });
                setIsEditing(false);
                setEditReservationId(null);
            } else {
                await axios.post('http://172.16.20.25:3003/api/emprunts', {
                    memberId: selectedMember,
                    livreId: selectedBook,
                    dateEmprunt: new Date().toISOString().split('T')[0],
                    dateRetour: new Date().toISOString().split('T')[0]
                });
            }
            fetchReservations();
            alert(isEditing ? 'Reservation mise à jour avec succes' : 'Livre reserve avec succes');
        } catch (error) {
            console.error('Erreur lors de la reservation:', error);
        }
    };

    const fetchReservations = async () => {
        try {
            const reservationsRes = await axios.get('http://172.16.20.25:3003/api/emprunts');
            setReservations(reservationsRes.data);
        } catch (error) {
            console.error('Erreur lors du chargement des reservations:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://172.16.20.25:3003/api/emprunts/${id}`);
            fetchReservations();
            alert('Réservation supprimée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la reservation:', error);
        }
    };

    const handleEdit = (reservation) => {
        setSelectedMember(reservation.memberId);
        setSelectedBook(reservation.livreId);
        setIsEditing(true);
        setEditReservationId(reservation.id);
    };

    return (
        <div>
            <h2>{isEditing ? 'Modifier la Reservation' : 'Reserver un Livre'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Selectionner un Membre:</label>
                <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)} required>
                    <option value="">Choisir un membre</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>{member.nom}</option>
                    ))}
                </select>

                <label>Selectionner un Livre:</label>
                <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} required>
                    <option value="">Choisir un livre</option>
                    {books.map(book => (
                        <option key={book.id} value={book.id}>{book.title}</option>
                    ))}
                </select>
                <label>Date Emprunt:</label>
                <input type="date" value={newEmpruntDate} onChange={(e) => setNewEmpruntDate(e.target.value)} required />
                <label>Date Retour:</label>
                <input type="date" value={newReturnDate} onChange={(e) => setNewReturnDate(e.target.value)} required />
                <button type="submit">{isEditing ? 'Modifier' : 'Reserver'}</button>
            </form>

            <h2>Liste des Reservations</h2>
              {reservations.map(reservation => (
                  <div className = 'emprunt-list' key={reservation.id}>
                      <div className = 'emprunt-item' key={reservation.id}>
                          Membre: {reservation.memberId}, Livre: {reservation.livreId}, Date emprunt: {reservation.dateEmprunt}, Date retour: {reservation.dateRetour}
                          <button className='edit' onClick={() => handleEdit(reservation)}>Modifier</button>
                          <button className='delete' onClick={() => handleDelete(reservation.id)}>Supprimer</button>
                      </div>
                  </div>
              ))}
        </div>
    );
};

export default ReserveBook;
