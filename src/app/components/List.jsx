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
                    <table className="table">
                        <thead className="thead-inverse">
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Code</th>
                                <th className="text-center">Score</th>
                                <th className="text-center"></th>
                            </tr> 
                        </thead>
                        <tbody>
                            { this.state.data.map(function(ep) {
                                let ratingColor = "";
                                if (ep.score < 3) ratingColor = "warning";
                                if (ep.score > 7) ratingColor = "success";
                                return (
                                    <tr className={ "table-" + ratingColor }>
                                        <th scope="row" className="text-center">{ ep.name }</th>
                                        <td className="text-center">{ ep.code }</td>
                                        <td className="text-center">{ ep.score }/10</td>
                                        <td className="center">
                                            <button type="button" className="close" aria-label="Delete">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) }
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <div className="text-danger">
                            <h1>No data found</h1>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}