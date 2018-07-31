import React from 'react';

import Logo from '../assets/images/Logo.png';

function Header(props) {
    return (
        <section className="Header">
            <img src={Logo} id="logo-sm" alt="Not Google" onClick={() => props.history.push('/')} />
            <input value={props.inputValue} onChange={e => props.inputChange(e)} onKeyDown={e => props.inputKeyDown(e)} />
        </section>
    )
}

export default Header;