import _ from "lodash";
import { instruments } from "../knowledge/instruments";

export const createNewSolarSystem = (gin, store) => {
    store.solar_systems.push({ id: store.solar_systems_count, bpm: 100, orbits: [], spin: false});
    store.selected_solar_system_id = store.solar_systems_count;
    store.solar_systems_count++;
    gin.setState(store);
};

export const setCurrentSolarSystem = (gin, store, id) => {
    console.log("id = " + id);
    store.solar_systems[store.selected_solar_system_id].spin = false;
    store.selected_solar_system_id = id;
    gin.setState(store);
};

export const createNewPlanet = (gin, store) => {
  document.dispatchEvent(new Event('planet_created'));
  store.solar_systems[store.selected_solar_system_id].orbits.push({ time_length: _.random(5, 15), planets: [{ sequence: [], instrument: _.sample(instruments)}]});
  gin.setState(store);
};

export const changeOrbitParameter = (gin, store, data) => {
    let { system_id, orbit_id, paramToChange, newValue } = data;
    console.log("data")
    console.log(data)
    if ((system_id || system_id === 0) && (orbit_id || orbit_id === 0) && paramToChange && newValue) {
        store.solar_systems[system_id].orbits[orbit_id][paramToChange] = newValue;
        gin.setState(store);
       /* sortOrbits(gin, store, { system_id })*/
    } else {
        console.log("WRONG PARAMETER");
    }
};

export const spinToggle = (gin, store, system_id, bool) => {
    store.solar_systems[system_id].spin = bool;
    gin.setState(store);
};

/*
export const sortOrbits = (gin, store, data) => {
    let { system_id } = data;
    store.solar_systems[system_id].orbits = _.sortBy(store.solar_systems[system_id].orbits, ["time_length"]);
    gin.setState(store);
};*/
