import {default as React, Component} from "react";
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import MapWrapper from './MapWrapper';
import theme from './toolbox/theme.js';

/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="appDiv">
                <AppBar title="React Toolbox" leftIcon="menu">
                    <Navigation type="horizontal">
                        <Link href="http://" label="Inbox" icon="inbox"/>
                        <Link href="http://" active label="Profile" icon="person"/>
                    </Navigation>
                </AppBar>

                < MapWrapper/>

            </div>
        );
    }
}

export default App;