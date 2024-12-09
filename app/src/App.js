import logo from './logo.svg';
import './App.css';
import GameClient from './components/GameClient';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameClient isDevMode={true}/>
      </header>
    </div>
  );
}

export default App;
