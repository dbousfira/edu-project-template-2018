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
        if (this.state.score != null) {
            const params = '?name=' + this.state.name + '&code=' + this.state.code + '&score=' + this.state.score;
            fetch("/api/episodes" + params, {
                method: "POST"
            }).then(res => {
                res.json().then(parsed => {
                    this.state.addCallback(parsed);
                    this.setState({
                        name: "",
                        code: "",
                        score: null
                    });
                });
            });
        }
    }

    render() {
        const hasScore = this.state.score != null;
        let scoreChoices = [];
        for (let i = 1; i <= 10; i++) {
            scoreChoices.push(<li><a href="#" className="dropdown-item" onClick={e => this.updateValue('score', e)}>{i}</a></li>);
        }
        return (
            <div className="px-5 py-5 bg-inverse rounded">
                <form onSubmit={this.addEpisode}>
                    <div className="row">
                        <div className="col">
                            <input type="text" required="true" onChange={e => this.updateValue('name', e)} value={this.state.name} className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col">
                            <input type="text" required="true" onChange={e => this.updateValue('code', e)} value={this.state.code} className="form-control" placeholder="Code"/>
                        </div>
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn btn-secondary btn-block dropdown-toggle" type="button" data-toggle="dropdown">
                                    { hasScore ? (
                                        this.state.score + " / 10"
                                    ):("Score") }
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu">{scoreChoices}</ul>
                            </div>
                        </div>
                        <div className="col">
                            <input type="submit" className="btn btn-primary btn-block" value="Add"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}