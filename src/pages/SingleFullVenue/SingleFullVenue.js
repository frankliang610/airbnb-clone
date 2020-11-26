import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert2';

import './SingleFullVenue.css';
import Points from './Point';
import Login from '../Login/Login';

import openModal from '../../actions/openModal';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const stripeUrl = process.env.REACT_APP_STRIPE_BASE_URL;
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

class SingleFullVenue extends Component {
  state = {
    singleVenue: {},
    points: [],
    numberOfGuests: '',
    checkIn: '',
    checkOut: '',
  };

  async componentDidMount() {
    const vId = this.props.match.params.vid;
    const singleVenueUrl = `${baseUrl}/venue/${vId}`;
    const response = await axios(singleVenueUrl);
    const singleVenueData = response.data;

    const pointsUrl = `${baseUrl}/points/get`;
    const pointsAxiosReposponse = await axios(pointsUrl);

    const points = singleVenueData.points.split(',').map((point, i) => {
      return (
        <Points key={i} pointDesc={pointsAxiosReposponse.data} point={point} />
      );
    });
    this.setState({
      singleVenue: singleVenueData,
      points,
    });
  }

  changeNumberOfGuests = (e) => {
    this.setState({ numberOfGuests: e.target.value });
  };
  changeCheckIn = (e) => {
    this.setState({ checkIn: e.target.value });
  };
  changeCheckOut = (e) => {
    this.setState({ checkOut: e.target.value });
  };

  reserveNow = async (e) => {
    console.log('User wants to reserve...');
    const startDate = moment(this.state.checkIn)
    const endDate = moment(this.state.checkOut)

    console.log('startDate :>> ', startDate);
    console.log('endDate :>> ', endDate);

    const diffDays = endDate.diff(startDate, 'days');
    console.log('diffDays :>> ', diffDays);

    if (diffDays < 1){
      swal.fire({
        title: 'Invalid Checkout Date',
        text: 'The checkout date must be after checkin date',
        icon: 'error',
      });
    } else if(isNaN(diffDays)){
      swal.fire({
        title: 'Invalid Date',
        text: 'Please make sure input a valid date',
        icon: 'error',
      });

    } else {
      // swal.fire({
      //   title: 'Invalid Date',
      //   text: 'Please make sure input a valid date',
      //   icon: 'error',
      // });
      const pricePerNight = this.state.singleVenue.pricePerNight;
      const totalPrice = pricePerNight * diffDays;
      console.log('totalPrice :>> ', totalPrice);
      await new Promise ((res, rej) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = stripeUrl;
        script.onload = () => {
          res();
        }
        document.getElementsByTagName('head')[0].appendChild(script);
      });

      const stripe = window.Stripe(stripePublicKey);

    }

  };

  render() {
    console.log('this.state :>> ', this.state);
    const sv = this.state.singleVenue;
    return (
      <div className="row single-venue">
        <div className="col s12 center">
          <img src={sv.imageUrl} />
        </div>
        <div className="col s8 location-details offset-s2">
          <div className="col s8 left-details">
            <div className="location">{sv.location}</div>
            <div className="title">{sv.title}</div>
            <div className="guests">{sv.guests}</div>

            <div className="divider"></div>

            {this.state.points}

            <div className="details">{sv.details}</div>
            <div className="amenities">{sv.amenities}</div>
          </div>
          <div className="col s4 right-details">
            <div className="price-per-day">
              ${sv.pricePerNight}
              <span> per day</span>
            </div>
            <div className="rating">{sv.rating}</div>
            <div className="col s6">
              Check-In
              <input
                type="date"
                value={this.state.checkIn}
                onChange={this.changeCheckIn}
              />
            </div>
            <div
              className="col s6">
              Check-Out
              <input
                type="date"
                value={this.state.checkOut}
                onChange={this.changeCheckOut}
              />
            </div>
            <div className="col s12">
              <select
                className="browser-default"
                value={this.state.numberOfGuests}
                onChange={this.changeNumberOfGuests}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guest</option>
                <option value="3">3 Guest</option>
                <option value="4">4 Guest</option>
                <option value="5">5 Guest</option>
                <option value="6">6 Guest</option>
                <option value="7">7 Guest</option>
                <option value="8">8 Guest</option>
                <option value="9">9 Guest</option>
              </select>
            </div>
            <div className="col s12 center">
              {this.props.auth.token
                ? (
                  <button className="btn red accent-2" onClick={this.reserveNow}>
                    Reserve
                  </button>)
                : (
                  <div>You must <span
                  className="text-link"
                      onClick={() => {
                        this.props.openModal('open', <Login />);
                      }}
                  >Log in </span>to reserve</div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModal: openModal,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue);
