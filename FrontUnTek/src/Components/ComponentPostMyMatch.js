import React, { Component } from 'react'
/* Import Css */
import '../Css/Modal.css';
/* Import Modal */
import Modal from "../Modal/Modal";
import UseModal from "../Modal/UseModal";
/* Import Components */
import PostFormChat from '../Components/ComponentPostChat';
/* Import Translation */
import { withTranslation } from 'react-i18next';

class PostFormMyMatch extends Component {
  constructor(props) {
    super(props)
    //this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      names: [],
      in: false,
      errors: {},
    }
    this.UseModal = {
      isShowing: false,
      toggle: {}
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

  changeHandler() {
    const { t } = this.props;
    return (
      <Modal
      isShowing={this.UseModal.isShowing}
      hide={this.UseModal.toggle}
      title={t("app.chat")}>
      <PostFormChat />
    </Modal>)
  }

  render() {
    var renderedOutput = this.state.names.map(item => <button class="button hover" onClick={this.changeHandler}> { item } </button>);
    //var renderedOutput = <button class="button hover" onClick={this.changeHandler}>salut</button>;
    let returnMyMatch = false;
    const { t } = this.props;
    if (this.state.names.map !== undefined) {
      returnMyMatch =
      <div className="modal-body">
        <h3>{t('myMatch.empty')}</h3>
      </div>
    } else {
      returnMyMatch =
        <div className="modal-body">
          {renderedOutput}
        </div>
    }
    return (returnMyMatch);
  }
}
const PostFormMyMatchTranslate = withTranslation('common')(PostFormMyMatch)
export default PostFormMyMatchTranslate