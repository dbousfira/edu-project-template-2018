import React, {Component, PropTypes} from 'react';

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            err: null,
        }
        this.delete = this.delete.bind(this);
        this.fetchData();
    }
    
    load() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/episodes/').then(res => {
                res.json().then(parsed => {
                    resolve(parsed);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }

    fetchData() {
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

    delete(id) {
        fetch('http://localhost:3000/api/episodes/' + id, {
            method: "DELETE"
        }).then(res => {
            this.setState({
                data: this.state.data.filter(ep => ep.id != id)
            });
        }).catch(err => {
            this.setState({
                err: err
            });
        });
    }

    render() {
        const hasData = this.state.data != null && this.state.data.length != 0;
        return (
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
                            {/* Displaying all episodes */}
                            { this.state.data
                                .map(ep => {
                                    let ratingColor = "active";
                                    if (ep.score < 3) ratingColor = "warning";
                                    if (ep.score > 7) ratingColor = "success";
                                    {/* Row render */}
                                    return (
                                        <tr className={ "table-" + ratingColor } key={ ep.id }>
                                            <th scope="row" className="text-center">{ ep.name }</th>
                                            <td className="text-center">{ ep.code }</td>
                                            <td className="text-center">{ ep.score } / 10</td>
                                            {/* Delete episode icon */}
                                            <td>
                                                <button type="button" className="close" aria-label="Delete" onClick={(e) => this.delete(ep.id)}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }, this)
                            }
                        </tbody>
                    </table>
                ) : (
                    <div>
                        {/* Displaying a message if there is no data to handle */}
                        <div className="text-danger">
                            <h1>No data found</h1>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}