import React from 'react';
import _ from "lodash";
import {createNewPlanet} from "../../features/solar_system";
import styled, { keyframes} from "styled-components";
import PropTypes from 'prop-types';

const spin_keyframes = keyframes`
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            `;

const PlanetContainer = styled.div`
                width: ${props => props.container_size}px;
                height: ${props => props.container_size}px;
                position: absolute;
                pointer-events: none;
                animation: ${props => props.time_length}s ${props => props.spin ? spin_keyframes : ""} linear infinite
            `;

class Planet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { container_size, r, orbit_r, time_length, spin } = this.props;
        return (
            <PlanetContainer container_size={container_size} spin={spin} time_length={time_length}>
                <svg width={container_size} height={container_size}>
                    <g color="green">
                        <circle fill="currentColor" cx={(container_size - 2 * orbit_r) / 2} cy={container_size / 2} r={r} />
                    </g>
                </svg>
            </PlanetContainer>
        )
    }
}
Planet.propTypes = {
    container_size: PropTypes.number,
    r: PropTypes.number
};
export default Planet;