import './App.css';
import ReserveBook from './components/ReserveBook';
import ReturnBook from './components/ReturnBook';
import RenewEmprunt from './components/RenewEmprunt';

function App() {
  return (
    <div className="App">
            <h1>Gestion des Emprunts</h1>
            <ReserveBook />
            <ReturnBook />
            <RenewEmprunt />
        </div>
  );
}

export default App;
