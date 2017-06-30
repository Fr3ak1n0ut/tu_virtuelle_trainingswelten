/* global google */

import canUseDOM from "can-use-dom";
import raf from "raf";
import {default as React, Component} from "react";
import {withGoogleMap, GoogleMap, Circle, InfoWindow} from "react-google-maps";
import TimePicker from 'react-toolbox/lib/time_picker/TimePicker';
import OwnCircle from './Circle';

export default Map = withGoogleMap(props => (
  <GoogleMap defaultZoom={8} center={props.center}>
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
          fillColor: "#0066ff",
          fillOpacity: 0.80,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1
        }}/>

        <OwnCircle
          center={props.center}
          radius={1000}
          marketingMultiplier={5}
          maxLifeTime={6}/>
      </div>
    )}
  </GoogleMap>
));
