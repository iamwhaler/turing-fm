import React from 'react';
//import Slider from 'react-input-slider';

const CSlider = props => {
  const { value, onChange, gin } = props;
  return (
      <div className="slider">
        {/*<Slider
            axis="x"
            x={value}
            onChange={({ x }) => onChange(x)}
        />*/}
      </div>
  );
};
export default CSlider;