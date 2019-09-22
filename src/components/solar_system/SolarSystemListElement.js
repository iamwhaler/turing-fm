import React from 'react';
import _ from "lodash";

export class SolarSystemsListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(this.props.gin.store.solar_systems, nextProps.gin.store.solar_systems);
    }

    createNewSolarSystem = () => {
        let store = this.props.gin.store;
        store.solar_systems.push({ id: store.solar_systems_count, bpm: 100, orbits: []});
        store.solar_systems_count++;
    };

    render() {
        return (
            <div className="solar-systems-list">
                {this.props.gin.store.solar_systems.map(system => {
                    return <li className={"system-list-element"}>{system.id}</li>
                })}
            </div>
        )
    }
}