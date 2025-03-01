const MessageItem = (props:any) => {
  const {message} = props;
  const msgClass = message.sender === "User" ? "justify-end": "justify-start"
  const messageBg = message.sender === "User" ?"bg-blue-500": "bg-purple-600" 
  return (
    <div className={`flex items-center space-x-2 ${msgClass}`}>
      <span className="text-xs text-gray-500">Today, 8:58pm</span>
      <div className={`${messageBg} text-white p-2 rounded-lg`}>
        {message.text}
      </div>
    </div>
  );
};

export default MessageItem;
