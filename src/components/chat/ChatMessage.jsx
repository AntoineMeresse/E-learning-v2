import React from 'react'
import './ChatMessage.css'

function ChatMessage({text, isMessageOwner, userName}) {
    
    const isOwner = (isMessageOwner ? 'sent' : 'received');

    return (
        <div className={`message ${isOwner}`}>
            <p>
                { !isMessageOwner && 
                    <span>{userName} : </span>
                }
                {text}
            </p>
        </div>
    )
}

export default ChatMessage
