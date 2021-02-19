import React, { Component } from 'react';
import Cscreen from '../Cscreen/Cscreen';
import ButtonArea from '../ButtonArea/ButtonArea';
import './Panel.scss';

class Panel extends Component{
    render(){
        return(
            <div className = 'panel'>
                <Cscreen />
                <ButtonArea parent={this.props.parent}/>
            </div>
        );
    };
};

export default Panel;