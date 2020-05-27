import React from "react"
import {Container,Card,Row,Col} from "reactstrap";

class Screen extends React.Component {

    constructor() {
        super()
        this.state = {
            representation:"complex"
        }
        this.handleChange = this.handleChange.bind(this);
        this.optimizeOutput = this.optimizeOutput.bind(this);
    }

    handleChange(event) {
        this.setState({representation:event.target.value});
    }

    optimizeOutput(numObject,calcType) {
        var unit = null;
        var newNumber = null;
        switch(calcType) {
            case "L":
                unit = "H"
                break
            case "C":
                unit = "F"
                break
            default:
                unit = "\u03A9"
        }
        if (calcType === "complex" || calcType === "Z") {
            if(numObject.mag > 1000000) {
                newNumber = {re:numObject.re/1000000, im:numObject.im/1000000, mag:numObject.mag/1000000}
                return {number:newNumber, unit:unit, prefix:"M"}
            } else if (numObject.mag > 1000) {
                newNumber = {re:numObject.re/1000, im:numObject.im/1000, mag:numObject.mag/1000}
                return {number:newNumber, unit:unit, prefix:"k"}
            } else if (numObject.mag > 1) {
                newNumber = {re:numObject.re, im:numObject.im, mag:numObject.mag}
                return {number:newNumber, unit:unit, prefix:""}
            } else if (numObject.mag > 0.001) {
                newNumber = {re:numObject.re/0.001, im:numObject.im/0.001, mag:numObject.mag/0.001}
                return {number:newNumber, unit:unit, prefix:"m"}
            } else if (numObject.mag > 0.000001) {
                newNumber = {re:numObject.re/0.000001, im:numObject.im/0.000001, mag:numObject.mag/0.000001}
                return {number:newNumber, unit:unit, prefix:"\u00B5"}
            } else {
                newNumber = {re:numObject.re/0.000000001, im:numObject.im/0.000000001, mag:numObject.mag/0.000000001}
                return {number:newNumber, unit:unit, prefix:"n"}
            }
        } else {
            if(numObject.re > 1000000) {
                return {number:numObject.re/1000000, unit:unit, prefix:"M"}
            } else if (numObject.re > 1000) {
                return {number:numObject.re/1000, unit:unit, prefix:"k"}
            } else if (numObject.re > 1) {
                return {number:numObject.re, unit:unit, prefix:""}
            } else if (numObject.re > 0.001) {
                return {number:numObject.re/0.001, unit:unit, prefix:"m"}
            } else if (numObject.re > 0.000001) {
                return {number:numObject.re/0.000001, unit:unit, prefix:"\u00B5"}
            } else {
                return {number:numObject.re/0.000000001, unit:unit, prefix:"n"}
            }
        }
    }

    render() {
        var text = null;
        var rep = null;
        if(this.props.display === 0){text =<h3>0</h3>}
        else if(this.props.calcType === "Z" || this.props.calcType === "complex") {
            var combine = null;
            var reMag = 0;
            var imPhase = 0;
            var prefix = "";
            var unit = "\u03A9";
            var suffix = null;
            if(this.state.representation === "phasor") {
                if (typeof(this.props.display.mag)==="number") {
                    const display = this.optimizeOutput(this.props.display,this.props.calcType);
                    reMag = display.number.mag.toFixed(3);
                    imPhase = this.props.display.phase.toFixed(3);
                    prefix = display.prefix;
                }
                combine = "\u2220"
                suffix = "\u00B0"
            }else{
                if (typeof(this.props.display.mag)==="number") {
                    const display = this.optimizeOutput(this.props.display,this.props.calcType);
                    reMag = display.number.re.toFixed(3);
                    imPhase = display.number.im.toFixed(3);
                    prefix = display.prefix;
                }
                combine = "+"
                suffix = "j"
            }
            text = <h3>{reMag+combine+imPhase+suffix} {prefix+unit}</h3>
            rep = (this.state.representation === "complex")?
            <button onClick = {this.handleChange} value="phasor" className="btn btn-outline-danger btn-sm">{"\u2102"}</button>:
            <button onClick = {this.handleChange} value="complex" className="btn btn-outline-danger btn-sm">{"\u0398"}</button>
        }else{
            if(this.props.display.re === null) {
                text = <h3>0</h3>
            }else {
                const real = this.optimizeOutput(this.props.display,this.props.calcType);
                text = <h3>{real.number.toFixed(3)} {real.prefix+real.unit}</h3>
            }
        }
        return <Container className="body">
            <Card>
                <Container>
                    <Row>
                        <Col xs = "1" className ="screen text-left">
                            <div className = "screenButton">
                                {rep} 
                            </div>
                        </Col>
                        <Col className ="screen text-right">
                            {text}
                        </Col>
                    </Row>
                </Container>
            </Card>
        </Container>
    }
}

export default Screen
