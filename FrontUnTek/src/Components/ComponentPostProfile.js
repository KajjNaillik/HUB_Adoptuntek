import React, { Component } from 'react'
import '../Css/Modal.css';
import {withTranslation} from "react-i18next";

class PostFormProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _name: '',
            _email: '',
            password: '',
            _gpa: '',
            _campus: '',
            _promo: '',
            _it_1: '',
            _it_2: '',
            _it_3: '',
        }
    }

      componentDidMount() {
          fetch('http://localhost:8000/current_user/', {
              headers: {
                  Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                // console.log("inside");
                this.setState({
                    _email: json._email,
                    _name: json._name,
                    _gpa: json._gpa,
                    _campus: json._campus,
                    _promo: json._promo,
                    _it_1: json._it_1,
                    _it_2: json._it_2,
                    _it_3: json._it_3
                });
            }).catch(err => console.log('Fetch error :', err));
      }

      changeHandler = (e) => {
          this.setState({ [e.target.name]: e.target.value })
      }

      submitHandler = (e) => {
          e.preventDefault()
          console.log(this.state)
          fetch('http://localhost:8000/modif/', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`

            },
            body: JSON.stringify ({
              _name : this.state._name,
              _gpa : this.state._gpa,
              _campus: this.state._campus,
              _promo: this.state._promo,
              _it_1: this.state._it_1,
              _it_2: this.state._it_2,
              _it_3: this.state._it_3
            })
          })
            .then(res => res.json())
            .catch(err => console.log('Fetch error :', err));
      }

    render() {
      const { t } = this.props;
      const { _email, _gpa, _campus,
          _promo, _name } = this.state
        return (
            <form onSubmit={this.submitHandler}>
                <div className="modal-body">
                    <ul>
                        <h3>{t("profile.name")}</h3>
                        <input className="modal-maturity-label modal-focus" type="text" placeholder={this.state._name} name="_name" value={_name} onChange={this.changeHandler}/>
                        <h3>{t("profile.email")}</h3>
                        <input className="modal-maturity-label modal-focus" type="text" placeholder={this.state._email} name="_email" value={_email} onChange={this.changeHandler}/>
                        <h3>{t("profile.gpa")}</h3>
                        <input className="modal-maturity-label modal-focus" type="text" placeholder={this.state._gpa} name="_gpa" value={_gpa} onChange={this.changeHandler}/>
                        <h3>{t("profile.campus")}</h3>
                        <input className="modal-maturity-label modal-focus" type="text" placeholder={this.state._campus} name="_campus" value={_campus} onChange={this.changeHandler}/>
                        <h3>{t("profile.promo")}</h3>
                        <input className="modal-maturity-label modal-focus" type="text" placeholder={this.state._promo} name="_promo" value={_promo} onChange={this.changeHandler}/>
                    </ul>
                </div>
                <br/><div className="modal-space">
                    <button className="button hover">{t("postProfile.update")}</button>
                </div>
            </form>
        )
    }
}

const PostFormProfileTranslate = withTranslation('common')(PostFormProfile)
export default PostFormProfileTranslate
