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
    message
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';

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
        gender: null,
        country: '',
        description: '',
        avatar: '',
        age: 0,
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
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    const validateName = (name) => /^[a-zA-Z ]{1,50}$/.test(name);

    const validateDescription = (description) => /^[a-zA-Z ]{1,200}$/.test(description);
    const validateAge = (age) => age >= 15 && age <= 99;
    const validateInterests = (interests) => interests.every(i => i >= 0 && i <= 4);


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
        if (!validateEmail(formData.email)) {
            message.error('Invalid email address');
            return;
        }
        if (!validatePassword(formData.password)) {
            message.error('The password is too weak. The password contains at least one digit, one lowercase letter, and one uppercase letter, and must contain at least eight characters');
            return;
        }
        if (!validateName(formData.firstName)) {
            message.error('Invalid first name');
            return;
        }
        if (!validateName(formData.lastName)) {
            message.error('Invalid last name');
            return;
        }
        if (!formData.gender) {
            message.error('Please select a gender');
            return;
        }

        if (!formData.country) {
            message.error('Please select a country');
            return;
        }

        if (!formData.description || !validateDescription(formData.description)) {
            message.error('Invalid description, description should be 1 to 200 letters');
            return;
        }
        if (!validateAge(formData.age)) {
            message.error('Must be between 15 and 99 years old');
            return;
        }
        if (!validateInterests(formData.interest)) {
            message.error('The selected interest is invalid');
            return;
        }
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
            console.error('error in submitting form', error);
            // 错误处理
        }
    };


    return (
        <div className="formContainer">
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
        </div>
    );
};

export default RegistrationPage;
