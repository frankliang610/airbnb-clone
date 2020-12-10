import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../utility/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './PaymentSuccess.css';
library.add(faLongArrowAltRight);

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class PaymentSuccess extends Component {
  state = {
    reservationDetails: {},
    venueData: {},
    waiting: true,
  };

  async componentDidMount() {
    const stripeToken = this.props.match.params.stripeToken;
    const token = this.props.auth.token;
    const data = { stripeToken, token };
    const successUrl = `${baseUrl}/payment/success`;
    const response = await axios.post(successUrl, data);
    console.log('response :>> ', response.data);
    this.setState({
      reservationDetails: response.data.reservationDetails,
      userData: response.data.user,
      waiting: false,
    });
  }

  render() {
    if (this.state.waiting) {
      return <Spinner />;
    }
    const rd = this.state.reservationDetails;
    const vd = rd.venueData;
    return (
      <div className='reservation-success row'>
        <h1 className='col m12 center'>Start Packing!</h1>
        <div className='resv-details col s8 offset-s2'>
          <div className='confirmed col m12 row'>
            <FontAwesomeIcon
              icon='long-arrow-alt-right'
              size='1x'
              color='#ED0000'
            />
            Confirmed: NUMBER_OF_NIGHTS nights in VENUE_DATA_LOCATION
            <div className='header-text'>
              <div>Booked by: USER_EMAIL</div>
              <div>TODAYS_DATE - USE MOMENT WITH .FORMAT()</div>
            </div>
          </div>
          <div className='confirmed-detail row'>
            <div className='col m5'>
              <div className='bordered col'>
                <div className='col m12 upper'>
                  <div className='left'>Check in</div>
                  <div className='right'>Check out</div>
                </div>
                <div className='col m12 lower'>
                  <div className='left'>
                    CHECK_IN_DATE - USE MOMENT WITH .FORMAT()
                  </div>
                  <div className='right'>
                    CHECK OUT DATE - USE MOMENT WITH .FORMAT()
                  </div>
                </div>
                <div className='col m12 title-text'>VENUE_TITLE</div>
                <div className='col m12 details'>VENUE_DETAILS</div>
              </div>
            </div>

            <div className='col m7'>
              <div className='bordered col'>
                <div className='col m12 upper charges'>
                  <div className='charges-text col m12'>Charges</div>
                  <div className='row col m12'>
                    <div className='left'>
                      $PRICE_PER_NIGHT x NUMBER_OF_NIGHTS nights
                    </div>
                    <div className='right'>$TOTAL_PRICE</div>
                  </div>
                  <div className='row col m12'>
                    <div className='left'>Discount</div>
                    <div className='right'>$0</div>
                  </div>
                  <div className='row col m12 total'>
                    <div className='left'>TOTAL</div>
                    <div className='right'>$TOTAL_PRICE</div>
                  </div>
                </div>
                <div className='col m12 row'>
                  To rview or make changes to your reservation in the future,
                  visit your <Link to='/account'>account page</Link>.
                </div>
                <div className='col m12 resv-image'>
                  <img src='VENUE_IMAGE_URL' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(PaymentSuccess);
