import React, { useEffect } from 'react';
import './index.sass'; // Import the CSS file for styling
import useRequest from '../../hooks/useRequest';
import { Table,Space,Input,Badge } from 'antd';
import { AudioOutlined } from '@ant-design/icons';


const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];

const Contact = () => {
  const { request, isLoading, error } = useRequest('/user/getAll', { method: 'GET' });
  //get/POst
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

  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Comment_ID',
        dataIndex: 'commentID',
        key: 'commentID',
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: 'Post Data',
        dataIndex: 'postDate',
        key: 'postDate',
      },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="enable" />,
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
          </Space>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        postDate: '2014-12-24 23:12:00',
        content: 'This is production name',
        commentID: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns = [
    {
      title: 'Attraction ID',
      dataIndex: 'attractionID',
      key: 'attractionID',
    },
    {
      title: 'Commentscount',
      dataIndex: 'commentsCount',
      key: 'commentsCount',
    },
    {
      title: 'Latest Comment creation time:',
      dataIndex: 'latestCommentCreationTime',
      key: 'latestCommentCreationTime',
    },
    {
      title: 'User Email',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   render: () => <a>Publish</a>,
    // },
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      attractionID: '0028555230',
      commentsCount: '60',
      latestCommentCreationTime: '10.3.4.5654',
      email:'zGreenhk@163.com',
    });
  }
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
      />
    </>
  );
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
