import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { VideoHome } from './components/video-home';
import { AdminLogin } from './components/admin-login';
import { UserLogin } from './components/user-login';
import { UserDashBoard } from './components/user-dashboard';
import { UserRegister } from './components/user-register';
import { AdminDashboard } from './components/admin-dashboard';
import { AdminAddVideo } from './components/admin-add-video';
import { AdminEditVideo } from './components/admin-edit';
import { AdminDeleteVideo } from './components/admin-delete-video';

function App() {
  return (
    <div className='body-background'>
      <div className='bg-shade'>
          <h1 className='text-center text-white pt-4'> Technologies Video Library </h1>
          <BrowserRouter>

              <Routes>
                  <Route path='/' element={<VideoHome/>} />
                  <Route path='admin-login' element={<AdminLogin/>} />
                  <Route path='user-login' element={<UserLogin/>} />
                  <Route path='user-register' element={<UserRegister/>}/>
                  <Route path='user-dash' element={<UserDashBoard/>}/>
                  <Route path='admin-dash' element={<AdminDashboard/>} />
                  <Route path='add-video' element={<AdminAddVideo/>}/>
                  <Route path='edit-video/:id' element={<AdminEditVideo/>}/>
                  <Route path='delete-video/:id' element={<AdminDeleteVideo/>}/>
              </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
