import ChatWindow from './components/ChatWindow.jsx';
import { ChatProvider } from './context/ChatContext.jsx';

const App = () => {
  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );
};

export default App;
