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
/* Import Translation */
import {useTranslation} from "react-i18next";
/* Import Ressources */
import flag_fr from './ressources/flag_fr.png';
import flag_en from './ressources/flag_en.png';
import img_p from './ressources/Epitech.svg';
import logo from './ressources/logo_V2_anim.gif';

let logged_in = localStorage.getItem('token') ? true : false;
let check = false;

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

  const [
    offsetY,
    setOffsetY
  ] = useState(0)

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [t, i18n] = useTranslation('common');
  return (
    <Suspense fallback="loading">
      <div className="App">
        <header className="header">
        <button className="logo">AdopteUnTek</button>
          <div className="header-right">
            <button className="button flag"><img className="image_flag" src={flag_fr} alt="a" onClick={() => i18n.changeLanguage('fr')}></img></button>
            <button className="button flag"><img className="image_flag" src={flag_en} alt="a" onClick={() => i18n.changeLanguage('en')}></img></button>
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
                <button className="button hover" onClick={toggleChat}>{t("app.chat")}</button>
              </>
            : null }
          { logged_in === true ?
            <>
              <button className="button hover" onClick={toggleProfileForm}>{t("app.profile")}</button>
              <button className="button hover" onClick={toggleSwiping}>{t("app.match")}</button>
              <button className="button hover" onClick={toggleMyMatch}>My Match</button>
              <button className="button hover" onClick={Logout}>{t("app.logout")}</button>
            </>
            : null }
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
            title="My Match">
        <PostFormMyMatch />
      </Modal>
      <Modal
            isShowing={isChat}
            hide={toggleChat}
            title={t("app.chat")}>
        <PostFormChat />
      </Modal>
      {/* ------------------------------------------------------------------- */}
      <section className="parallax">
        <img 
          src={img_p}
          alt=""
          className="img"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
        />
      </section>
      <section className="overflow bg_white">
        <div className="logo_gif">
          <img src={logo} />
        </div>
        <div className="prese">
          <h1>{t("app.prese")}</h1>
        </div>
      </section>
      <section className="overflow" />
    </div>
    </Suspense>
  );
}

export default App;
