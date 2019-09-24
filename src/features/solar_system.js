export const createNewSolarSystem = (gin, store) => {
    store.solar_systems.push({ id: store.solar_systems_count, bpm: 100, orbits: []});
    store.selected_solar_system_id = store.solar_systems_count;
    store.solar_systems_count++;
    gin.setState(store);
};

export const setCurrentSolarSystem = (gin, store, id) => {
    store.selected_solar_system_id = id;
    gin.setState(store);
};