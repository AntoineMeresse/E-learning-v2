import React, {useState} from 'react'
import './Chat.css'

import { useAuth } from '../../contexts/AuthContext'
import {useCollectionData} from 'react-firebase-hooks/firestore';

import ChatMessage from './ChatMessage';

function Chat() {
    
    const [formValue, setFormValue] = useState('');

    const { currentUser, messagesRef, query, firestoreTimestamp } = useAuth();
    const [messages] = useCollectionData(query);
    
    async function sendMessage(event) {
        event.preventDefault();
        
        const { uid } = currentUser;

        await messagesRef.add(
            {
                text : formValue,
                createdAt: firestoreTimestamp,
                uid
            }
        );
        setFormValue('');
    }

    return (
        <div className="chat-collectif">
            <div className="chat-top">
                <h3>Chat Collectif</h3>
                <hr></hr>
            </div>
            <div className="chat-messages">
                { messages &&
                    messages.map((message) => <ChatMessage text={message.text} isMessageOwner={currentUser.uid === message.uid }/>)
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
