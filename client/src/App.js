import React from "react"
import CalculatorBody from "./Components/CalculatorBody"
import Menu from "./Components/Menu"
import CommentInput from "./Components/CommentInput"
import Comments from "./Components/Comments"
import {Container,Row,Col,Card} from "reactstrap";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      calcType : "Z"
    }
    this.getCalcType = this.getCalcType.bind(this);
  }

  getCalcType (identity) {
    this.setState({calcType : identity});
  }

  render() {
    return <div>
      <Container>
          <Row>
            <Col xs ="12"sm="9">
              <Card className = "body">
                <div className = "calculator">
                  <Container>
                    <CalculatorBody calcType = {this.state.calcType}/>
                  </Container>
                </div>
              </Card>
            </Col>
            <Col xs="12" sm="3">
              <Card className = "body">
                <div className = "body text-center">
                  <Menu getCalcType = {this.getCalcType}/>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 10, order: 2, offset: 1}}>
              <div className="body">
              <Card>
                <div className = "body text-center">
                  <Container>
                    <h1>Leave a Comment!</h1>
                    <hr></hr>
                    <CommentInput/>
                  </Container>
                </div>
              </Card>
              </div>
            </Col>
          </Row>
          <Comments/>
      </Container>  
  </div>
  }
}

export default App;