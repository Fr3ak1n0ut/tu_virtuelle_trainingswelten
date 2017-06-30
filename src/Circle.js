import {default as React, Component} from "react";
import {Circle} from "react-google-maps";

/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */

class OwnCircle extends Component {
    constructor(props) {
        super(props);
        /*
        this.props = {
            marketingMultiplier: 1,
            maxLifeTime: 100,
            options: {
                strokeColor: "",
                strokeOpacity: "",
                strokeWeight: "",
                fillOpacity: ""
            },
            radius: 1000,
            center: {
                lat: 23,
                long: -188
            }
        }
        */
        this.state = {
            radius: this.props.radius,
            currentLifetime: 0.1,
            color: {
                r: 0,
                g: 0,
                b: 0
            },
            hexColor: "#ff0000",
            logMultiplier: 1
        }

    }
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1
            ? "0" + hex
            : hex;
    }

    interpolateColors() {
        let scaledLifetime = (100 / this.props.maxLifeTime) * (this.state.currentLifetime - this.props.maxLifeTime) + 100.0;
        this.setState({
            color: {
                r: Math.floor((255 * scaledLifetime) / 100.0),
                g: Math.floor((255 * (100 - scaledLifetime)) / 100),
                b: 0
            }
        })
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 10);
    }

    tick() {
        if (this.state.currentLifetime > this.props.maxLifeTime) {
            console.log("max lifetime reached!");
        } else {

            this.interpolateColors();
            this.setState({
                currentLifetime: (this.state.currentLifetime + 0.01),
                radius: (this.state.radius + 100 * (Math.log10(this.props.marketingMultiplier - 0.9) + 2)),
                hexColor: this.rgbToHex(this.state.color.r, this.state.color.g, this.state.color.b)
            });
        }
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (<Circle
            center={this.props.center}
            radius={this.state.radius}
            options={{
            fillColor: this.state.hexColor,
            fillOpacity: 0.20,
            strokeColor: 'black',
            strokeOpacity: 1,
            strokeWeight: 1
        }}/>);
    }
}

export default OwnCircle;