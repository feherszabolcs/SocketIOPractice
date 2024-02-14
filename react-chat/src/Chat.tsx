import React, { useEffect, useState } from 'react'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
const Chat = ({ socket }: any) => {

    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        socket.on('message-recieved', (data: any) => {
            setMessages([...messages, data])
        })
    }, [socket, messages])

    return (
        <div className='chat_main'>
            <ChatBody messages={messages} />
            <ChatFooter socket={socket} />
        </div>
    )
}

export default Chat