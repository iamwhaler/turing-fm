import React from 'react';
import _ from "lodash";
import { createNewSolarSystem, setCurrentSolarSystem }from "../../features/solar_system";

class SolarSystemsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let gin = this.props.gin;
        let store = gin.store;
        let helpers = this.props.helpers;
        return (
            <div className="solar-systems-list">
                <button onClick={() => createNewSolarSystem(gin, store) }> Create new system </button>
                {this.props.gin.store.solar_systems.map(system => {
                    return <div className={`system-list-element ${system.id === store.selected_solar_system_id ? "selected" : ""}`} key={system.id} onClick={() => { setCurrentSolarSystem(gin, store, system.id) }}>{system.id}</div>
                })}
            </div>
        )
    }
}

export default SolarSystemsList;