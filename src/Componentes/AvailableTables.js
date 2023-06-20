import React, { useState, useRef, useEffect } from 'react';
import '../Estilos/AvailableTables.css'; // Archivo CSS creado
import axios from 'axios';
import noTablesImage from '../Img/time.png'; // Ruta de la imagen cuando no hay mesas disponibles
import Clock from '../Componentes/Clock';

const AvailableTables = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const optionsWindowRef = useRef(null);
    const [availableTables, setAvailableTables] = useState([]);

    const handleTableClick = (table) => {
        setSelectedTable(table);
        setShowOptions(true);
        if (showOptions) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/mesas/all')
            .then((response) => {
                setAvailableTables(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las mesas:', error);
            });
        if (showOptions && optionsWindowRef.current) {
            const tableCard = document.querySelector(`[data-table-id="${selectedTable[0]}"]`);
            if (tableCard) {
                const tableCardRect = tableCard.getBoundingClientRect();
                optionsWindowRef.current.style.top = `${tableCardRect.top}px`;
            }
        }
    }, [showOptions, selectedTable]);

    const handleAccept = () => {
        if (selectedTable) {
            const updatedTable = [...selectedTable]; // Copia de la mesa seleccionada
            updatedTable[2] = 'Ocupada'; // Actualiza el estado de la mesa

            axios.put(`http://localhost:3001/api/mesas/asignarMesa/${selectedTable[0]}`, { ESTADO_MESA: 'Ocupada' })
                .then(response => {
                    console.log('Mesa actualizada con éxito:', response.data);
                    setAvailableTables(prevTables => {
                        return prevTables.map(table => {
                            if (table[0] === selectedTable[0]) {
                                return updatedTable;
                            } else {
                                return table;
                            }
                        });
                    });
                    setShowOptions(false);
                })
                .catch(error => {
                    console.error('Error al actualizar la mesa:', error);
                    // Manejar el error de alguna manera si es necesario
                });
        }
    };


    const handleCancel = () => {
        // Lógica para manejar el evento de "Cancelar"
        if (showOptions) {
            setShowOptions(false);
        }
    };

    return (
        <div className="available-tables">

            {availableTables.length === 0 ? (
                <div className="no-tables">
                    <img className="image-time" src={noTablesImage} alt="No hay mesas disponibles" />
                    <Clock />
                    <p className="h3">No hay mesas disponibles en este momento</p>
                </div>
            ) : (

                <div className="table-list">
                    <div>
                        <h3 className="h3">Elija una mesa para comenzar...</h3>
                    </div>
                    {availableTables.map((table) => (
                        <button
                            key={table[0]}
                            className={`table-card ${selectedTable === table ? 'selected' : ''}`}
                            onClick={() => handleTableClick(table)}
                        >
                            <p className="table-name">Mesa:{table[0]}</p>
                            <p className="table-capacity">Capacidad: {table[1]}</p>
                            <p className="table-name">{table[2]}</p>
                        </button>
                    ))}
                </div>
            )}
            {selectedTable && showOptions && (
                <div className="options-window" ref={optionsWindowRef}>
                    <h4>Asignar mesa {selectedTable[0]} ?<br></br></h4>
                    <div className="options-buttons">
                        <button className="btn-accept" onClick={handleAccept}>ASIGNAR</button>
                        <button className="btn-cancel" onClick={handleCancel}>CANCELAR</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailableTables;
