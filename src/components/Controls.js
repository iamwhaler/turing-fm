import React from 'react';
import Slider from '@material-ui/lab/Slider';


export class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playback_rate: 1
    }

  }

  componentWillMount() {
  }

  render() {
    let gin = this.props.gin;
    let helpers = gin.params.helpers;
    return <div className="playback" id="playback">
            <Slider
                aria-label="playback"
                onChange={(event, value) => helpers.changePlaybackRate(gin.store, value)}
                onChangeCommitted={() => {}}
                step={1}
                min={0}
                max={100}
            />
            </div>
  }
}
