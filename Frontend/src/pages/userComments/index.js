import React, { useEffect, useState } from 'react'
import './index.sass' // Import the CSS file for styling
import useRequest from '../../hooks/useRequest'
import { Table, Space, Badge, message } from 'antd'

const mockData =  [{
  id: 2,
  name: 'City',
  comments_count: '30',
  latest_comment_time: '10.3.4.5654',
  official_tel: 'zGreenhk@163.com',
  details: [
    {
      review_id: 0,
      review_time: '2014-12-24 23:12:00',
      detailed_review: 'This is production 1',
      status: 1,
    },
    {
      review_id: 1,
      review_time: '2014-12-24 23:12:00',
      detailed_review: 'This is production 2',
      status: 0,
    },
    {
      review_id: 2,
      review_time: '2014-12-24 23:12:00',
      detailed_review: 'This is production 3',
      status: 0,
    },
  ],
}]

const Contact = () => {
  const [data, setData] = useState()
  const { request, isLoading, error } = useRequest('/attraction/getListInfo', {
    method: 'GET',
  })
  const { request: switchStatus } = useRequest('/comment/updateStatus', {
    method: 'GET',
  })

  const fetchData = async () => {
    const res = await request()
    if (!error) {
      setData(res.data.attractions)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: 'Attraction ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Attraction Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Comments Count',
      dataIndex: 'comments_count',
      key: 'comments_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.comments_count - b.comments_count,
    },
    {
      title: 'Latest Comment creation time:',
      dataIndex: 'latest_comment_time',
      key: 'latest_comment_time',
    },
    {
      title: 'Official Tel',
      dataIndex: 'official_tel',
      key: 'official_tel',
    },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   render: () => <a>Publish</a>,
    // },
  ]

  const expandedRowRender = (e) => {
    const columns = [
      {
        title: 'Comment_ID',
        dataIndex: 'review_id',
        key: 'review_id',
      },
      {
        title: 'Content',
        dataIndex: 'detailed_review',
        key: 'detailed_review',
      },
      {
        title: 'Post Data',
        dataIndex: 'review_time',
        key: 'review_time',
      },
      {
        title: 'Status',
        key: 'status',
        render: (row) =>
          !Number(row.status) ? (
            <Badge status='error' text='disable' />
          ) : (
            <Badge status='success' text='enable' />
          ),
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, row) => (
          <Space size='middle'>
            <a
              onClick={() => {
                switchStatus(null, { review_id: row.review_id }).then((res) => {
                  message.success(res.message)
                  fetchData()
                })
              }}
            >
              Switch
            </a>
          </Space>
        ),
      },
    ]
    return (
      <Table
        rowKey='review_id'
        columns={columns}
        dataSource={e.details}
        pagination={false}
      />
    )
  }

  return (
    <>
      <Table
        rowKey='id'
        loading={isLoading}
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={data}
      />
    </>
  )
}

export default Contact
