import React, {Component} from 'react';
import emitter from '../../util/events';
import './Cscreen.scss';

class Cscreen extends Component{
    constructor(){
        super();
        this.state = {result: "0"};
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener('changeDisp', (result) =>
        {
            this.setState({
                result
            });
        });
    }

    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }

    render(){
        return(
            <div className='Cscreen'>
                <span>{this.state.result}</span>
            </div>
        );
    }
}

export default Cscreen;