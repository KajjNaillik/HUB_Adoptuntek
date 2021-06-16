import React, { Component } from 'react'
import {withTranslation} from "react-i18next";
import '../Css/Modal.css';

class PostFormLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
          _email: '',
          password: '',
          logged_in: localStorage.getItem('token') ? true : false,
          errors: {},
          translate: null
        }
    }

    handleValidation(){
      let errors = {};
      let formIsValid = true;
      const { t } = this.props

      if(!this.state._email){
        formIsValid = false;
        errors["_email"] = t("login.empty");
      }
      if(!this.state.password){
        formIsValid = false;
        errors["password"] = t("login.empty");
      }
      this.setState({errors: errors});
      return formIsValid;
    }

    componentDidMount() {
    if (this.state.logged_in === true) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ _email: json._email });
        }).catch(err => console.log('Fetch error :', err));
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    if(!this.handleValidation()) {
      return;
    }
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _email: this.state._email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.user._name);
        this.setState({
          logged_in: true,
          _email: json.user._email
        })
        window.location.reload(false);
    }).catch(err => console.log('Fetch error: ' + err));
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({
      logged_in: false,
      _email: '',
      password: '',
      errors: {}
    });
  };

  changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
  }
  render() {
      const { t } = this.props;
      const { _email, password } = this.state
      return (
        <div>
          <form onSubmit={this.submitHandler}>
            <div className="modal-body">
              <ul>
                <h3>{t("login.email")}</h3>
                <input className="modal-maturity-label modal-focus" type="" placeholder={t("login.email")} name="_email" value={_email} onChange={this.changeHandler}/>
                <span style={{color: "red"}}>{this.state.errors["_email"]}</span>
                <h3>{t("login.password")}</h3>
                <input className="modal-maturity-label modal-focus" type="password" placeholder={t("login.password")} name="password" value={password} onChange={this.changeHandler}/>
                <span style={{color: "red"}}>{this.state.errors["password"]}</span>
              </ul>
            </div><br/>
            <div className="modal-space">
              <input className="button hover" type="submit" value={t("login.update")}/>
            </div><br/>
          </form>
        </div>
      )
  }
}

const PostFormLoginTranslate = withTranslation('common')(PostFormLogin)
export default PostFormLoginTranslate
