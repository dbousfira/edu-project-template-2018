import React, {Component, PropTypes} from 'react';

export default class NoData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            err: props.error != null,
            message: props.error
        };
    }

    componentWillReceiveProps(props) {
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
                                <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Something gone wrong
                                </a>
                                <div className="collapse" id="collapseExample">
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