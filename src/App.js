import './App.css';
import Index from './pages/index';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001")

function App() {
  return (
    <div className="App">
      <Index socket={socket} />
    </div>
  );
}

export default App;
