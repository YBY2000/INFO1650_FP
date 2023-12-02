import React, { useEffect } from 'react';
import './index.sass'; // Import the CSS file for styling
import useRequest from '../../hooks/useRequest';
import { Table,Space,Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';


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
        width: 100, // 设置列宽
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'Attraction ID',
        dataIndex: 'attractionid',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.attractionid - b.attractionid,
      },
  {
    title: 'Attraction Name',
    dataIndex: 'name',
    width: 300, // 设置列宽
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Comments',
    dataIndex: 'usercomments',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.usercomments - b.age,
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
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'G',
            value: 'G',
          },
          {
            text: 'B',
            value: 'B',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.email.indexOf(value) === 0,
    sorter: (a, b) => a.email.length - b.email.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Attraction Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 200,
    render: () => <div><a>Delete</a>,<a>Save</a>,<a>Edit</a></div>
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

return(

    <Table columns={columns} dataSource={data} onChange={onChange} scroll={{x: 1500,}}/>
)
}

const data = [
    {
      key: '1',
      id:'1',
      attractionid:'10',
      name: 'John Brown',
      age: 32,
      usercomments:10,
      email:'zhjhk@126.com',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      id:'2',
      attractionid:'20',
      name: 'Jim Green',
      age: 42,
      usercomments:20,
      email:'zGreenhk@126.com',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      id:'3',
      attractionid:'30',
      name: 'Joe Black',
      age: 32,
      usercomments:30,
      email:'BUk@163.com',
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      id:'4',
      attractionid:'40',
      name: 'Jim Red',
      age: 32,
      usercomments:50,
      email:'zGreenhk@163.com',
      address: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        id:'5',
        attractionid:'50',
        name: 'Walker Green',
        age: 52,
        usercomments:60,
        email:'zGreenhk@gmail.com',
        address: 'Beijing No. 2 Lake Park',
      },
  ];

export default Contact;
