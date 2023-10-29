import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import MainContainer from './components/MainContainer';
import Welcome from './components/Welcome';
import Users from './components/Users';
import Groups from './components/Groups';
import CreateBet from './components/CreateBet';
import Bets from './components/Bets';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<MainContainer/>}>
          <Route path="welcome" element={<Welcome/>}></Route>
          <Route path="users" element={<Users/>}></Route>
          <Route path="groups" element={<Groups/>}></Route>
          <Route path="create-bet" element={<CreateBet/>}></Route>
          <Route path="bets" element={<Bets/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
