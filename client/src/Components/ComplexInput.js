import React from "react";
import axios from 'axios';

class ComplexInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            inputCount:2,
            rep: "complex",
            reMag: ["",""],
            imPhase: ["",""],
            dataUnit:["O","O"]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.getNumber(this.state.inputCount);
    }
    handleSubmit(event) {
        event.preventDefault();
        var reMag = [];
        var imPhase = [];
        if(this.state.rep === "complex") {
            for(let i = 0; i<this.state.inputCount;i++) {
                const factor = this.props.handleUnit(this.state.dataUnit[i]);
                reMag.push(this.state.reMag[i]*factor);
                imPhase.push(this.state.imPhase[i]*factor);
            }
        } else {
            imPhase = this.state.imPhase;
            for(let i = 0; i<this.state.inputCount;i++) {
                const factor = this.props.handleUnit(this.state.dataUnit[i]);
                reMag.push(this.state.reMag[i]*factor);
            }
        }
        const param = {
            type : this.state.type,
            rep : this.state.rep,
            inputCount : this.state.inputCount,
            reMag : reMag,
            imPhase : imPhase,
        }
        axios.post("/complex", param).then(response => {this.props.getAnswer(response.data)});
    }
    handleChange(event) {
        if(event.target.name === "inputCount") {
            const inputCount = parseInt(event.target.value);
            var data = [];
            var dataUnit =[];
            for(let i = 0; i<inputCount; i++) {
                data.push("");
                dataUnit.push("O");
            }
            this.setState({inputCount:inputCount,data:data, dataUnit:dataUnit});
            this.props.getNumber(inputCount);
        } else if (event.target.name === "type"||event.target.name === "rep"){
            this.setState({[event.target.name]:event.target.value});
            if(event.target.name==="type"){this.props.getType(event.target.value)}
        } else if (event.target.type === "select-one"){
            const index = parseInt(event.target.name.slice(-1));
            var cloneUnit = [...this.state.dataUnit];
            cloneUnit[index] = event.target.value;
            this.setState({dataUnit:cloneUnit});
        } else {
            const index = parseInt(event.target.name.slice(-1));
            const clone = (event.target.name.slice(0,2) === "re")? [...this.state.reMag]:[...this.state.imPhase];
            clone[index] = event.target.value;
            this.setState({[event.target.name.slice(0,-1)]:clone});
        }
    }
    render() {
        var inputs = []
        for(let i = 0; i<this.state.inputCount; i++) {
            inputs.push(<div key = {i} className="impedance calcDiv">
                <input className = "real" name={"reMag" + i.toString()}
                    type="number" placeholder={(this.state.rep==="complex")?"Real":"Magnitude"} 
                    value={this.state.reMag[i]} onChange={this.handleChange}/>
                {(this.state.rep==="complex")?"+":"\u2220"}<input name={"imPhase" + i.toString()} 
                    type="number" placeholder={(this.state.rep==="complex")?"Imaginary":"\u0398 (Degrees)"} 
                    value={this.state.imPhase[i]} onChange={this.handleChange}/> j 
                <select className = "ComplexSelect" value={this.state.dataUnit[i]} 
                        name={"impedance"+i.toString()} onChange={this.handleChange}>
                    <option value={"MO"}>{"M\u03a9"}</option>
                    <option value={"kO"}>{"k\u03a9"}</option>
                    <option value={"O"}>{"\u03a9"}</option>
                    <option value={"mO"}>{"m\u03a9"}</option>
                    <option value={"uO"}>{"\u00b5\u03a9"}</option>
                    <option value={"nO"}>{"n\u03a9"}</option>
                </select></div>)
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
                    Representation: <select value={this.state.rep} name ="rep" onChange={this.handleChange}>
                        <option value="complex">Complex</option>
                        <option value="phasor">Phasor</option>
                    </select>
                </div>
                <div className="calcDiv">
                    Number of Impedances: <select value={this.state.inputCount} name ="inputCount" onChange={this.handleChange}>
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

export default ComplexInput;