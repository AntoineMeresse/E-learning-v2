import React, {useState} from 'react'
import './Chat.css'

import { useAuth } from '../../contexts/AuthContext'
import {useCollectionData} from 'react-firebase-hooks/firestore';

function Chat() {
    
    const [formValue, setFormValue] = useState('');

    const { currentUser, messagesRef, query, firestoreTimestamp } = useAuth();
    const [messages] = useCollectionData(query, {idField: 'id'});
    
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
