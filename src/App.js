import './App.css';
import AvailableTables from './Componentes/AvailableTables';

const App = () => {
    return (
        <div className="app">
            <nav className="navbar">
                <h1>Kanji-GO</h1>
            </nav>
            <div className="content">
                <h2 className="h2">Mesas Disponibles</h2>
                <AvailableTables />
            </div>
            <footer className="footer">
                <p>© 2023 Kanji GO Restaurant.<br></br> Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default App;

