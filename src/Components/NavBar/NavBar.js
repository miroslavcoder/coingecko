import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav className='navbar'>
            <ul className='navbar-ul'>
                <div className='nav-list'><li><Link to='/'>가상자산 시세 목록</Link></li></div>
                <div className='nav-list'><li><Link to='/bookmark'>북마크 목록</Link></li></div>
            </ul>
        </nav>
    )
}

export default NavBar
