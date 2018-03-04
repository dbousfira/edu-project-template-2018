import React, {Component, PropTypes} from 'react';

export default class NoData extends Component {

    constructor(props) {
        super(props);
        this.setProps(props);
    }

    componentWillReceiveProps(props) {
        this.setProps(props);
    }

    setProps(props) {
        this.state = {
            err: props.error != null,
            message: props.error
        };
    }

    render() {
        return (
            <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Oops !</strong> No data found
                    { this.state.err ? (
                            <div>
                                <br/>
                                <a className="btn btn-danger" data-toggle="collapse" href="#details" aria-expanded="false" aria-controls="details">
                                    Something gone wrong
                                </a>
                                <div className="collapse" id="details">
                                    <div className="card card-block">
                                        { this.state.message }
                                    </div>
                                </div>
                            </div>
                        ) : (<div></div>)
                    }
                </div>
            </div>
        );
    }
}