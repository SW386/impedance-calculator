import React from "react";
import axios from 'axios';


class ZInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            frequency:"",
            capacitance:"",
            resistance:"",
            inductance:"",
            type:this.props.type,
            fUnit:"rad/s",
            cUnit:"F",
            rUnit:"O",
            lUnit:"H",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        if(event.target.type === "select-one") {
            this.setState({[event.target.name] : event.target.value});
            if(event.target.name === "type") {
                this.props.getType(event.target.value);
            }
        } else {
            this.setState({[event.target.name] : parseInt(event.target.value)});
            var data = [this.state.resistance,this.state.inductance,this.state.capacitance]
            if(event.target.name==="resistance"){
                data[0] = parseInt(event.target.value);
            } else if (event.target.name==="inductance"){
                data[1] = parseInt(event.target.value);
            } else if (event.target.name==="capacitance") {
                data[2] = parseInt(event.target.value);
            }
            this.props.getNumber(data);
        }
    }

    handleSubmit (event) {
        event.preventDefault();
        const param = {
            frequency: (this.state.fUnit === "rad/s")?this.state.frequency:
                        this.state.frequency*this.props.handleUnit(this.state.fUnit)*2*Math.PI,
            capacitance: this.state.capacitance*this.props.handleUnit(this.state.cUnit),
            resistance: this.state.resistance*this.props.handleUnit(this.state.rUnit),
            inductance: this.state.inductance*this.props.handleUnit(this.state.lUnit),
            type:this.state.type
        }
        axios.post("/RLC", param).then(response => {
            this.props.getAnswer(response.data)});
    }

    render () {
        return <div className="form">
            <form onSubmit={this.handleSubmit} className = ".Zinput">
                <div className ="calcDiv">
                    Circuit Type: <select value={this.state.type} name ="type" onChange={this.handleChange}>
                        <option value="parallel">Parallel</option>
                        <option value="series">Series</option>
                    </select>
                </div>
                <div className="calcDiv">
                    <input name = "frequency" type="number" placeholder="Frequency" 
                        value={this.state.frequency} onChange={this.handleChange}/>
                    <select value={this.state.fUnit} name="fUnit" onChange={this.handleChange}>
                        <option value="rad/s">rad/s</option>
                        <option value="GHz">GHz</option>
                        <option value="MHz">MHz</option>
                        <option value="kHz">kHz</option>
                        <option value="Hz">Hz</option>
                        <option value="mHz">mHz</option>
                    </select>
                </div>
                <div className="calcDiv">
                    <input name = "capacitance" type="number" placeholder="Capacitance" 
                        value={this.state.capacitance} onChange={this.handleChange}/>
                    <select value={this.state.cUnit} name="cUnit" onChange={this.handleChange}>                            
                        <option value="kF">kF</option>
                        <option value="F">F</option>
                        <option value="mF">mF</option>
                        <option value="uF">{"\u00b5"}F</option>
                        <option value="nF">nF</option> 
                    </select>
                </div>
                <div className="calcDiv">
                    <input name = "inductance" type="number" placeholder="Inductance" 
                        value={this.state.inductance} onChange={this.handleChange}/>
                    <select value={this.state.lUnit} name="lUnit" onChange={this.handleChange}>
                        <option value="kH">kH</option>
                        <option value="H">H</option>
                        <option value="mH">mH</option>
                        <option value="uH">{"\u00b5"}H</option>
                        <option value="nH">nH</option> 
                    </select>
                </div>
                <div className="calcDiv">
                    <input name = "resistance" type="number" placeholder="Resistance" 
                        value={this.state.resistance} onChange={this.handleChange}/>
                    <select value={this.state.rUnit} name="rUnit" onChange={this.handleChange}>
                        <option value="MO">M{'\u03a9'}</option>
                        <option value="kO">k{'\u03a9'}</option>
                        <option value="O">{'\u03a9'}</option>
                        <option value="mO">m{'\u03a9'}</option>
                        <option value="uO">{"\u00b5"}{'\u03a9'}</option>
                    </select>
                </div>
                <div className = "calcDiv">
                    <button className="btn btn-outline-success btn-sm">Calculate</button>
                </div>
            </form>
        </div>
    }
}

export default ZInput;