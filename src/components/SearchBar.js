import React from 'react';

class SearchBar extends React.Component {

    render() {
        return (
            <div className="ui icon input" style={{marginLeft:'50px'}}> 
                <input type="text" placeholder="Search" value={this.props.value} onChange={this.props.handleChange} />
                <i className="inverted circular search link icon" onClick={this.props.handleSearchButton}></i>
            </div>
        );
    }
}

export default SearchBar;
