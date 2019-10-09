import React from 'react';
import _ from "lodash";
import {createNewPlanet, changeOrbitParameter} from "../../features/solar_system";
import styled, { keyframes} from "styled-components";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';



class PlanetManageDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            time_length: props.data.time_length
        }
    }

    handleSave = () => {
        let props = this.props;
        changeOrbitParameter(props.gin, props.store, {
            system_id: props.data.system_id,
            orbit_id: props.data.orbit_id,
            paramToChange: "time_length",
            newValue: parseInt(this.state.time_length)
        });
        this.props.handleClose();
    }

    handleChangeTimeLength = event => {
        this.setState({
            time_length: event.target.value
        })
    };
    // ПРОВЕРИТЬ РАБОТОСПОСОБНОСТЬ ИЗМЕНЕНИЯ
    render() {
        let { gin, store, data, open } = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Orbit #${data.orbit_id}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Change orbit length ( seconds )
                    </DialogContentText>
                    <TextField id="time_length" value={this.state.time_length} onChange={this.handleChangeTimeLength}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSave} color="primary">
                        Save
                    </Button>

                </DialogActions>
            </Dialog>
        )
    }
}
PlanetManageDialog.propTypes = {
    container_size: PropTypes.number,
    r: PropTypes.number
};
export default PlanetManageDialog;