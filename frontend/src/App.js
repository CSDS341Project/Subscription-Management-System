import './App.css';
import Login from './login';
import HomePage from './Home';
import ws from './socketConfig'
import { BrowserRouter, Route, Routes, } from 'react-router-dom';


function App() {
  ws.on('message', function(message) {
    if (message['login'] === 'successful') {
      window.location = "/home"
    }
    else if (message['login'] === 'failed') {
      console.log("Login failed.");
  }
});
  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter basename="/">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomePage />} />

              </Routes>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
