import React from 'react';
import { createNewSolarSystem, setCurrentSolarSystem }from "../../features/solar_system";

class SolarSystemsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let gin = this.props.gin;
        let store = gin.store;
        return (
            <div className="solar-systems-list">
              {store.solar_systems.length <= 0 ?
                  <button className="solar-system-button" onClick={() => createNewSolarSystem(gin, store)}>New system</button>
                  : <button className="solar-system-button border" onClick={() => createNewSolarSystem(gin, store)}>+</button>
              }
                {store.solar_systems.map(system => {
                    return <div className={`solar-system-button ${system.id === store.selected_solar_system_id ? "selected" : ""}`} key={system.id} onClick={() => { setCurrentSolarSystem(gin, store, system.id) }}>{system.name}</div>
                })}
            </div>
        )
    }
}

export default SolarSystemsList;