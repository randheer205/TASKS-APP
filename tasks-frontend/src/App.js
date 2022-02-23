import './App.css';
import  Signin  from './pages/signin.pages';
import  Signup  from './pages/signup.pages';
import  Profile  from './pages/profile.pages';
import  Taskcreate  from './pages/task.create.pages';
import  Taskdetails  from './pages/task.details.pages';      
import  Tasklist  from './pages/task.list.pages';            
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <h1 className="header">TASKS</h1>
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<Signup/>}></Route>
          <Route path="signin" element={<Signin/>}></Route>
          <Route path="profile" element={<Profile/>}></Route>
          <Route path="task-create" element={<Taskcreate/>}></Route>
          <Route path="task-details" element={<Taskdetails/>}></Route>
          <Route path="task-list" element={<Tasklist/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
