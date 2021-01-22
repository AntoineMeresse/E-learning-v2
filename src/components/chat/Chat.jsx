import React, {useState} from 'react'
import './Chat.css'

function Chat() {
    
    const [formValue, setFormValue] = useState('');
    
    return (
        <div className="chat-collectif">
            <div className="chat-top">
                <h3>Chat Collectif</h3>
                <hr></hr>
            </div>
            <div className="chat-messages">

            </div>
            <form className="chat-form" onSubmit={null}>
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
