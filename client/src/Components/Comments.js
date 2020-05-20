import React from "react";
import axios from "axios";
import {Container,Row,Col,Card} from "reactstrap";

class Comments extends React.Component {

    constructor() {
        super()
        this.state = {
            comments:[]
        }
    }

    componentDidMount() {
        axios.get("/comments").then(response => 
            this.setState({comments:response.data.comments}));
    }

    render() {
        if(this.state.comments.length < 1) {
            return null;
        } else {
            var comments = []
            var count = -1;
            this.state.comments.forEach(comment => {
                count+=1;
                comments.push(<div key={"comment" + count}><Row>
                    <Col sm={{ size: 10, order: 2, offset: 1}}>
                        <div className = "commentBody">
                        <Card>
                            <Container>
                                <div className = "commentRow">
                                <Row>
                                    <Col>{comment.name}</Col>
                                    <Col><div className = "text-right">
                                        {Date(comment.toString()).substring(4,15)}
                                    </div></Col>
                                </Row>
                                </div>
                                <hr></hr>
                                <div className = "commentRow">
                                <Row>
                                    <Col>{comment.text}</Col>
                                </Row>
                                </div>
                            </Container>
                        </Card>
                        </div>
                    </Col>
                </Row></div>)
            })
            return comments.reverse();
        }
    }

}

export default Comments;