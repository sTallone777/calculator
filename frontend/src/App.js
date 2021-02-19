import React, { Component } from 'react';
import Panel from './components/Panel/Panel';
import './App.css';

class App extends Component{
  constructor(props){
      super(props);
      this.state = {
        clearUp: false,
        screenVal: "0",
        number1: "0",
        number2: "",
        symbol: ""
      }
  }

  setScreenValue = (val) =>{
    this.setState({
      screenVal: val
    });
  }

  setNumber1 = (num) => {
    this.setState({
      number1: num
    });
  }

  setNumber2 = (num) => {
    this.setState({
      number2: num
    });
  }

  setSymbol = (sbl) => {
    this.setState({
      symbol: sbl
    });
  }

  setClearUp = (scu) =>{
    this.setState({
      clearUp: scu
    });
  }

  render(){
    return(
      <div className = "App">
        <Panel parent={this}/>
      </div>
    );
  }
}

export default App;
