import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import './Modal.css';

const Profile = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                    <div></div>
                    <button
                        type="button"
                        className="modal-close-button"
                        onClick={hide}
                    >
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
    Profile.propTypes = {
        isShowing: PropTypes.bool.isRequired,
        hide: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

export default Profile;
