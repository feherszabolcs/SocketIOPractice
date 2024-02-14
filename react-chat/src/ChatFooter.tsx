import { useState } from 'react'

const ChatFooter = ({ socket }: any) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        socket.emit('send-message', { content: message })
        console.log(message)
        setMessage('')
    };
    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
}

export default ChatFooter