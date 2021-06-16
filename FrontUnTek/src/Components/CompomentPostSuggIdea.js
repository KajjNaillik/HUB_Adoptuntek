import React, { Component } from 'react'
/* Import Translation */
import {withTranslation} from "react-i18next";
import '../Css/Modal.css';

class PostFormSuggIdea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _title: "",
            _description: "",
            error: {}
        };
    }

    handleValidation(){
        let errors = {};
        let formIsValid = true;
        const { t } = this.props

        if(!this.state._title){
          formIsValid = false;
          errors["_title"] = t("login.empty");
        }
        if(!this.state.suggIdea){
          formIsValid = false;
          errors["_description"] = t("login.empty");
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <form>
                    <div className="modal-body">
                        <ul>
                            <h3>{t("suggIdea.title")}</h3>
                            <input className="modal-maturity-label modal-focus" type="text" placeholder={t("suggIdea.title")} name="_title" value={this.state._title} onChange={this.changeHandler}/>
                            <span style={{color: "red"}}>{this.state.error["_title"]}</span>
                            <div style={{marginTop: "20px", marginBottom: "15px"}}>
                                <h3 style={{display: 'inline'}}>{t("suggIdea.description")}</h3>
                                <em><span style={{color: "gray", marginLeft: "10px"}}>{t("suggIdea.character")}</span></em>
                            </div>
                            <textarea className="modal-maturity-label modal-focus textarea" rows="6" maxLength="330" autoCapitalize="sentences" placeholder={t("suggIdea.description")} name="_description" value={this.state._description} onChange={this.changeHandler}/>
                            <span style={{color: "red"}}>{this.state.error["_description"]}</span>
                        </ul>
                    </div>
                    <div className="modal-space">
                        <input className="button hover" type="submit" value={t("suggIdea.update")}/>
                    </div><br/>
                </form>
            </div>
        );
    }
}

const PostFormSuggIdeaTranslate = withTranslation('common')(PostFormSuggIdea)
export default PostFormSuggIdeaTranslate