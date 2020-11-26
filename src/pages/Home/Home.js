import React, { Component } from 'react';
import axios from 'axios';
import SearchBox from './SearchBox';
import Cities from '../../utility/City/Cities';
import Activities from '../../utility/Activity/Activities';
import Venues from '../../utility/Venue/Venues';
import Spinner from '../../utility/Spinner/Spinner';
import './Home.css';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class Home extends Component {
  state = {
    cities: [],
    europeCities: {},
    asiaCities: {},
    exoticCities: {},
    activities: [],
    recVenues: {},
  };
  async componentDidMount() {
    const citiesUrl = `${baseUrl}/cities/recommended`;
    const europeCitiesUrl = `${baseUrl}/cities/europe`;
    const asiaCitiesUrl = `${baseUrl}/cities/asia`;
    const exoticCitiesUrl = `${baseUrl}/cities/exotic`;

    const activititesUrl = `${baseUrl}/activities/today`;
    const activities = await axios(activititesUrl);
    this.setState({
      activities: activities.data,
    });

    const venuesUrl = `${baseUrl}/venues/recommended`;
    const venues = await axios(venuesUrl);
    this.setState({
      recVenues: venues.data,
    });

    const citiesPromises = [];
    citiesPromises.push(axios.get(citiesUrl));
    citiesPromises.push(axios.get(europeCitiesUrl));
    citiesPromises.push(axios.get(asiaCitiesUrl));
    citiesPromises.push(axios.get(exoticCitiesUrl));

    Promise.all(citiesPromises).then((data) => {
      const recommendedCities = data[0].data;
      const europeCities = data[1].data;
      const asiaCities = data[2].data;
      const exoticCities = data[3].data;
      this.setState({
        cities: recommendedCities,
        europeCities,
        asiaCities,
        exoticCities,
      });
    });
  }
  render() {
    if (this.state.cities.length === 0) {
      return <Spinner />;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="home col s12">
            <div className="upper-fold">
              <SearchBox />
            </div>
          </div>
          <div className="container-fluid lower-fold">
            <div className="row">
              <div className="col s12">
                <Cities
                  cities={this.state.cities}
                  header="Recommanded Cities For You."
                />
              </div>
              <div className="col s12">
                <Activities
                  activities={this.state.activities}
                  header="Today in your area"
                />
              </div>
              <div className="col s12">
                <Cities
                  cities={this.state.europeCities.cities}
                  header={this.state.europeCities.header}
                />
              </div>
              <div className="col s12">
                <Venues
                  venues={this.state.recVenues.venues}
                  header={this.state.recVenues.header}
                />
              </div>
              <div className="col s12">
                <Cities
                  cities={this.state.asiaCities.cities}
                  header={this.state.asiaCities.header}
                />
              </div>
              <div className="col s12">
                <Cities
                  cities={this.state.exoticCities.cities}
                  header={this.state.exoticCities.header}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
