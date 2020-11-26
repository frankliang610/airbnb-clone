import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
  state = {
    where: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
  };

  changeWhere = (e) => {
    this.setState({
      where: e.target.value,
    });
  };
  changeCheckIn = (e) => {
    this.setState({
      checkIn: e.target.value,
    });
  };
  changeCheckOut = (e) => {
    this.setState({
      checkOut: e.target.value,
    });
  };
  changeGuests = (e) => {
    this.setState({
      guests: e.target.value,
    });
  };
  render() {
    return (
      <div className="home-search-box col m4">
        <h1>Book unique places to stay and things to do.</h1>
        <form action="" className="search-box-form">
          <div className="col m12">
            <div className="form-label">Where</div>
            <div className="input-field" id="where">
              <input
                className="browser-default"
                value={this.state.where}
                onChange={this.changeWhere}
                type="text"
                placeholder="Anywhere"
              />
            </div>
          </div>
          <div className="col m6">
            <div className="form-label">Check-in</div>
            <div className="input-field" id="check-in">
              <input
                className="browser-default"
                value={this.state.checkIn}
                onChange={this.changeCheckIn}
                type="date"
              />
            </div>
          </div>
          <div className="col m6">
            <div className="form-label">Check-out</div>
            <div className="input-field" id="check-out">
              <input
                className="browser-default"
                value={this.state.checkOut}
                onChange={this.changeCheckOut}
                type="date"
              />
            </div>
          </div>
          <div className="col m12">
            <div className="form-label">Guests</div>
            <div className="input-field" id="guests">
              <input
                className="browser-default"
                value={this.state.guests}
                onChange={this.changeGuests}
                type="number"
              />
            </div>
          </div>
          <div className="col m12 submit-btn">
            <input
              type="submit"
              value="Search"
              className="btn-large waves-effect waves-light red accent-2"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;
