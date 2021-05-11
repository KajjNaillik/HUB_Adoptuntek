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
          errors: {}
        }
    }

    handleValidation(){
      let errors = {};
      let formIsValid = true;

      if(!this.state._email){
        formIsValid = false;
        errors["_email"] = "Cannot be empty";
      }
      if(!this.state.password){
        formIsValid = false;
        errors["password"] = "Cannot be empty";
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
    console.log(this.state);
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
                <h3>{t("postLogin.email")}</h3>
                <input className="modal-maturity-label modal-focus" type="text" placeholder={t("postLogin.email")} name="_email" value={_email} onChange={this.changeHandler}/>
                <span style={{color: "red"}}>{this.state.errors["_email"]}</span>
                <h3>{t("postLogin.password")}</h3>
                <input className="modal-maturity-label modal-focus" type="password" placeholder={t("postLogin.password")} name="password" value={password} onChange={this.changeHandler}/>
                <span style={{color: "red"}}>{this.state.errors["password"]}</span>
              </ul>
            </div>
            <br/><div className="modal-space">
              <input className="button hover" type="submit" value="Login" />
            </div>
          </form>
        </div>
      )
  }
}

const PostFormLoginTranslate = withTranslation('common')(PostFormLogin)
export default PostFormLoginTranslate
