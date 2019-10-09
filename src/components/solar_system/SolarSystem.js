import React from 'react';
import _ from "lodash";
import {createNewPlanet, spinToggle} from "../../features/solar_system";
import { keyframes } from "styled-components";
import Sun from "./Sun"
import Orbit from "./Orbit"
import Planet from "./Planet";
import PropTypes from 'prop-types';


class SolarSystem extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        let gin = this.props.gin;
        let store = gin.store;
        let solar_system = this.props.solar_system;
        let container_size = 500;
        if (!solar_system) {
            return (<div>Choose solar system</div>)
        }
        let create_planet_button = <button onClick={() => createNewPlanet(gin, store)}>Create planet</button>;
        let toggle_spin_button = <button onClick={() => spinToggle(gin, store, solar_system.id, !solar_system.spin)}>{solar_system.spin ? "Stop" : "Start"}</button>;

        let orbits = _.map(solar_system.orbits, (orbit, i) => {
            let data = {
                container_size: container_size,
                system_id: solar_system.id,
                spin: solar_system.spin,
                orbit: orbit,
                orbit_id: i,
                orbit_r: 70 + 20 * i,
                time_length: orbit.time_length
            };

            return (
                <Orbit gin={gin} store={store} data={data} >
                    <Planet gin={gin} store={store} data={data}/>
                </Orbit>
            )
        });
        console.log("orbits")
        console.log(orbits)
        return (
            <div className="solar-system" style={{ width: container_size, height: container_size}}>
                {create_planet_button}
                {toggle_spin_button}
                <Sun container_size={container_size} r={30} bmp={solar_system.bpm}/>
                {orbits ? orbits : ""}
            </div>
        )
    }
}

SolarSystem.propTypes = {
    solar_system: PropTypes.object
};

export default SolarSystem;
