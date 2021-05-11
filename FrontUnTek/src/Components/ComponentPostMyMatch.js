import React, { Component } from 'react'
import '../Css/Modal.css';
import Modal from "../Modal/Modal";
import PostFormChat from '../Components/ComponentPostChat';
import {I18nextProvider, useTranslation} from "react-i18next";

import Redirect from 'react-dom';

class PostFormMyMatch extends Component {
  constructor(props) {
    super(props)
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      names: [],
      in: false
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:8000/match/', {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ names: json });
      }).catch(err => console.log('Fetch error :', err));
  }

  changeHandler = (e) => {
    // return (<Modal
    //   isShowing={isRegistrationFormShowed}
    //   hide={toggleRegistrationForm}
    //   title={t("app.register")}>
    // </Modal>)
  }

  render() {
    // const [t, i18n] = useTranslation('common');
    var renderedOutput = this.state.names.map(item => <button class="button hover" onClick={this.changeHandler}> {item} </button>);
    //var renderedOutput = this.state.names.map(item => <Link to={this.changeHandler.bind(item)} target="_blank" rel="noopener noreferrer" />);
    //var renderedOutput = this.state.names.map(item => <button className="button hover" onClick={this.changeHandler}>{item}</button>);
    return (
      <div>
        {renderedOutput}
      </div>
    )
  }
}

export default PostFormMyMatch