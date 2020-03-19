import React from 'react';

const Loader = () => {
    return (
        <div className="ui segment" style={{height: '200px'}}>
            <div className="ui active dimmer">
                <div className="ui large text loader">Loading</div>
            </div>
            <p></p>
        </div>
    );
}

export default Loader;