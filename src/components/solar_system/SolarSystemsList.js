import React from 'react';
import _ from "lodash";

export class SolarSystemsList extends React.Component {
    constructor(props) {
        super(props);
    }


    createNewSolarSystem = () => {
        let store = this.props.gin.store;
        store.solar_systems.push({ id: store.solar_systems_count, bpm: 100, orbits: []});
        store.solar_systems_count++;
        this.props.gin.setState(store);
    };

    render() {
        return (
            <div className="solar-systems-list">
                <div onClick={() => this.createNewSolarSystem() }> Create new system </div>
                {this.props.gin.store.solar_systems.map(system => {
                    return <li className={"system-list-element"}>{system.id}</li>
                })}
            </div>
        )
    }
}