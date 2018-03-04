import React, {Component} from 'react';
import Modal from 'react-modal';
import EpLister from './EpLister';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      ep: props.ep
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submit = this.submit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit() {
    var name = this.state.name
      ? this.state.name
      : this.state.ep.name;
    var code = this.state.code
      ? this.state.code
      : this.state.ep.code;
    var score = this.state.score
      ? this.state.score
      : this.state.ep.score;

    const params = '?name=' + name + '&code=' + code + '&score=' + score;
    fetch("/api/episodes/" + this.state.ep.id + params, {method: "PUT"}).then(res => {
      res.json().then(parsed => {
        this.closeModal();
        this.props.action();
      });
    });
  }

  render() {
    return (<div>
      <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>

        <h2 ref={subtitle => this.subtitle = subtitle}>Edition d'un épisode</h2>
        <input name="name" type="text" defaultValue={this.state.ep.name} onChange={this.handleChange.bind(this)}/>
        <input name="code" type="text" defaultValue={this.state.ep.code} onChange={this.handleChange.bind(this)}/>
        <input name="score" type="number" min="0" max="10" defaultValue={this.state.ep.score} onChange={this.handleChange.bind(this)}/>
        <button onClick={this.closeModal}>Fermer</button>
        <button onClick={this.submit}>Ok</button>
      </Modal>
    </div>);
  }
}
