import React from 'react';
import '../components/Dropdown.scss';


export class Dropdown extends React.Component {
    // panelWillOpen() {
    //     var elem = document.querySelector('#openPanel');
    //     elem.classList.toggle('dropdown--active');
    // }

    render() {
        return (
            <div className="panel-container">
                <div className="toggler">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="dropdown" id="openPanel">
                </div>
            </div>
        )
    }
  }