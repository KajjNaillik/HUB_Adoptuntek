import React, { Component } from 'react'
import { render } from "react-dom";
import moment from "moment"

class PostFormChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loaded: false,
            placeholder: "Loading",
            message: "",
            roomName: this.props.name
        };
        console.log("ctr");
    }

    messageChangeHandler = event => {
        this.setState({ message: "event.target.value" });
    };
    componentDidMount(){
        var chatSocket = new WebSocket(
            'ws://'
            + 'localhost:8000'
            + '/ws/chat/'
            + this.state.roomName
            + '/'
        )
        chatSocket.onopen = () => {
          console.log('connected')
          console.log(chatSocket)
          chatSocket.send(JSON.stringify({
            'command': 'fetch_messages',
            'room_id':  this.state.roomName
            }));
        }
        chatSocket.onmessage = e => {
            //var data = JSON.parse(e.data);
            //this.addMessage(data)
            var data = JSON.parse(e.data);
            if (data.command == "messages") {
                for (let msg of data.messages.reverse()) {
                    this.setState({ message: this.state.message + '\n' + msg.author + ': ' + msg.content });   
                }
            }
            else if (data.command == "new_message") {
                //var message = {text: data.content, date: data.utc_time};
                //message.date = moment(message.date).local().format('YYYY-MM-DD HH:mm:ss');

                //let updated_messages = [...this.state.messages];
                //updated_messages.push(message);
                
                this.setState({ message: this.state.message + '\n' + data.message.author + ': ' + data.message.content });
            }
            //this.setState({messages: updated_messages});
    
            //if (data.command == "new_message") {
            //document.querySelector('#chat-log').value += (data.message.author + ": " + data.message.content + '\n');
            //} else if (data.command == "messages") {
                //for (let message of data.messages) {
                    //document.querySelector('#chat-log').value += (message.author + ": " + message.content + '\n');
                //}
            //}
        }
        chatSocket.onclose = (e) => {
            console.error('Chat socket closed unexpectedly');
        }
        document.querySelector('#chat-message-input').focus();
        document.querySelector('#chat-message-input').onkeyup = (e) => {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#chat-message-submit').click();
            }
        };
        document.querySelector('#chat-message-submit').onclick = (e) => {
            var messageInputDom = document.querySelector('#chat-message-input');
            var message = messageInputDom.value;
            chatSocket.send(JSON.stringify({
                'message': message,
                'command': 'new_message',
                'from': 'Anonymous',
                'room_id':  this.state.roomName
            }));
            messageInputDom.value = '';
	    };
    }
/*
    render() {
        return (
          <div id="sidepanel">
            <div id="profile">
                <p>UserName</p>
            </div>
            <div className="message-input">
            <textarea id="chat-log" cols="65" rows="20"></textarea>
            <br />
            <input
                id="chat-message-input"
                type="text"
                size="40"
                placeholder="Write your message.."
            />
            <input id="chat-message-submit" type="button" value="Send" onClick={this.submitMessage}>
            </input>
            </div>
        </div>        
        )
    }
    */
    render() {
        return (
            <div>      
                {this.state.messages.map(function(item, i){
                    return <div key={i} id="message" className="card">    
                        <div className="cell large-4">{item.text}</div>
                        <div className="cell large-2 text-right"><small>{item.date}</small></div>
                        </div>
                    ;}
                )}
            <textarea id="chat-log" type="text" cols="65" rows="20" onChange={this.messageChangeHandler} value={this.state.message}/><br />
            <input id="chat-message-input" type="text" size="45"/>
            <input id="chat-message-submit" type="button" className="button" value="Send" />
            </div>
        );
    }
}

export default PostFormChat;
//const container = document.getElementById("root");
//render(<PostFormChat />, container);

//render(<PostFormChat/>,document.getElementById('root'));