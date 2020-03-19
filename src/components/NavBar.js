import React from 'react';

const NavBar = () => {
    return (
        <div className="ui inverte menu" style={{borderRadius:0}}>
            {/* eslint-disable-next-line */}
            <a className="item active" href="#">
                Home
            </a>
            {/* eslint-disable-next-line */}
            <a className="item" href="#">
                About
            </a>
        </div>
    );
}

export default NavBar;