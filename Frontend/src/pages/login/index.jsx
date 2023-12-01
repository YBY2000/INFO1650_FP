import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [formValidated, setFormValidated] = useState(false);
  const navigate = useNavigate();

  // 模拟从 API 获取用户数据
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("../../mock/user.json");
        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormValidated(true);

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // 用户验证逻辑
      const user = users.find(user => user.account === email && user.passcode === password);
      console.log(users);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/about'); // 用 navigate 替代 window.location.href
      } else {
        // 显示登录错误信息
        alert('Invalid account or password.'); // 这里用 alert 示意，可以替换为更复杂的错误消息显示逻辑
      }
    }
  };

  const handleBack = () => {
    navigate('/home'); // 用 navigate 替代 window.location.href
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <form 
            className={`needs-validation ${formValidated ? 'was-validated' : ''}`} 
            noValidate
            onSubmit={handleLogin}
          >
            <div className="mb-3">
              <label htmlFor="inputEmail3" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="inputEmail3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword3" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="inputPassword3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Log in</button>
            <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
