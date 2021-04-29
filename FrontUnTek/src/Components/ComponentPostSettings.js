import React, { Component } from 'react'


class PostFormSettings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _match_gpa_option: '',
            _match_interet_option: '',
        }
    }

    componentDidMount() {
    if (this.state.logged_in === true) {
      fetch('http://localhost:8000/param/')
        .then(res => res.json())
        .then(json => {
          this.setState({
                _match_gpa_option: json._match_gpa_option,
                _match_interet_option: json._match_interet_option
            });
        }).catch(err => console.log('Fetch error :', err));
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/param/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _match_gpa_option: this.state._match_gpa_option,
        _match_interet_option: this.state._match_interet_option
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
            _match_gpa_option: json._match_gpa_option,
            _match_interet_option: json._match_interet_option
        });
      }).catch(err => console.log('Fetch error :', err));
  };

  changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
  }

  render() {
      const { _email, password } = this.state
      return (
        <div>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <input type="text" placeholder="GPA" name="_match_gpa_option"
                value={_email} onChange={this.changeHandler}/>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Interest" name="password"
                value={password} onChange={this.changeHandler}/>
            </div>
            <div className="form-group">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      )
  }
}

export default PostFormSettings
