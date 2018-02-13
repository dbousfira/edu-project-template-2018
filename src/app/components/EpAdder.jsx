import React, {Component, PropTypes} from 'react';

export default class EpAdder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            code: "",
            score: null,
            addCallback: props.addCallback
        }
        this.addEpisode = this.addEpisode.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(name, evt) {
        const value = name === "score" ? evt.target.textContent : evt.target.value;
        this.setState({
            [name]: value
        });
    }

    addEpisode() {
        const name = this.state.name;
        const code = this.state.code;
        const score = this.state.score;
        if (!(score == null || code == null || code == "" || name == null || name == "")) {
            const params = '?name=' + name + '&code=' + code + '&score=' + score;
            fetch("/api/episodes" + params, {
                method: "POST"
            }).then(res => {
                res.json().then(parsed => {
                    this.state.addCallback(parsed);
                    this.setState({
                        name: "",
                        code: "",
                        score: null
                    })
                });
            });
        }
    }

    render() {
        const hasScore = this.state.score != null;
        return (
            <div className="px-5 py-5 bg-inverse rounded">
                <form>
                    <div className="row">
                        <div className="col">
                            <input type="text" required="true" className="form-control" placeholder="Name" onChange={e => this.updateValue('name', e)} value={this.state.name} />
                        </div>
                        <div className="col">
                            <input type="text" required="true" className="form-control" placeholder="Code" onChange={e => this.updateValue('code', e)} value={this.state.code} />
                        </div>
                        <div className="col">
                        <div className="dropdown">
                            <button className="btn btn-secondary btn-block dropdown-toggle" type="button" data-toggle="dropdown">
                                { hasScore ? (
                                    this.state.score + " / 10"
                                ):("Score") }
                            <span className="caret"></span></button>
                                <ul className="dropdown-menu">
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>1</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>2</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>3</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>4</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>5</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>6</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>7</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>8</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>9</a></li>
                                    <li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>10</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <input type="submit" className="btn btn-primary btn-block" value="Add" onClick={e => this.addEpisode()} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}