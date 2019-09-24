import React from 'react';
import _ from "lodash";

export class SolarSystem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let gin = this.props.gin;
        let store = gin.store;
        return (
            <div className="solar-system">
                Space for the solar system
            </div>
        )
    }
}