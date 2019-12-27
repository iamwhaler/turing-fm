import _ from "lodash";
import {instruments} from "../knowledge/instruments";
import drum from "../assets/audio/drum.wav";

export const createNewSolarSystem = (gin, store) => {
  store.solar_systems.push({id: store.solar_systems_count, bpm: 100, orbits: [], spin: false, orbits_count: 0});
  store.selected_solar_system_id = store.solar_systems_count;
  store.solar_systems_count++;
  _.times(10, () => createEmptyOrbit(gin, store, store.solar_systems[store.selected_solar_system_id]));
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
  let orbit = _.find(store.solar_systems[store.selected_solar_system_id].orbits, orbit => orbit.empty);
  if (orbit) {
    orbit.empty = false;
    orbit.time_length = _.random(5, 15);
    orbit.planet = {
      sequence: [],
      instrument: _.sample(instruments)
    };
    gin.params.helpers.loopSound(drum);
  } else {
    alert("Maximum amount of orbits");
  }
  gin.setState(store);
};

export const changeOrbitParameter = (gin, store, data) => {
  let {system_id, orbit_id, paramToChange, newValue} = data;
  if ((system_id || system_id === 0) && (orbit_id || orbit_id === 0) && paramToChange && newValue) {
    store.solar_systems[system_id].orbits[orbit_id][paramToChange] = newValue;
    gin.setState(store);
  } else {
    console.log("WRONG PARAMETER");
  }
};

export const spinToggle = (gin, store, system_id, bool) => {
  store.solar_systems[system_id].spin = bool;
  gin.setState(store);
};

/*export const sortOrbits = (gin, store, data) => {
    let { system_id } = data;
    store.solar_systems[system_id].orbits = _.sortBy(store.solar_systems[system_id].orbits, ["time_length"]);
    gin.setState(store);
};*/

export const calcOrbitRadius = (current, prev, i) => {
  if (current === 0) {
    return 0;
  }
  if (i !== 0) {
    //return 70 + Math.pow(10 * (current - prev), 1/2) + 20 * i;
    return 70 + 20 * i;
  } else {
    return 70;
  }
};

export const createEmptyOrbit = (gin, store, system) => {
  system.orbits_count++;
  system.orbits.push({
    empty: true,
    id: store.solar_systems[store.selected_solar_system_id].orbits_count,
    time_length: 0,
    planets: []
  });
  gin.setState(store);
};
