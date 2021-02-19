import React, {Component} from 'react';
import emitter from '../../util/events';
import axios from 'axios';
import './Cbutton.scss';

class Cbutton extends Component{
    send = (event) => {
        const url = 'http://localhost:8002/calculator';
        const maxLength = 10
        let tpp = this.props.parent;
        let val = event.target.getAttribute("value");
        let SendSymbol = ['%', '1/x', 'x²', '√x', '＝'];
        let unSendSymbol = ['±', '.','C', 'CE', '←', '＋', '－', '×', '÷'];
        let postData = {
            number1 : tpp.state.number1,
            number2 : tpp.state.number2,
            symbol : tpp.state.symbol,
            screenVal : tpp.state.screenVal
        };

        if(SendSymbol.indexOf(val) > -1){
            //postData.symbol = val;
            if(val !== '＝') {
                postData.symbol = val;
            }
            axios.post(url, postData)
            .then(response => {
                console.log('get response ok.');
                tpp.setClearUp(true);
                tpp.setNumber1(response.data.Data.Number1);
                tpp.setNumber2(response.data.Data.Number2);
                tpp.setSymbol(response.data.Data.Symbol);
                tpp.setScreenValue(response.data.Data.ScreenVal);
                emitter.emit('changeDisp', response.data.Data.ScreenVal);
            }).catch(err => console.log(err));
        }else{
            let tmpVal = "";
            if(unSendSymbol.indexOf(val) > -1){
                if(val === 'C' || val === 'CE'){
                    tpp.setNumber1("0");
                    tpp.setNumber2("");
                    tpp.setSymbol("");
                    tpp.setScreenValue("0");
                    tmpVal = "0";
                }else if(['±','.'].indexOf(val) > -1){
                    //operate second number
                    if(tpp.state.symbol !== ""){
                        if(tpp.state.number2 !== ""){
                            if(val === '.'){
                                if(tpp.state.screenVal.indexOf('.') < 0){
                                    tmpVal = tpp.state.number2 + ".";
                                    tpp.setNumber2(tmpVal + "0")
                                    tpp.setScreenValue(tmpVal);
                                }
                            }
                            if(val === '±'){
                                if(tpp.state.number2 !== "0"){
                                    if(tpp.state.number2.indexOf('-') < 0){
                                        tmpVal = '-' + tpp.state.number2;
                                        tpp.setNumber2(tmpVal)
                                        tpp.setScreenValue(tmpVal);
                                    }else{
                                        tmpVal = tpp.state.number2.replace('-', '');
                                        tpp.setNumber2(tmpVal)
                                        tpp.setScreenValue(tmpVal);
                                    }
                                }
                            }
                        }else{
                            if(val === '.'){
                                tmpVal = "0."
                                tpp.setNumber2("0.0")
                                tpp.setScreenValue(tmpVal);
                            }
                        }
                    //operate first number
                    }else{
                        if(val === '.'){
                            if(tpp.state.screenVal.indexOf('.') < 0){
                                tmpVal = tpp.state.number1 + ".";
                                tpp.setNumber1(tmpVal + "0")
                                tpp.setScreenValue(tmpVal);
                            }
                        }
                        if(val === '±'){
                            if(tpp.state.number1 !== "0"){
                                if(tpp.state.number1.indexOf('-') < 0){
                                    tmpVal = '-' + tpp.state.number1;
                                    tpp.setNumber1(tmpVal)
                                    tpp.setScreenValue(tmpVal);
                                }else{
                                    tmpVal = tpp.state.number1.replace('-', '');
                                    tpp.setNumber1(tmpVal)
                                    tpp.setScreenValue(tmpVal);
                                }
                            }
                        }
                    }
                }else if(val === '←'){
                    tmpVal = tpp.state.screenVal.length > 1 ? tpp.state.screenVal.substring(0, tpp.state.screenVal.length - 1) : "0";
                    if(tpp.state.symbol !== ""){
                        tpp.setNumber2(tmpVal)
                    }else{
                        tpp.setNumber1(tmpVal)
                    }
                    tpp.setScreenValue(tmpVal);
                }else{
                    tpp.setClearUp(true);
                    if(tpp.state.symbol !== "" && tpp.state.number2 !== ""){
                        //send to api
                        axios.post(url, postData)
                        .then(response => {
                            console.log('get response ok.');
                            tpp.setNumber1(response.data.Data.Number1);
                            tpp.setNumber2(response.data.Data.Number2);
                            tpp.setSymbol(val);
                            tpp.setScreenValue(response.data.Data.ScreenVal);
                            emitter.emit('changeDisp', response.data.Data.ScreenVal);
                        }).catch(err => console.log(err));
                    }else{
                        //symbol update
                        tpp.setSymbol(val)
                    }
                }
            }else{
                //put number
                if(postData.screenVal.length < maxLength || tpp.state.clearUp === true){
                    if(tpp.state.screenVal === "0" || tpp.state.clearUp === true){
                        tmpVal = val;
                        tpp.setClearUp(false);
                    }else{
                        tmpVal = tpp.state.screenVal + val;
                    }
                    
                    if(tpp.state.symbol !== ""){
                        tpp.setNumber2(tmpVal);
                    }else{
                        tpp.setNumber1(tmpVal);
                    }
                    tpp.setScreenValue(tmpVal);
                }
            }
            if(tmpVal !== "") {
                emitter.emit('changeDisp', tmpVal);
            }
        }
        
    }

    render(){
        return(
            <div className="Cbutton">
                <input type="button" onClick={this.send} value={this.props.disp}/>
            </div>
        );
    };
}

export default Cbutton;