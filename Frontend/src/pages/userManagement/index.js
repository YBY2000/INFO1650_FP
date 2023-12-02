import React, { useState,useEffect } from 'react';
import './index.sass'; // Import the CSS file for styling
import useRequest from '../../hooks/useRequest';
import { Table,Space,Input,Button,Select } from 'antd';
import { AudioOutlined} from '@ant-design/icons';

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const { Search } = Input;
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  const onSearch = (value, _e, info) => console.log(info?.source, value);

const Contact = () => {
  const { request, isLoading, error } = useRequest('/user/getAll', { method: 'GET' });
  //get/POst
  const fetchData = async () => {
    const dataList = await request();
    if (!error) {
    }
  };

  

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;



  
  const columns = [
      {
          title: 'ID',
          dataIndex: 'id',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.id - b.id,
        },
    {
      title: 'User Name',
      dataIndex: 'name',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Country',
      dataIndex: 'country',
    },
    {
      title: 'Comments Count',
      dataIndex: 'usercomments',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.usercomments - b.age,
    },
    {
      title: 'Creation Time',
      dataIndex: 'creationtime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.creationtime - b.creationtime,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      filters: [
        {
          text: 'gmail',
          value: 'gmail',
        },
        {
          text: '126',
          value: '126',
        },
        {
          text: '163',
          value: '163',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Interests',
      dataIndex: 'interest',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: () => <div><a>Edit</a>  /  <a>Delete</a></div>
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return(
<>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Input placeholder="Email" />
        <Input placeholder="Full Name" />
        <Input placeholder="MinAge" />
        <Input placeholder="MaxAge" />
        <Select
          defaultValue="gender"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'gender',
              label: 'Gender',
            },
          ]}
        />
        <Select
          defaultValue="country"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'country',
              label: 'Country',
            },
          ]}
        />
        <Select
          defaultValue="usertype"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'usertype',
              label: 'Usertype', //1 -- admin  0--normal user
            },
          ]}
        />
        <Button type="primary">Search</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>)
}

const data = [
    {
      key: '1',
      id:'1',
      name: 'John Brown',
      age: 32,
      usercomments:10,
      email:'zhjhk@126.com',
      address: 'New York No. 1 Lake Park',
      creationtime:'153135',
      gender:'1',
      country:'CN',
      description:'XXXXXXXXXXXXX',
      interest:'0',

    },
    {
      key: '2',
      id:'2',
      name: 'Jim Green',
      age: 42,
      usercomments:20,
      email:'zGreenhk@126.com',
      address: 'London No. 1 Lake Park',
      creationtime:'153135',
      gender:'1',
      country:'CN',
      description:'XXXXXXXXXXXXX',
      interest:'0',
    },
    {
      key: '3',
      id:'3',
      name: 'Joe Black',
      age: 32,
      usercomments:30,
      email:'BUk@163.com',
      address: 'Sydney No. 1 Lake Park',
      creationtime:'153135',
      gender:'1',
      country:'CN',
      description:'XXXXXXXXXXXXX',
      interest:'0',
    },
    {
      key: '4',
      id:'4',
      name: 'Jim Red',
      age: 32,
      usercomments:50,
      email:'zGreenhk@163.com',
      address: 'London No. 2 Lake Park',
      creationtime:'153135',
      gender:'1',
      country:'CN',
      description:'XXXXXXXXXXXXX',
      interest:'0',
    },
    {
        key: '5',
        id:'5',
        name: 'Walker Green',
        age: 52,
        usercomments:60,
        email:'zGreenhk@gmail.com',
        address: 'Beijing No. 2 Lake Park',
        creationtime:'153135',
        gender:'1',
        country:'CN',
        description:'XXXXXXXXXXXXX',
        interest:'0',
      },
  ];

export default Contact;