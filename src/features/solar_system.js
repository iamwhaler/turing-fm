import _ from "lodash";

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
    store.solar_systems[store.selected_solar_system_id].orbits.push({ time_length: _.random(5, 15), planets: [{ sequence: [], instrument: ""}]});
    gin.setState(store);
};

export const spinToggle = (gin, store, system_id, bool) => {
    store.solar_systems[system_id].spin = bool;
    gin.setState(store);
};