import React from 'react'

function ChatMessage({text, isMessageOwner}) {
    
    const isOwner = (isMessageOwner ? 'sent' : 'received');

    return (
        <div className={`message ${isOwner}`}>
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage
