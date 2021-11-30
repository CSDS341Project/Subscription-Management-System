import logo from './logo.svg';
import './App.css';
import LoginPage from './login';
import ws from './socketConfig'
function App() {
  ws.on('message', function(message) {
    if (message['login'] === 'successful') {
      console.log(message);
    }
    else {
      console.log("Login failed.")
    }
  });



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
