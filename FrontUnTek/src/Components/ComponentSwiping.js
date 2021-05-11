import React, { Component, Suspense } from 'react';
import { withTranslation } from 'react-i18next';
/* Import CSS */
import '../Css/Modal.css';
import '../Css/swip.css';
/* Import Ressources */
import logo from '../ressources/logo_V2_anim.gif';
import checkmark from '../ressources/checkmark.png';
import cross from '../ressources/cross.png';

class SwipingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profiles: {},
            match: false,
            render: false,
            pos: 0,
            max_length: 0
        };
        this.handleDeny = this.handleDeny.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8000/profiling/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
            this.setState({ profiles: json});
        });
        setTimeout(function() {
            this.setState({render: true})
        }.bind(this), 1300)
    }

    handleAccept = async (profile) => {
        this.state.match = false;
        const result = await fetch('http://localhost:8000/profiling/', {
          method: 'POST',
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify ({
            "email": profile.email
          })
        });
        const body = await result.json();
        const tmp = this.state.profiles[0];
        this.state.profiles.push(tmp);
        this.state.profiles.shift();
        this.state.match = body.match;
        console.log(this.state.profiles);
        if (this.state.match === true)
            alert('Match :)');
        this.forceUpdate();
    }

    handleDeny() {
        this.state.profiles.push(this.state.profiles[this.state.pos]);
        this.state.profiles.shift();
        console.log(this.state.profiles);
        this.forceUpdate();
    }

    render() {
        const {profiles, pos} = this.state
        const { t } = this.props;
        let renderContainer = false;
        if (this.state.render) {
            renderContainer = <from>
                <div className="modal-body">
                    <ul>
                        <h3>Name:</h3>
                        <div className="modal-maturity-label">{profiles[pos].name}</div>
                        <h3>GPA:</h3>
                        <div className="modal-maturity-label">{profiles[pos].gpa}</div>
                        <h3>Campus:</h3>
                        <div className="modal-maturity-label">{profiles[pos].campus}</div>
                        <h3>Promo:</h3>
                        <div className="modal-maturity-label">{profiles[pos].promo}</div>
                        <h3>{t('interet.title')}</h3>
                        <div className="modal-maturity-label">{profiles[pos].it_1}</div><br className="1px"/>
                        <div className="modal-maturity-label">{profiles[pos].it_2}</div><br className="1px"/>
                        <div className="modal-maturity-label">{profiles[pos].it_3}</div>
                    </ul>
                </div>
                <div className="space-checkmark">
                    <button class="button-swip hover-swip" onClick={this.handleDeny}><img className="checkmark_image" src={cross}></img></button>
                    <button class="button-swip hover-swip" onClick={() => this.handleAccept(this.state.profiles[0])}><img className="checkmark_image" src={checkmark}></img></button>
                </div>
            </from>
        } else {
            renderContainer = <div className="gif-load"><img className="img_swap" src={logo}></img></div>
        }
        return (renderContainer);
    }
}

const SwipingTranslate = withTranslation('common')(SwipingPage)
export default function App() {
    return (
        <Suspense fallback="loading">
            <SwipingTranslate/>
        </Suspense>
    )
}
