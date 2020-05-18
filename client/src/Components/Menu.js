import React from "react";

class Menu extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        event.preventDefault();
        this.props.getCalcType(event.target.value);
    }
    render() {
        return <div>
            <h3>Menu</h3>
            <hr></hr>
            <div>
                <button onClick = {this.handleChange} value = "R" type="button" className="btn btn-outline-primary btn-sm">Resistance</button>
            </div>
            <div>
                <button onClick = {this.handleChange} value = "C" type="button" className="btn btn-outline-primary btn-sm">Capacitance</button>
            </div>
            <div>
                <button onClick = {this.handleChange} value = "L" type="button" className="btn btn-outline-primary btn-sm">Inductance</button>
            </div>
            <div>
                <button onClick = {this.handleChange} value = "complex" type="button" className="btn btn-outline-primary btn-sm">Impedance</button>
            </div>
            <div>
                <button onClick = {this.handleChange} value = "Z" type="button" className="btn btn-outline-primary btn-sm">RLC Circuit</button> 
            </div>
        </div>
    }
}

export default Menu