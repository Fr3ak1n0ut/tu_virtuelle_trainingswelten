/* global google */

import canUseDOM from "can-use-dom";

import raf from "raf";

import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow,
} from "react-google-maps";

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation : 
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.center}
  >
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    {props.center && (
      <div>
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
      <Circle
        center={props.center}
        radius={6000}
        options={{
          fillColor: 'blue',
          fillOpacity: 0.20,
          strokeColor: 'red',
          strokeOpacity: 1,
          strokeWeight: 2
        }}
      />
      </div>
    )}
  </GoogleMap>
));

/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class App extends Component {

  state = {
    center: null,
    content: null,
    radius: 6000,
  };

  isUnmounted = false;

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

      if (this.state.radius > 200) {
        raf(tick);
      }
    };
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Location found using HTML5.`,
      });

      raf(tick);
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${reason}).`,
      });
    });
    console.log(this.state.center);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    return (
      <div style={{height: '500px', width: '500px'}}>
      <GeolocationExampleGoogleMap
        containerElement={
          <div style={{ height: '100%'}} />
        }
        mapElement={
          <div style={{ height: '100%'}} />
        }
        center={this.state.center}
        content={this.state.content}
        radius={this.state.radius}
      />
      </div>
    );
  }
}

export default App;