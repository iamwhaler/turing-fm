window.navigator.requestMIDIAccess().then(access => {
  console.log(access);
  const inputs = Array.from(access.inputs);
  const device = inputs[1][1];
  console.log(device);
  device.onmidimessage = ({ data }) => console.log(data);
});