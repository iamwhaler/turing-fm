import React from 'react';
import _ from "lodash";
import { createNewSolarSystem, setCurrentSolarSystem }from "../../features/solar_system";

export class SolarSystemsList extends React.Component {
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
                    return <button key={system.id} onClick={() => { setCurrentSolarSystem(gin, store, system.id) }} className={"system-list-element"}>{system.id}</button>
                })}
            </div>
        )
    }
}