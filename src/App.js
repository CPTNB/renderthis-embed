import logo from './logo.svg';
import './App.css';
import EmbedLink from './lib/components/EmbedLink';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EmbedLink id="logothing">
          <img src={logo} className="App-logo" alt="logo" />
        </EmbedLink>
      </header>
    </div>
  );
}

export default App;
