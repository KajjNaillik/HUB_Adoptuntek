import React, { Suspense } from "react";
import { useEffect, useState } from "react"
/* Import Css */
import './Css/App.css';
/* Import Modal */
import Modal from "./Modal/Modal";
import UseModal from "./Modal/UseModal";
/* Import Components */
import SwipingTranslate from './Components/ComponentSwiping'
import PostFormMyMatch from './Components/ComponentPostMyMatch';
import PostFormSettings from './Components/ComponentPostSettings';
import PostFormLoginTranslate from './Components/ComponentPostLogin';
import PostFormProfileTranslate from './Components/ComponentPostProfile';
import PostFormRegisterTranslate from './Components/ComponentPostRegister';
import PostFormChat from './Components/ComponentPostChat';
import PostFormSuggIdea from './Components/CompomentPostSuggIdea';
/* Import Translation */
import {useTranslation} from "react-i18next";
/* Import Ressources */
import flag_fr from './ressources/flag_fr.png';
import flag_en from './ressources/flag_en.png';
import img_p from './ressources/Epitech.svg';
import logo from './ressources/logo_V2_anim.gif';

let logged_in = localStorage.getItem('token') ? true : false;
let check = false;
let _lang = "en";
let _flag = flag_en;

function CheckLoggedIn()
{
    check = true;
    fetch('http://localhost:8000/current_user/', {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then(function(res) {
        if (res.ok) {
          logged_in = true;
          return true;
        }
        return false;
    });
}

function Logout()
{
  logged_in = false;
  check = false;
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.reload(false);
}

const Looker = () => (
  fetch('http://localhost:8000/current_user/', {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
  })
  .then(function(res) {
    console.log(res);
      if (res.ok) {
        logged_in = true;
          return (<div><h3>Congrats you are logged in</h3></div>)
      }
      return (null);
  })
)

function App() {
  const {
    isShowing: isLoginFormShowed,
    toggle: toggleLoginForm
  } = UseModal();
  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm
  } = UseModal();
  const {
    isShowing: isSettingsFormShowed,
    toggle: toggleSettingsForm
  } = UseModal();
  const {
    isShowing: isProfileFormShowed,
    toggle: toggleProfileForm
  } = UseModal();
  const {
    isShowing: isSwipingShowed,
    toggle: toggleSwiping
  } = UseModal();
  const {
    isShowing: isMyMatchFormShowed,
    toggle: toggleMyMatch
  } = UseModal();
  const {
    isShowing: isChat,
    toggle: toggleChat
  } = UseModal();
  const {
    isShowing: isIdea,
    toggle: toggleIdea
  } = UseModal();

  const [
    offsetY,
    setOffsetY
  ] = useState(0)

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function changeLanguage(){
    if (_lang === "fr") {
      _lang = "en";
      _flag = flag_en;
      return (i18n.changeLanguage('fr'));
    } if (_lang === "en") {
      _lang = "fr";
      _flag = flag_fr;
      return (i18n.changeLanguage('en'));
    }
  }

  const [t, i18n] = useTranslation('common');

  return (
    <Suspense fallback="loading">
      <div className="App">
        <header className="header">
        <button className="logo">AdopteUnTek</button>
          <div className="header-right">
          { check === false ? 
            <>
              {CheckLoggedIn()} 
            </>
            : null
          }
          { logged_in === false ?
            <>
              <button className="button hover" onClick={toggleLoginForm}>{t("app.login")}</button>
              <button className="button hover" onClick={toggleRegistrationForm}>{t("app.register")}</button>
              <button className="button hover" onClick={toggleMyMatch}>{t("app.myMatch")}</button>
              <button className="button hover" onClick={toggleSwiping}>{t("app.match")}</button>
              <button className="button hover" onClick={toggleChat}>{t("app.chat")}</button>
            </>
            : null }
          { logged_in === true ?
            <>
              <button className="button hover" onClick={toggleProfileForm}>{t("app.profile")}</button>
              <button className="button hover" onClick={toggleSwiping}>{t("app.match")}</button>
              <button className="button hover" onClick={toggleMyMatch}>{t("app.myMatch")}</button>
              <button className="button hover" onClick={Logout}>{t("app.logout")}</button>
            </>
            : null }
              <img className="flag" id={_lang} src={_flag} onClick={changeLanguage}/>
          </div>
        </header>
        {/* ------------------------------------------------------------------- */}
        <Modal
          isShowing={isLoginFormShowed}
          hide={toggleLoginForm}
          title={t("app.login")}>
          <PostFormLoginTranslate />
        </Modal>
        <Modal
          isShowing={isRegistrationFormShowed}
          hide={toggleRegistrationForm}
          title={t("app.register")}>
          <PostFormRegisterTranslate />
        </Modal>
        <Modal
          isShowing={isProfileFormShowed}
          hide={toggleProfileForm}
          title={t("app.profile")}>
          <PostFormProfileTranslate/>
        </Modal>
        <Modal
          isShowing={isSettingsFormShowed}
          hide={toggleSettingsForm}
          title="Settings">
          <PostFormSettings />
        </Modal>
        <Modal
          isShowing={isSwipingShowed}
          hide={toggleSwiping}
          title="Match">
          <SwipingTranslate/>
        </Modal>
        <Modal
          isShowing={isMyMatchFormShowed}
          hide={toggleMyMatch}
          title={t("app.myMatch")}>
          <PostFormMyMatch />
        </Modal>
        <Modal
          isShowing={isChat}
          hide={toggleChat}
          title={t("app.chat")}>
          <PostFormChat />
        </Modal>
        <Modal
          isShowing={isIdea}
          hide={toggleIdea}
          title={t("app.suggestIdea")}>
          <PostFormSuggIdea />
        </Modal>
        {/* ------------------------------------------------------------------- */}
        <section className="parallax">
          <img 
            src={img_p}
            alt=""
            className="img"
            style={{ transform: `translateY(-${offsetY * 0.45}px)` }}
          />
        </section>
        {/* ------------------------------------------------------------------- */}
        <section className="overflow bg_white"><br/>
          <div className="prese carte">
            <h1 style={{marginLeft: "190px"}}>{t("app.idea")}<button className="header-right button btn-idea hover" style={{marginTop: "15px", marginRight: "15px"}} onClick={toggleIdea}>{t("app.suggestIdea")}</button></h1>
            {/* <Idea> */}
          </div>
        {/* ------------------------------------------------------------------- */}
          <div className="center">
            <img src={logo} />
          </div>
          <div className="center prese">
            <h1>{t("app.welcome")}</h1>
          </div>
        </section>
      </div>
    </Suspense>
  );
}

export default App;
