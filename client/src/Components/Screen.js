import React from "react"
import {Container,Card,Row,Col} from "reactstrap";

class Screen extends React.Component {

    render() {
        var text = null;
        if(this.props.display === 0){text =<h1>0</h1>}
        else if(this.props.calcType === "Z" || this.props.calcType === "complex") {
            console.log("hello")
            const real = typeof(this.props.display.re)=="number"?this.props.display.re.toFixed(3):0;
            const imaginary = typeof(this.props.display.im)==="number"?this.props.display.im.toFixed(3):0;
            console.log(this.props.display);
            text = <h1>{real} + {imaginary}j</h1>
        }else {
            const real = this.props.display.re===null?0:this.props.display.re.toFixed(3);
            text = <h1>{real}</h1>
        }
        return <Container className="body">
            <Card>
                <Container>
                    <Row>
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