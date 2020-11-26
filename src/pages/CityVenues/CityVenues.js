import React, { Component } from 'react';
import './CityVenues.css';
import axios from 'axios';

import Spinner from '../../utility/Spinner/Spinner';
import Venues from '../../utility/Venue/Venues';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class CityVenues extends Component {

  state = {
    header: '',
    venues: [],
  }

  async componentDidMount(){
    const cityName = this.props.match.params.cityName;
    const url = `${baseUrl}/venues/city/${cityName}`;

    const response = await axios.get(url, {cityName});

    this.setState({
      header: response.data.header,
      venues: response.data.venues,
    })


  }

  render(){
    if (!this.state.header){
      return (
        <Spinner />
      )
    }
    return (
      <div className="row">
        <Venues
          venues={this.state.venues}
          header={this.state.header}
        />
      </div>
    )
  }
}

export default CityVenues
