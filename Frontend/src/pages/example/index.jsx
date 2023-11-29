import React, { useEffect } from 'react';
import './index.css'; // Import the CSS file for styling
import useRequest from '../../hooks/useRequest';
import { Table } from 'antd';

const Contact = () => {
  const { request, isLoading, error } = useRequest('/user/getAll', { method: 'GET' });
  const fetchData = async () => {
    const dataList = await request();
    if (!error) {
      console.log(dataList);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Us</h1>

      <div className="contact-info">
        <div className="contact-item">
          <strong>Name:</strong> Likun
        </div>
        <div className="contact-item">
          <strong>Email:</strong> <a href="mailto:likun9452@gmail.com">likun9452@gmail.com</a>
        </div>
        <div className="contact-item">
          <strong>Phone:</strong> 781-957-8803
        </div>
        <div className="contact-item">
          <strong>Address:</strong> 190 Pleasant Street, Malden, 02148, MA
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default Contact;
