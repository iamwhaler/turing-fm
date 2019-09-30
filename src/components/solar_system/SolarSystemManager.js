import React from 'react';
import _ from "lodash";
import SolarSystemsList from "./SolarSystemsList";
import SolarSystem from "./SolarSystem";

export class SolarSystemsManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let gin = this.props.gin;
        let store = gin.store;
        let current_solar_system = _.find(store.solar_systems, s => s.id === store.selected_solar_system_id);
        console.log("render");
        console.log("current_solar_system");
        console.log(current_solar_system);

        return (
            <div className="solar-systems-manager">
                <SolarSystemsList gin={this.props.gin} />
                <SolarSystem gin={this.props.gin} solar_system={current_solar_system}/>
            </div>
        )
    }
}