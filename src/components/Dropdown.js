import React from 'react';
import '../components/Dropdown.scss';


export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
    }

    // panelWillOpen() {
    //     var elem = document.querySelector('#openPanel');
    //     elem.classList.toggle('dropdown--active');
    // }

    render() {
        return (
            <div className="panel-container">
                <div className="toggler" onClick={() => this.setState({opened: true})}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {this.state.opened ? <div className="dropdown" id="openPanel">BLA</div> : ''}
            </div>
        )
    }
}