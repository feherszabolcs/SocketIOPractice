import React from 'react'

const ChatBody = ({ messages }: any) => {
    console.log(messages)
    return (
        <>
            <header className="chat__mainHeader">
                <p>Hangout with Colleagues</p>
                <button className="leaveChat__btn">
                    LEAVE CHAT
                </button>
            </header>
            <div className="message__container">
                {messages.map((message: any) => {
                    <div className="message__chats">
                        <p className="sender__name">You</p>
                        <div className="message__sender">
                            <p>{message.content}</p>
                        </div>
                    </div>
                })}


                {/* <div className="message__chats">
                    <p>Other</p>
                    <div className="message__recipient">
                        <p>Hey, I'm good, you?</p>
                    </div>
                </div> */}

                {/*This is triggered when a user is typing*/}
            </div>
        </>
    )
}

export default ChatBody