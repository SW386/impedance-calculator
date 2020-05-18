import React from "react";
import axios from "axios";

class CommentInput extends React.Component {
    constructor() {
        super()
        this.state = {
            name:"",
            text:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]:event.target.value});
    }
    handleSubmit(event) {
        console.log(this.state);
    }
    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div  className ="commentInput">
                    <div className="body"> 
                        Name: <input onChange={this.handleChange} name="name"></input>
                    </div>
                    <div className="body">
                        <textarea onChange={this.handleChange} name="text"></textarea>
                    </div>
                    <button className="btn btn-outline-info">Comment</button>
                </div>
            </form>
        </div>
    }
}

export default CommentInput