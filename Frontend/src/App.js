import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/aboutUs';
import Example from './pages/example';
import Jobs from './pages/jobs';
import Home from './pages/home';
import Layout from './components/layout';
import Login from './pages/login';
import UserManagement from './pages/userManagement';
import UserComments from './pages/userComments';
import Homepage from './pages/homepage/homepage.page';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Example />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/comments" element={<UserComments />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;