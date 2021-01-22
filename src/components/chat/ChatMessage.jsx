import React from 'react'

function ChatMessage({text, isMessageOwner, userName}) {
    
    const isOwner = (isMessageOwner ? 'sent' : 'received');

    return (
        <div className={`message ${isOwner}`}>
            <p>{userName} : {text}</p>
        </div>
    )
}

export default ChatMessage
