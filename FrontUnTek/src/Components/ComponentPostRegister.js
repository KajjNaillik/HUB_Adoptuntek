import React, { Component } from 'react'
import '../Css/Modal.css';
import {withTranslation} from "react-i18next";

class PostFormRegister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _email: '',
            password: '',
            _gpa: '',
            _campus: '',
            _promo: '',
            _it_1: '',
            _it_2: '',
            _it_3: '',
            errors: {},
            logged_in: localStorage.getItem('token') ? true : false,
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
      if(!this.state._gpa){
        formIsValid = false;
        errors["_gpa"] = "Cannot be empty";
      }
      if(!this.state._campus){
        formIsValid = false;
        errors["_campus"] = "Cannot be empty";
      }
      if(!this.state._promo){
        formIsValid = false;
        errors["_promo"] = "Cannot be empty";
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
            this.setState({
              _email: json._email,
              _gpa: json._gpa,
              _campus: json._campus,
              _promo: json._promo,
              _it_1: json._it_1,
              _it_2: json._it_2,
              _it_3: json._it_3
             });
          }).catch(err => console.log('Fetch error :', err));
      }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        if(!this.handleValidation()) {
          return;
        }
        console.log(this.state)
        fetch('http://localhost:8000/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify ({
            _email: this.state._email,
            password: this.state.password,
            _gpa : this.state._gpa,
            _campus: this.state._campus,
            _promo: this.state._promo,
            _it_1: this.state._it_1,
            _it_2: this.state._it_2,
            _it_3: this.state._it_3
          })
        })
          .then(res => res.json())
          .then(json => {
            localStorage.setItem('token', json.token);
            this.setState({
              logged_in: true
            });
            window.location.reload(false);
        }).catch(err => console.log('Fetch error: ' + err));
    }

    render() {
      const { t } = this.props;
      const { _email, password, _gpa, _campus,
        _promo, _it_1, _it_2, _it_3 } = this.state
        return (
          <form onSubmit={this.submitHandler}>
            <div className="modal-body">
              <ul>
                <h3>{t("postRegister.email")}</h3>
                <input className="modal-maturity-label modal-focus" type="text" placeholder={t("postLogin.email")} name="_email" value={_email} onChange={this.changeHandler}/>
                <span style={{color: "red"}}>{this.state.errors["_email"]}</span>
                <h3>{t("postRegister.password")}</h3>
                <input className="modal-maturity-label modal-focus" type="password" placeholder={t("postLogin.password")} name="password" value={password} onChange={this.changeHandler}/>
                <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                <h3>{t("postRegister.gpa")}</h3>
                <input className="modal-maturity-label modal-focus" type="number" step="0.01" min="0" max="4" placeholder="GPA" name="_gpa" value={_gpa} onChange={this.changeHandler}/>
                <span style={{color: "red"}}>{this.state.errors["_gpa"]}</span>
                <h3>{t("postRegister.campus")}</h3>
                <select name="_campus" value={_campus} onChange={this.changeHandler}>
                  <option value=""></option>
                  <option value="Rennes">Rennes</option>
                  <option value="Paris">Paris</option>
                  <option value="Toulouse">Toulouse</option>
                  <option value="Lille">Lille</option>
                  <option value="Bordeaux">Bordeaux</option>
                </select>
                <span style={{color: "red"}}>{this.state.errors["_campus"]}</span>
                <h3>{t("postRegister.promo")}</h3>
                <select name="_promo" value={_promo} onChange={this.changeHandler}>
                  <option value=""></option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
                <span style={{color: "red"}}>{this.state.errors["_promo"]}</span>
                <h3>{t("postRegister.int_1")}</h3>
                <select name="_it_1" value={_it_1} onChange={this.changeHandler}>
                  <option value=""></option>
                  <option value={t("interet.choice.ia")}>{t("interet.choice.ia")}</option>
                  <option value={t("interet.choice.secu")}>{t("interet.choice.secu")}</option>
                  <option value="VR/AR">VR/AR</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                </select>
                <h3>{t("postRegister.int_2")}</h3>
                <select name="_it_2" value={_it_2} onChange={this.changeHandler}>
                  <option value=""></option>
                  <option value={t("interet.choice.ia")}>{t("interet.choice.ia")}</option>
                  <option value={t("interet.choice.secu")}>{t("interet.choice.secu")}</option>
                  <option value="VR/AR">VR/AR</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                </select>
                <h3>{t("postRegister.int_3")}</h3>
                <select name="_it_3" value={_it_3} onChange={this.changeHandler}>
                  <option value=""></option>
                  <option value={t("interet.choice.ia")}>{t("interet.choice.ia")}</option>
                  <option value={t("interet.choice.secu")}>{t("interet.choice.secu")}</option>
                  <option value="VR/AR">VR/AR</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                </select>
              </ul>
            </div>
            <br/><div className="modal-space">
              <input className="button hover" type="submit" value="Register" />
            </div>
          </form>
        )
    }
}

const PostFormRegisterTranslate = withTranslation('common')(PostFormRegister)
export default PostFormRegisterTranslate
