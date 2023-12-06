import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Form, Input, Button, Checkbox, message } from 'antd';
import useRequest from '../../hooks/useRequest';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // const { request } = useRequest('/api/auth/login', { method: 'POST' }); // 更新请求 URL
  const formRef = useRef(null); // 创建一个 ref 来引用表单

  const handleLogin = async (values) => {
    const { email, password } = values;

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
        messageApi.success('Login successful!');
        console.log(data.data);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('avatar', data.data.user.avatar);
        localStorage.setItem('fullName', data.data.user.fullName);

        // 延迟跳转
        setTimeout(() => {
          navigate('/home');
        }, 3000); // 3000毫秒后跳转

      } else {
        messageApi.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      messageApi.error('An error occurred while logging in');
    }
  };

  // 跳转到注册页面的函数
  const handleSignUp = () => {
    navigate('/signup');
  };

  // 检查 token 是否过期
  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          navigate('/login'); // 重定向到登录页
        }
      }
    }, 60000); // 每分钟检查一次

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      {contextHolder}
      <div className="loginContainer">
        <Form
          form={form}
          name="loginForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, marginTop: 50 }}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '70%' }}
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button
              style={{ width: '70%', backgroundColor: 'white', borderColor: 'white', color: 'black' }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        {/* 图片元素 */}
        <img src="../../../business-meeting.png" alt="Business Meeting" className="loginImage" />
      </div>
    </>
  );
};

export default LoginPage;
