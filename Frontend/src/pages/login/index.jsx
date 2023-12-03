import React, { useState, useRef } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const { request } = useRequest('/api/auth/login', { method: 'POST' }); // 更新请求 URL
  const formRef = useRef(null); // 创建一个 ref 来引用表单

  const handleLogin = async (e) => {
    e.preventDefault();

    // 使用 ref 检查表单的有效性
    if (formRef.current && !formRef.current.checkValidity()) {
      // 如果表单无效，显示错误消息
      formRef.current.classList.add('was-validated'); // Bootstrap 类用于显示验证错误
      return;
    }

    // 确保 email 和 password 不为空
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    // 准备请求体
    const requestBody = { email, password };

    try {
      // 发送 POST 请求到 API
      // 如果使用 axios，替换下一行为：
      // const response = await axios.post('http://localhost:3000/api/auth/login', requestBody);
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.success) {
        alert('Login successful!');
        localStorage.setItem('token', data.data.token);
        navigate('/home');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <>
      <div id="liveAlertPlaceholder"></div>

      <div id="backButtonContainer" className="backButtonContainer">
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="loginContainer">
        <div className="left">
          <h1>Login now</h1>
          <h1>To start your journey!</h1>
          <form className="needs-validation" noValidate onSubmit={handleLogin} ref={formRef}>
            <div className="mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                placeholder="xxx@xx.xxx"
                required
                pattern="^[a-zA-Z0-9._\\u002D]+@[a-zA-Z0-9._\\u002D]+\.[a-zA-Z]+"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword3"
                placeholder="At least 6 characters"
                required
                minLength="6"
                maxLength="50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Log in</button>
          </form>
        </div>
        <img src="../../../business-meeting.png" alt="Business Meeting" />
      </div>
    </>
  );
};

export default LoginPage;
