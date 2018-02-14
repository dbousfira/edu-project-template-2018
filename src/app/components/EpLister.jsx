import React, {Component, PropTypes} from 'react';
import NoData from './NoData';
import EpAdder from './EpAdder';

export default class EpLister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            err: null,
        }
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.fetchData();
    }

    fetchData() {
        new Promise((resolve, reject) => {
            fetch('/api/episodes/').then(res => {
                res.json().then(parsed => {
                    resolve(parsed);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        }).then(parsed => {
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
        fetch('/api/episodes/' + id, {
            method: "DELETE"
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    data: this.state.data.filter(ep => ep.id != id)
                });
            }
        }).catch(err => {
            this.setState({
                err: err
            });
        });
    }

    add(episode) {
        let newData = this.state.data.splice(0);
        newData.push(episode);
        this.setState({
            data: newData
        });
    }

    render() {
        const hasData = this.state.data != null && this.state.data.length != 0;
        return (
            <div>
                <div className="container">
                    <EpAdder addCallback={this.add} /> 
                </div> <br/> <br/>
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
                            { this.state.data.map(ep => {
                                    let ratingColor = "active";
                                    if (ep.score <= 3) ratingColor = "warning";
                                    if (ep.score >= 7) ratingColor = "success";
                                    return (
                                        <tr className={"table-" + ratingColor} key={ep.id}>
                                            <th scope="row" className="text-center">{ep.name}</th>
                                            <td className="text-center">{ep.code}</td>
                                            <td className="text-center">{ep.score} / 10</td>
                                            <td>
                                                <button type="button" className="close" aria-label="Delete" onClick={e => this.delete(ep.id)}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }, this)
                            }
                        </tbody>
                    </table>
                ) : ( <NoData error={this.state.err}/>)}
            </div>
        );
    }
}