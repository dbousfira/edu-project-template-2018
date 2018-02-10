import React, {Component, PropTypes} from 'react';

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            err: null
        }
    }
    
    async load() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/episodes/').then(res => {
                res.json().then(parsed => {
                    resolve(parsed);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }

    componentDidMount() {
        this.load().then(parsed => {
            this.setState({
                data: parsed
            });
        }).catch(err => {
            this.setState({
                err: err
            });
        });
    }

    render() {
        const hasData = this.state.data != null && this.state.data.length != 0;
        return(
            <div className="container">
                { hasData ? (
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Score</th>
                        </tr> 
                        <br/>
                        { this.state.data.map(function(ep) {
                            return (
                                <tr>
                                    <th>{ ep.name }</th>
                                    <th>{ ep.code }</th>
                                    <th>{ ep.score }/10</th>
                                </tr>
                            );
                        }) }
                    </table>
                ) : (
                    <div>
                        <div className="danger-text">
                            <h1>No data found</h1>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}