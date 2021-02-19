import React from 'react';
import { Component } from 'react';
import Cbutton from '../Cbutton/Cbutton';
import './ButtonArea.scss';

class ButtonArea extends Component {
    render(){
        return(
            <div className='ButtonArea' >
                <Cbutton disp="%" parent={this.props.parent}/>
                <Cbutton disp="CE" parent={this.props.parent}/>
                <Cbutton disp="C" parent={this.props.parent}/>
                <Cbutton disp="←" parent={this.props.parent}/>
                <Cbutton disp="1/x" parent={this.props.parent}/>
                <Cbutton disp="x²" parent={this.props.parent}/>
                <Cbutton disp="√x" parent={this.props.parent}/>
                <Cbutton disp="÷" parent={this.props.parent}/>
                <Cbutton disp="7" parent={this.props.parent}/>
                <Cbutton disp="8" parent={this.props.parent}/>
                <Cbutton disp="9" parent={this.props.parent}/>
                <Cbutton disp="×" parent={this.props.parent}/>
                <Cbutton disp="4" parent={this.props.parent}/>
                <Cbutton disp="5" parent={this.props.parent}/>
                <Cbutton disp="6" parent={this.props.parent}/>
                <Cbutton disp="－" parent={this.props.parent}/>
                <Cbutton disp="1" parent={this.props.parent}/>
                <Cbutton disp="2" parent={this.props.parent}/>
                <Cbutton disp="3" parent={this.props.parent}/>
                <Cbutton disp="＋" parent={this.props.parent}/>
                <Cbutton disp="±" parent={this.props.parent}/>
                <Cbutton disp="0" parent={this.props.parent}/>
                <Cbutton disp="." parent={this.props.parent}/>
                <Cbutton disp="＝" parent={this.props.parent}/>
            </div>
        );
    };
};

export default ButtonArea;