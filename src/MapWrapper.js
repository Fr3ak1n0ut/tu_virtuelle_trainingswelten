import canUseDOM from "can-use-dom";
import raf from "raf";
import {default as React, Component} from "react";
import TimePicker from 'react-toolbox/lib/time_picker/TimePicker';
import Map from './Map';
/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const geolocation = (canUseDOM && navigator.geolocation
    ? navigator.geolocation
    : ({
        getCurrentPosition(success, failure) {
            failure(`Your browser doesn't support geolocation.`);
        }
    }));
var isUnmounted = false;

class MapWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: null,
            content: null,
            radius: 6000
        };
    }

    componentDidMount() {
        const tick = () => {
            if (this.isUnmounted) {
                return;
            }
            this.setState({
                radius: Math.max(this.state.radius - 20, 0)
            });

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
                    lng: position.coords.longitude
                },
                content: `Location found using HTML5.`
            });

            raf(tick);
        }, (reason) => {
            if (this.isUnmounted) {
                return;
            }
            this.setState({
                center: {
                    lat: 60,
                    lng: 105
                },
                content: `Error: The Geolocation service failed (${reason}).`
            });
        });
        console.log(this.state.center);
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    render() {
        return (
            <div
                style={{
                height: '650px',
                width: '80%',
                margin: 'auto',
                marginTop: '20px',
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor: '#fff'
            }}>
                <div style={{
                    height: '100px'
                }}>
                    <p>React Map Component</p>
                </div>
                <Map
                    containerElement={< div style = {{ height: '490px'}}/>}
                    mapElement={< div style = {{ height: '100%'}}/>}
                    center={this.state.center}
                    content={this.state.content}
                    radius={this.state.radius}/>
                <div style={{
                    height: '50px'
                }}>
                    <p>React Map Component</p>
                </div>
            </div>
        );
    }
}

export default MapWrapper;