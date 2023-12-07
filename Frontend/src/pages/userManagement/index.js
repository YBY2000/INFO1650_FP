import React, { useState, useEffect } from 'react'
import './index.sass' // Import the CSS file for styling
import useRequest from '../../hooks/useRequest'
import { Table, Space, Input, Button, Select, Form, Row, message } from 'antd'
import moment from 'moment';


const countryOptions = [
  {
    label: 'United States',
    value: 0,
  },
  {
    label: 'Canada',
    value: 1,
  },
  {
    label: 'United Kingdom',
    value: 2,
  },
  {
    label: 'Germany',
    value: 3,
  },
  {
    label: 'France',
    value: 4,
  },
  {
    label: 'Australia',
    value: 5,
  },
  {
    label: 'Japan',
    value: 6,
  },
  {
    label: 'South Korea',
    value: 7,
  },
  {
    label: 'China',
    value: 8,
  },
  {
    label: 'India',
    value: 9,
  },
  {
    label: 'Brazil',
    value: 10,
  },
  {
    label: 'Mexico',
    value: 11,
  },
  {
    label: 'Italy',
    value: 12,
  },
  {
    label: 'Spain',
    value: 13,
  },
  {
    label: 'Russia',
    value: 14,
  },
  {
    label: 'South Africa',
    value: 15,
  },
  {
    label: 'Egypt',
    value: 16,
  },
  {
    label: 'Nigeria',
    value: 17,
  },
  {
    label: 'Argentina',
    value: 18,
  },
  {
    label: 'Sweden',
    value: 19,
  },
]

const InterestsOptions = [
  {
    value: 0,
    label: 'City views',
  },
  {
    value: 1,
    label: 'Natural views',
  },
  {
    value: 2,
    label: 'Historical sites',
  },
  {
    value: 3,
    label: 'Cultural scenes',
  },
  {
    value: 4,
    label: 'Adventure and sports',
  },
]

const Contact = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState()
  const [emailFilter, setEmailFilter] = useState()
  const [queryParams, setQueryParams] = useState()

  const { request, isLoading, error } = useRequest('/user', {
    method: 'POST',
  })
  const { request: deleteUser } = useRequest('/user/delete', {
    method: 'DELETE',
  })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
    },
    {
      title: 'User Name',
      dataIndex: 'fullName',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.fullName.indexOf(value) === 0,
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: (txt, row) => (row.gender ? <>male</> : <>female</>),
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
      render: (txt, row) => {
        return countryOptions.find((c) => c.value == txt)?.label || ''
      },
    },
    // {
    //   title: 'Comments Count',
    //   dataIndex: 'usercomments',
    //   defaultSortOrder: 'descend',
    //   sorter: (a, b) => a.usercomments - b.age,
    // },
    {
      title: 'Creation Time',
      dataIndex: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: (text) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    
    {
      title: 'E-mail',
      dataIndex: 'email',
      filters: emailFilter,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Interests',
      dataIndex: 'interest',
      render: (row, text) => {
        return row
          .map((r) => InterestsOptions.find((i) => i.value == r).label)
          .join(',')
      },
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (txt, row) => (
        <div>
          <a
            onClick={() => {
              deleteRow(row)
            }}
          >
            Delete
          </a>
        </div>
      ),
    },
  ]

  const fetchData = async () => {
    const res = await request(queryParams || {})
    if (!error) {
      setData(res.data.users)
      const emailfilter = res.data.users.map((u) => {
        return {
          text: u.email,
          value: u.email,
        }
      })
      setEmailFilter(emailfilter)
    }
  }

  const deleteRow = (row) => {
    deleteUser({ email: row.email }).then((res) => {
      message.success(res.message)
      fetchData()
    })
  }

  const search = () => {
    const queryParams = form.getFieldsValue()
    setQueryParams(queryParams)
  }

  const reset = () => {
    form.resetFields()
  }

  useEffect(() => {
    if (queryParams) {
      fetchData()
    }
  }, [queryParams])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Space
        style={{
          margin: '20px 50px',
        }}
      >
        <Form form={form} layout='inline'>
          <Row>
            <Form.Item label='Email' name='email'>
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item label='Full Name' name='fullName'>
              <Input placeholder='Full Name' />
            </Form.Item>
            <Form.Item label='Min Age' name='minAge'>
              <Input placeholder='MinAge' />
            </Form.Item>
            <Form.Item label='Max Age' name='maxAge'>
              <Input placeholder='MaxAge' />
            </Form.Item>
            <Form.Item label='Gender' name='gender'>
              <Select
                style={{ minWidth: 120 }}
                options={[
                  {
                    value: 1,
                    label: 'Male',
                  },
                  {
                    value: 0,
                    label: 'Female',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label='Country' name='country'>
              <Select style={{ minWidth: 120 }} options={countryOptions} />
            </Form.Item>
            <Form.Item label='User Type' name='userType'>
              <Select
                style={{ minWidth: 120 }}
                options={[
                  {
                    value: 1,
                    label: 'Admin', //1 -- admin  0--normal user
                  },
                  {
                    value: 0,
                    label: 'Normal User', //1 -- admin  0--normal user
                  },
                ]}
              />
            </Form.Item>
          </Row>
          <Row>
            <Button style={{ width: '120px' }} type='primary' onClick={search}>
              Search
            </Button>
            <Button
              style={{ width: '120px', marginLeft: '10px' }}
              type='primary'
              onClick={reset}
            >
              Reset
            </Button>
          </Row>
        </Form>
      </Space>
      <Table
        rowKey='userId'
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />
    </>
  )
}

export default Contact
