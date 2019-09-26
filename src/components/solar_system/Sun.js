import React from 'react';
import _ from "lodash";
import {createNewPlanet} from "../../features/solar_system";
import { keyframes } from "styled-components";
import PropTypes from 'prop-types';

class Sun extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { container_size, r } = this.props;
        return (
            <div style={{
                width: container_size,
                height: container_size,
                position: "absolute"
            }}>

                <svg width={container_size} height={container_size}>
                    <g color="orangered">
                        <circle fill="currentColor" cx={container_size / 2} cy={container_size / 2} r={r} />
                    </g>
                </svg>
            </div>
        )
    }
}
Sun.propTypes = {
    container_size: PropTypes.number,
    r: PropTypes.number
};
export default Sun;