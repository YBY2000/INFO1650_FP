import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

const RegistrationPage = () => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: 1,
        country: '',
        description: '',
        avatar: '',
        age: 25,
        interest: [],
    });
    const [countries, setCountries] = useState([]);
    const [fileList, setFileList] = useState([]);

    const interestsOptions = [
        { label: 'city views', value: 0 },
        { label: 'natural views', value: 1 },
        { label: 'historical sites', value: 2 },
        { label: 'Cultural scenes', value: 3 },
        { label: 'Adventure and sports', value: 4 },
    ];

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/country');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.success) {
                    setCountries(data.data.countries);
                }
            } catch (error) {
                console.error('获取国家列表失败', error);
            }
        };

        fetchCountries();
    }, []);


    const onInterestChange = (checkedValues) => {
        setFormData({ ...formData, interest: checkedValues });
    };

    const handleUploadChange = async ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
        if (file.status === 'done') {
            try {
                const base64 = await getBase64(file.originFileObj);
                setFormData({ ...formData, avatar: base64 });
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    // ...其他函数，例如 handleInputChange, handlePreview, handleChange...

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            // 处理响应
        } catch (error) {
            console.error('提交表单时出错', error);
            // 错误处理
        }
    };


    return (
        <Form
            form={form}
            layout="horizontal"
            onFinish={handleSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Email" name="email">
                <Input onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input.Password onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </Form.Item>
            {/* ...其他表单元素... */}
            <Form.Item label="First Name" name="firstName">
                <Input onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
                <Input onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
                <Radio.Group onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                    <Radio value={0}>Female</Radio>
                    <Radio value={1}>Male</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Country" name="country">
                <Select onChange={(value) => setFormData({ ...formData, country: value })}>
                    {countries.map(country => (
                        <Select.Option key={country.id} value={country.id}>{country.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/* ...其他表单元素... */}
            <Form.Item label="Description" name="description">
                <TextArea rows={4} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleUploadChange}
                    beforeUpload={() => false}
                >
                    {fileList.length < 1 && <PlusOutlined />}
                </Upload>
            </Form.Item>
            <Form.Item label="Age" name="age">
                <Input type="number" onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
            </Form.Item>
            <Form.Item label="Interests" name="interest">
                <Checkbox.Group options={interestsOptions} onChange={onInterestChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationPage;
