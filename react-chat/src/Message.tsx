const Message = ({ username, content }: any) => {
    return (
        <div className="message">
            <p className="message-username">{username}</p>
            <p className="message-text">{content}</p>
        </div>
    );
};

export default Message;