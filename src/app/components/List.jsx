import React, {Component, PropTypes} from 'react';

const api = require('../../server/api.js');
const config = require('../../server/config.js');

export default class List extends Component {
    constructor(props) {
        super(props);
    }

    async load() {
        const response = await fetch('/api/episodes');
        const body = await response.json();
        if (response.status != 200) {
            throw Error(body.message);
        }
        return body;
    }

    componentDidMount() {
        this.load().then((res) => {
            this.setState({response: res.express});
        }).catch((err) => {
            this.setState({response: err});
        });
    }

    render() {
        return(
            <p>TEST</p>
        );
    }
}