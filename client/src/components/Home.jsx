import { React, useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import io from 'socket.io-client';
import './home.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import OnlineList from "./OnlineList";



const Home = ({ OnlineList }) => {

    const signinRef = useRef();
    const chatformRef = useRef();
    const chatdisplayRef = useRef();
    const singleMessageRef = useRef();
    const enteredChatRef = useRef();
    const onlineListRef = useRef();
    const { roomId } = useParams();
    const history = useHistory();
    const [socket] = useState(() => io(":8000"))
    const [chatmessage, setChatmessage] = useState("");
    const [username, setUserName] = useState("");
    const [room, setRoom] = useState("General");
    const [messages, setMessages] = useState([]);
    const [signinmessages, setSignInMessages] = useState([]);



    /*============================================*/

    const userNameInput = (e) => {
        setUserName(e.target.value);
    }

    const roomInput = (e) => {
        setRoom(e.target.value);
    }

    /*============================================*/

    const joinRoom = (e) => {
        e.preventDefault();
        const signinRefNode = signinRef.current;
        const chatformRefNode = chatformRef.current;
        const chatdisplayRefNode = chatdisplayRef.current;
        const onlineListRefNode = onlineListRef.current;
        const joinRoomData = {
            room: room,
            username: username
        }
        if (username !== "" && room !== "") {
            socket.emit('joinRoom', room)
            socket.emit('sendSignInMsg', joinRoomData)
            signinRefNode.style.display = 'none';
            chatformRefNode.style.display = 'inline-flex';
            chatdisplayRefNode.style.display = 'block';
            onlineListRefNode.style.display = 'block';
            // setSignInMessages(signinmsglist => [...signinmsglist, joinRoomData])
            history.push(`/${room}`)
        }
    };

    useEffect(() => {
        socket.on('receiveJoinRoomMsg', (signInData) => {
            setSignInMessages(signinmsglist => [...signinmsglist, signInData])
        })
    }, [socket])

    /*============================================*/

    const chatmessageInput = (e) => {
        setChatmessage(e.target.value)
    }

    const submitMessage = async (e) => {
        e.preventDefault();
        const enteredChatRefNode = enteredChatRef.current;

        if (chatmessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: chatmessage,
                time:
                    new Date(Date.now()).toLocaleTimeString(),
            };
            await socket.emit('sendchatmsg', messageData)
            setMessages(previousmessages => [...previousmessages, messageData])
            enteredChatRefNode.style.display = 'none';
            setChatmessage("");
        }
    };

    useEffect(() => {
        socket.on('receivechatmsg', (msgData) => {
            setMessages(previousmessages => [...previousmessages, msgData])
        });
    }, [socket]);

    /*============================================*/


    return (

        <div id="room-container">
            <div id="onlineList" ref={onlineListRef}>
                <OnlineList signinmessages={signinmessages} onlineListRef={onlineListRef}/>
            </div>
            <div id="chat-main-container">
                {roomId ?
                    <div id="chat-header">
                        <h4>Hi {username}! Welcome to the #{roomId} Chat! </h4>
                    </div>
                    : ''
                }

                <div id="chat-display-container" ref={chatdisplayRef} placeholder="Start chatting...">
                    <ScrollToBottom className='scroll-height'>
                        {

                            signinmessages.map(msg => (
                                msg.username === username?
                                    <p className="entered-chatroom" ref={enteredChatRef}>You have entered the {msg.room} chat room!</p>

                                    :

                                    <p className="entered-chatroom" ref={enteredChatRef}>{msg.username} has entered the {msg.room} chat with you...</p>

                            ))
                        }
                        {
                            room && username ?
                                messages.map(msgContent => (
                                    <div ref={singleMessageRef}>
                                        <div>
                                            <div className="message-content" id={username === msgContent.username ? "you" : "other"}>
                                                <p className="chat-message">{msgContent.message}</p>
                                            </div>
                                            <div className="message-meta" id={username === msgContent.username ? "youtime" : "othertime"}>
                                                <p className="chat-time">{msgContent.time}</p>
                                                <p className="chat-name">{msgContent.username}</p>
                                            </div>
                                        </div>
                                    </div>

                                ))
                                : ''
                        }
                    </ScrollToBottom>
                </div>

                <form id="signInForm" ref={signinRef} onSubmit={joinRoom}>
                    <label>Username:</label>
                    <input type='text' placeholder="Username.." onChange={userNameInput} value={username} />
                    <label>What would you like to chat about?</label>
                    <select onChange={roomInput} value={room} >
                        <option value="General">General</option>
                        <option value="Sports">Sports</option>
                        <option value="CelebrityGossip">Celebrity Gossip</option>
                        <option value="TechTalk">Tech Talk</option>
                    </select>
                    <button>Join Chat</button>
                </form>

                <form id="chatForm" ref={chatformRef} onSubmit={submitMessage}>
                    <input type="text" placeholder="Type Chat Message Here..." onChange={chatmessageInput} value={chatmessage} />
                    <button>Send</button>
                </form>
                {roomId ?
                    <div id="chat-footer">
                        <a href="/" onClick={(e) => { if (window.confirm("Are you sure you want to leave chat?")); }}>Leave Chat</a>
                    </div>
                    : ''
                }



                <ul class="background">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div >
    )
}
export default Home;