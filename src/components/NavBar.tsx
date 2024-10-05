import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css'

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
             <button onClick={toggleSidebar} style={{ margin: '10px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </button>
            {isOpen && (
                <ul className="nav-list">
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                        <a href="/batery">Batería</a>
                    </li>
                </ul>
            )}
        </div>
    );
}
export default NavBar;