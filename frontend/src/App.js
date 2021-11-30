import logo from './logo.svg';
import './App.css';
import LoginPage from './login';
import ws from './socketConfig'
function App() {
  ws.on('message', function() {
    console.log("here");
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginPage></LoginPage>
        
      </header>
    </div>
  );
}

export default App;
