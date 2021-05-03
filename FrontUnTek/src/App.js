import logo from './logo_V2_anim.gif';
import React, { Suspense } from "react";
import UseModal from "./Modal/UseModal";
import Modal from "./Modal/Modal";
import img_p from './Epitech.svg';
import { useEffect, useState } from "react"
import './App.css';
// import Component from "./ComponentGet";
import PostFormRegisterTranslate from './Components/ComponentPostRegister';
import PostFormLoginTranslate from './Components/ComponentPostLogin';
import PostFormSettings from './Components/ComponentPostSettings';
import PostFormMyMatch from './Components/ComponentPostMyMatch';
//import { useTranslation } from 'react-i18next'
import PostFormProfileTranslate from './Components/ComponentPostProfile';
import SwipingTranslate from './pages/swiping'
import {I18nextProvider, useTranslation} from "react-i18next";
import flag_fr from './flag_fr.png';
import flag_en from './flag_en.png';

let logged_in = localStorage.getItem('token') ? true : false;

function CheckLoggedIn()
{
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

  const [
    offset,
    setOffset
  ] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setOffset(window.pageYOffset)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
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
          { logged_in === false ?
              <>
                {CheckLoggedIn()}
                <button className="button hover" onClick={toggleLoginForm}>{t("app.login")}</button>
                <button className="button hover" onClick={toggleRegistrationForm}>{t("app.register")}</button>
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
        {CheckLoggedIn()}
      </Modal>
      <Modal
            isShowing={isRegistrationFormShowed}
            hide={toggleRegistrationForm}
            title={t("app.register")}>
        <PostFormRegisterTranslate />
        {CheckLoggedIn()}
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
      {/* ------------------------------------------------------------------- */}
      <section className="parallax">
        <img
          src={img_p}
          alt="test"
          className="img"
          style={{
            transform: `translateY(${offset * 0.4}px)`,
          }}
        />
        </section>
        <div className="logo_gif">
          <img className="img_gif" src={logo}></img>
        </div>
        <div className="prese">
          <h1>{t("app.prese")}</h1>
        </div>
      <section className="overflow" />
    </div>
    </Suspense>
  );
}

export default App;
