import React from 'react';
import _ from "lodash";
import SolarSystemsList from "./SolarSystemsList";
import SolarSystem from "./SolarSystem";

export class SolarSystemsManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let store = this.props.gin.store;
        let current_solar_system = _.find(store.solar_systems, s => s.id === store.selected_solar_system_id);

        return (
            <div className="solar-systems-manager">
              <SolarSystemsList gin={this.props.gin} />
              {store.solar_systems.length > 0 ? <SolarSystem gin={this.props.gin} solar_system={current_solar_system}/> : ''}
            </div>
        )
    }
}