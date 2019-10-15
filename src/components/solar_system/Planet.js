import React from 'react';
import _ from "lodash";
import {createNewPlanet} from "../../features/solar_system";
import styled, { keyframes} from "styled-components";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PlanetManageDialog from "./PlanetManageDialog";


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
        this.state = {
            open: false
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    openDialog = () => {
        this.setState({
            open: true
        })
    };

    render() {
        let { gin, store, data } = this.props;
        let { container_size, r, orbit_r, time_length, spin, orbit_id, system_id } = data;
        let planet_r = 8;
        /*if (!orbit_r) {
            planet_r = 0;
        }*/
        return (
            <PlanetContainer container_size={container_size} spin={spin} time_length={time_length}>
                <div className="clickable-container" onClick={() => this.openDialog()}>
                    <svg width={container_size} height={container_size}>
                        <g color="green" style={{pointerEvents: "bounding-box"}}>
                            <circle fill="currentColor" cx={(container_size - 2 * orbit_r) / 2} cy={container_size / 2} r={planet_r} />
                        </g>
                    </svg>
                </div>
                <PlanetManageDialog gin={gin} store={store} data={data} open={this.state.open} handleClose={() => this.handleClose()}/>
            </PlanetContainer>
        )
    }
}
Planet.propTypes = {
    container_size: PropTypes.number,
    r: PropTypes.number
};
export default Planet;