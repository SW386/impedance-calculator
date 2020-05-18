import React from "react";
import ZInput from "./ZInput";
import RLCInput from "./RLCInput";
import ComplexInput from "./ComplexInput";
import Screen from "./Screen";
import {Container,Row,Col,Card} from "reactstrap";

class CalculatorBody extends React.Component {
    constructor() {
        super();
        this.state = {
            answer: 0,
            inputCount:2,
            type:"series",
        };
        this.getAnswer = this.getAnswer.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.getType = this.getType.bind(this);
        this.handleUnit = this.handleUnit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    getAnswer(data) {
        this.setState({answer:data});
    };

    getNumber(data) {
        this.setState({inputCount:data});
    }

    getType(data) {
        this.setState({type:data});
    }

    handleUnit (unit) {
        switch(unit.slice(0,1)){
            case "G":
                return 1000000000
            case "M":
                return 1000000
            case "k":
                return 1000
            case "m":
                return .001
            case 'u':
                return .000001
            case "n": 
                return .000000001
            default:
                return 1
        }
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    render() {
        var form = null;
        var imPath = "./assets/circuits/";
        if(this.props.calcType === "Z") {
            form = <div>
                <ZInput getAnswer = {this.getAnswer} getNumber ={this.getNumber} 
                        getType = {this.getType} handleUnit={this.handleUnit} type={this.state.type}/>
            </div>
            const circuitComponent = ["R","L","C"];
            var imName = "";
            if(typeof(this.state.inputCount) === 'number') {
                if(this.state.type==="series") {
                    imPath = imPath + "RLCseries.png";
                } else {
                    imPath = imPath + "RLCparallel.png";
                }
            } else {
                for(let i = 0; i<3; i++){
                    if(this.state.inputCount[i]!==0){
                        imName += circuitComponent[i];
                    }
                }
                if(imName===""){
                    imPath = imPath + "RLC" + this.state.type + ".png";
                }else {
                    imPath = imPath + ((imName.length===1)?imName + ".png" : imPath = imName + this.state.type + ".png");
                }
            }
        } else if (this.props.calcType === "complex") {
            form = <div>
                <ComplexInput getAnswer = {this.getAnswer} getNumber ={this.getNumber}
                            getType = {this.getType} handleUnit={this.handleUnit} type={this.state.type}/>
            </div>
            imPath = imPath + this.props.calcType + this.state.type + this.state.inputCount + ".png";
        } else {
            form = <div>
                <RLCInput getAnswer = {this.getAnswer} getNumber ={this.getNumber} calcType={this.props.calcType}
                        getType = {this.getType} handleUnit={this.handleUnit} type={this.state.type}/>
            </div>
            imPath = imPath + this.props.calcType + this.state.type + this.state.inputCount + ".png";
        }
        return <div>
            <Screen calcType={this.props.calcType} display = {this.state.answer}/>
            <Container  className = "body">
                <Card>
                    <Row>
                        <Col xs="8">
                            <Container className = "body">
                                {form}
                            </Container>
                        </Col>
                        <Col xs="4">
                            <Container className = "body">
                                <div className = "circuitFont">
                                    <h5 >Circuit:</h5>
                                </div>
                                <div className ="circuitDiv">
                                    <img className = "circuit" alt = "circuit" src={imPath}></img>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
        
    } 
}

export default CalculatorBody;