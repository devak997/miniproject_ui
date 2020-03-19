import React from 'react';

class Card extends React.Component {
    render() {
        return (
            <div className="ui centered card">
                <div className="content">
                    <img className="right floated mini ui image" src={this.props.user_data.profile_pic} alt="profile" />
                    <div className="header">
                        {this.props.user_data.name}
                    </div>
                    <div className="meta">
                        {this.props.user_data.screen_name}
                    </div>
                    <div className="description">
                        {this.props.user_data.description}
                    </div>
                </div>
                <div className="extra content">
                    <div className="content">
                        {this.props.tweet}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;