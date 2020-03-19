import React from 'react';
import NavBar from './components/NavBar';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Chart from "react-google-charts";
import Loader from './components/Loader';

class App extends React.Component {

    state = { tweetid: '', tweet: '', userDetails: {}, replies: [], classes: [], count: {}, initial: true, loading: false };

    handleSearchButton = () => {
        const data = { tweet_url: this.state.tweetid }
        this.setState({ loading: true, initial: false });
        axios.post('http://127.0.0.1:5000/search', { data }).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({ tweet: res.data.tweet, userDetails: res.data.user_details, replies: res.data.replies, classes: res.data.classes, count: res.data.count, loading: false, initial: false })
            }
        }).catch(err => {
            console.log(err);
            window.alert(err);
            this.setState({ loading: false, initial: true })
        });
    }

    onSearchChange = (e) => {
        this.setState({ tweetid: e.target.value })
    }

    displayReplies = () => {
        console.log(this.state.classes)
        return (
            this.state.replies.map((ele, i) => {
                return (
                    <div className={`ui ${this.state.classes[i] === 0 ? 'red' : 'green'} message`} key={i}>{ele}</div>
                );
            })
        );
    }



    displayRight = () => {
        if (this.state.initial) {
            return (
                <div className="ui message">
                    <div className="header">
                        Political Opinion Mining 
                    </div>
                    <p>Just one step away! Copy the link of the tweet yoy want to analyze and paste it on the left. :-)</p>
                </div>
            );
        }
        if (this.state.loading) {
            return (
                <Loader />
            );
        }

        return (
            <div>
                <div className="ui grid">
                    <div className="six wide column">
                        <div className="ui horizontal statistics">
                            <div className="statistic">
                                <div className="value">
                                    {this.state.count.replies}
                                </div>
                                <div className="label">
                                    Replies
                                        </div>
                            </div>
                            <div className="statistic">
                                <div className="value">
                                    {this.state.count.positive}
                                </div>
                                <div className="label">
                                    Positive
                                        </div>
                            </div>
                            <div className="statistic">
                                <div className="value">
                                    {this.state.count.negative}
                                </div>
                                <div className="label">
                                    Negative
                                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="ten wide column">
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Class', 'Count'],
                                ['Positive', this.state.count.positive],
                                ['Negative', this.state.count.negative],
                            ]}
                            options={{
                                title: 'Response Analysis',
                                sliceVisibilityThreshold: 0.2, // 20%
                            }}
                            rootProps={{ 'data-testid': '7' }}
                        />
                    </div>
                </div>
                {this.displayReplies()}
            </div>
        );
    }
    render() {
        return (
            <div >
                <NavBar />
                <div className="ui floated grid" style={{ height: '700px' }}>
                    <div className="four wide column" style={{ backgroundColor: 'silver' }}>
                        <SearchBar handleSearchButton={this.handleSearchButton} value={this.state.tweetid} handleChange={this.onSearchChange} />
                        <div className="ui cards" style={{ marginTop: '15px', display: `${(this.state.loading || this.state.initial) ? 'none': ''}` }}>
                            <Card user_data={this.state.userDetails} tweet={this.state.tweet} />
                        </div>
                    </div>
                    <div className="twelve wide column" style={{ height: '650px', overflow: 'auto' }}>
                        {this.displayRight()}

                    </div>
                </div>
            </div>
        );
    }
}

export default App;