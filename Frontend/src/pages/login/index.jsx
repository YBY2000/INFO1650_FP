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
  const handleLogin = async (values) => {
    const { email, password } = values;
    const requestBody = { email, password };

    try {
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
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('avatar', data.data.user.avatar);
        localStorage.setItem('fullName', data.data.user.fullName);
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

  const handleSignUp = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        console.log(decodedToken)
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    }, 60000);
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
