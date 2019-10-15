import React from 'react';
import _ from "lodash";
import {createNewPlanet} from "../../features/solar_system";
import styled, { keyframes, css } from "styled-components";
import PropTypes from 'prop-types';

const spin_keyframes = keyframes`
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            `;

const OrbitContainer = styled.div`
                width: ${props => props.container_size}px;
                height: ${props => props.container_size}px;
                
                animation: ${props => props.time_length}s ${props => props.spin ? spin_keyframes : ""} linear infinite
            `;

class Orbit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { container_size, orbit_r, spin, time_length } = this.props.data;
        return (
            <div style={{
                position: "absolute",
                pointerEvents: "none"
            }}>
                <div className={"check"}>
                {this.props.children}
                <svg width={container_size} height={container_size}>
                    <g color="gray">
                        <circle fill="none" strokeWidth="1" stroke="currentColor" cx={container_size / 2} cy={container_size / 2} r={orbit_r} />
                    </g>
                </svg>
                </div>
            </div>
        )
    }
}
Orbit.propTypes = {
    container_size: PropTypes.number,
    r: PropTypes.number,
    spin: PropTypes.bool,
    time_length: PropTypes.number
};
export default Orbit;