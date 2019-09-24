import React from 'react';
import _ from "lodash";
import {SolarSystemsList} from "./SolarSystemsList";
import {SolarSystem} from "./SolarSystem";

export class SolarSystemsManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="solar-systems-manager">
                <SolarSystemsList gin={this.props.gin}/>
                <SolarSystem gin={this.props.gin} />
            </div>
        )
    }
}