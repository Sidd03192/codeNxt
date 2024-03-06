import { useState } from 'react';
import './chatgpt.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";
const systemMessage = {
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

export const ChatGPT = (props) => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am Gerboa! Click the arrow for help",
      sentTime: "just now",
      sender: "BrainFlow"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleHelpButtonClick = async () => {
    const currentQuestion = props.ca;

    const newMessage = {
      message: `Help me with the current question,but dont provide the answer, guide me in the right direction: ${currentQuestion}`,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        });

      if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
        return;
      }

      const data = await response.json();

      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error processing message to ChatGPT:', error);
    }
  }

  return (
    <div className="chatt">
      <div style={{ position: "relative", width: "700px" }}>
        <MessageList 
          scrollBehavior="smooth" 
          typingIndicator={isTyping ? <TypingIndicator content="BrainFlow is typing" /> : null}
        >
          {messages.map((message, i) => (
            <Message key={i} model={message} />
          ))}
        </MessageList>
        
        <button class="cool"         onClick={handleHelpButtonClick}
>
  <svg class="svgIcon" viewBox="0 0 384 512">
    <path
      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
    ></path>
  </svg>
</button>

      </div>
    </div>
  )
};
