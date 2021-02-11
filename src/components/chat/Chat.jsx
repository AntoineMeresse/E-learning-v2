import React, {useState, useRef} from 'react'
import './Chat.css'

import { useAuth } from '../../contexts/AuthContext'
import {useCollectionData} from 'react-firebase-hooks/firestore';

import ChatMessage from './ChatMessage';

function Chat({userName}) {
    
    const [formValue, setFormValue] = useState('');

    const { currentUser, messagesRef, query, firestoreTimestamp } = useAuth();
    const [messages] = useCollectionData(query);

    const bottomChat = useRef();
    
    async function sendMessage(event) {
        event.preventDefault();
        
        const { uid } = currentUser;

        await messagesRef.add(
            {
                text : formValue,
                createdAt: firestoreTimestamp,
                uid,
                userName
            }
        );
        setFormValue('');

        bottomChat.current.scrollIntoView({ behavior : 'smooth'});
    }

    return (
        <div className="chat-collectif">
            <div className="chat-top">
                <h3>Chat Collectif</h3>
            </div>
            <div className="chat-messages">
                <span ref={bottomChat}></span>
                { messages &&
                    messages.map((message, index) => <ChatMessage key={index} text={message.text} isMessageOwner={currentUser.uid === message.uid } userName={message.userName}/>)
                }
            </div>
            <form className="chat-form" onSubmit={sendMessage}>
                <input 
                    value={formValue} 
                    onChange={(event) => setFormValue(event.target.value)}
                    placeholder="Write your message here"
                />
                <button type="submit" disabled={!formValue}>→</button>
            </form>
        </div>
    )
}

export default Chat;
