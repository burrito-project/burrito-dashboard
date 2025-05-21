import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../index.css';

const Battery: React.FC = () => {
    const [batteryLevel, setBatteryLevel] = useState<number>(0);

    const getBattery = async () => {
        try {
            const response = await axios.get('https://api.burritosanmarcos.com/battery')
            setBatteryLevel(response.data.battery);
        } catch (error) {
            console.error ('Error obteniendo la batería', error);
            alert ('No se pudo obtener la batería');
        }
    };

    useEffect(() => {
        getBattery();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <svg width="250" height="120" viewBox="0 0 110 60" xmlns="http://www.w3.org/2000/svg">
                {/* Borde de la batería */}
                <rect x="2" y="10" width="90" height="40" rx="8" ry="8" fill="none" stroke="#fff" strokeWidth="2" />
                {/* Conector de la batería */}
                <rect x="92" y="20" width="8" height="20" fill="#fff" />
                {/* Nivel de carga de la batería */}
                <rect x="4" y="12" width="86" height="36" rx="6" ry="6" fill="#fff" />
                <rect x="4" y="12" width={(86 * batteryLevel) / 100} height="36" rx="6" ry="6" fill="#4caf50" />
                {/* Texto de porcentaje */}
                <text x="45" y="35" fontSize="16" fontWeight="bold" fill="fff" textAnchor="middle">
                    {batteryLevel}%
                </text>
            </svg>
        </div>
    );
};

export default Battery;