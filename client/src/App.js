import React, { Component } from 'react'
import './App.css'
// import 'whatwg-fetch'

class App extends Component {

  constructor() {
    super()

    this.state = {
      item: '',
      alert: false
    }
  }

  handleChange = (e) => {
    this.setState({
      item: e.currentTarget.value
    })
  }

  hideAlert = () => {
    this.setState({
      alert: false
    })
  }

  showAlert = (e) => {
    this.setState({
      alert: true
    }, () => {
      window.setTimeout(this.hideAlert, 2000)
    });
  }

  handleClick = (e) => {
    fetch('/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item: this.state.item
      })
    }).then(response => {
      return response.json()
    }).then((json) => {
      return this.showAlert()
    }).catch(ex => {
      console.log('Error: ', ex)
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">List</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="jumbotron">
            {this.state.alert ? <div className="alert alert-success" role="alert"> New todo added! </div> : null}
            <h3>Add Todos</h3>
            <div className="input-group">
              <input className="form-control" type="text" onChange={this.handleChange} placeholder="Buy stuff, pick up something ..."/>
              <span className="input-group-btn">
                <button className="btn btn-success" onClick={this.handleClick} type="button">Add</button>
              </span>
            </div>
          </div>
          <span>
          Spreadsheet: <a href="https://docs.google.com/spreadsheets/d/1D3QXR8O_fCQebEa5OM6wPGPVgBy-Mi_RwR7fVKKTo9Q/edit#gid=0">https://docs.google.com/spreadsheets/d/1D3QXR8O_fCQebEa5OM6wPGPVgBy-Mi_RwR7fVKKTo9Q/edit#gid=0</a>
          </span>
        </div>
      </div>
    );
  }
}

export default App;
