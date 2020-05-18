import React from "react";
import axios from 'axios';


class RLCInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type:this.props.type,
            inputCount:2,
            data:["",""],
            dataUnit:["",""]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.getNumber(this.state.inputCount);
    }
    handleChange(event) {
        if(event.target.name === "inputCount") {
            const inputCount = parseInt(event.target.value);
            var data = [];
            var dataUnit =[];
            for(let i = 0; i<inputCount; i++) {
                data.push("");
                dataUnit.push("");
            }
            this.setState({inputCount:inputCount,data:data, dataUnit:dataUnit});
            this.props.getNumber(inputCount);
        } else if (event.target.name === "type"){
            this.setState({type:event.target.value});
            this.props.getType(event.target.value);
        } else if (event.target.type === "select-one"){
            const index = parseInt(event.target.name.slice(-1));
            var cloneUnit = [...this.state.dataUnit];
            cloneUnit[index] = event.target.value;
            this.setState({dataUnit:cloneUnit});
        } else {
            const index = parseInt(event.target.name.slice(-1));
            var clone = [...this.state.data];
            clone[index] = event.target.value;
            this.setState({data:clone});
        }

    }
    handleSubmit(event) {
        event.preventDefault();
        var data = []
        for(let i = 0; i<this.state.inputCount;i++){
            data.push(this.state.data[i]*this.props.handleUnit(this.state.dataUnit[i]));
        }
        const param = {
            data:data,
            type:this.state.type
        }
        axios.post("/"+this.props.calcType, param).then(response => this.props.getAnswer(response.data));
    }
    render() {
        var name = "";
        var circuitComponent = "";
        var unit = "";
        if(this.props.calcType === "R") {
            name = "Resistance";
            circuitComponent = "Resistor";
            unit = "O";
        } else if(this.props.calcType === "L"){
            name = "Inductance";
            circuitComponent = "Inductor"
            unit = "H";
        } else {
            name = "Capacitance";
            circuitComponent = "Capacitor"
            unit = "F";
        }
        var inputs = [];
        for (let i = 0; i<this.state.inputCount; i++) {
            inputs.push(<div key = {i} className="calcDiv">
                <input name={name+i.toString()} type="number" 
                    placeholder={name} value={this.state.data[i]} onChange={this.handleChange}/>
                <select value={this.state.dataUnit[i]} name={unit+i.toString()} onChange={this.handleChange}>
                    <option value={unit}>{(unit==="O")?"\u03a9":unit}</option>
                    <option value={"M"+unit}>{(unit==="O")?"M\u03a9":"M"+unit}</option>
                    <option value={"k"+unit}>{(unit==="O")?"k\u03a9":"k"+unit}</option>
                    <option value={"m"+unit}>{(unit==="O")?"m\u03a9":"m"+unit}</option>
                    <option value={"u"+unit}>{(unit==="O")?"\u00b5\u03a9":"\u00b5"+unit}</option>
                    <option value={"n"+unit}>{(unit==="O")?"n\u03a9":"n"+unit}</option>
                </select>        
            </div>)
        }
        return <div className="form">
            <form onSubmit = {this.handleSubmit}>
                <div className="calcDiv">
                    Circuit Type: <select value={this.state.type} name ="type" onChange={this.handleChange}>
                        <option value="parallel">Parallel</option>
                        <option value="series">Series</option>
                    </select>
                </div>
                <div className="calcDiv">
                    Number of {circuitComponent}s: <select value={this.state.inputCount} 
                    name ="inputCount" onChange={this.handleChange}>
                        <option value="2">2</option>                        
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                {inputs}
                <div className = "calcDiv">
                    <button className="btn btn-outline-success btn-sm">Calculate</button>
                </div>
            </form>
        </div>
    }
}

export default RLCInput