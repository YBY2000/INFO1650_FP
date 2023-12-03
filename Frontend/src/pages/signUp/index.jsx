import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// 获取文件的 Base64 编码
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const interests = [
    { id: 0, name: 'city views' },
    { id: 1, name: 'natural views' },
    { id: 2, name: 'historical sites' },
    { id: 3, name: 'Cultural scenes' },
    { id: 4, name: 'Adventure and sports' },
];

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: 1, // 默认为男性
        country: '',
        description: '',
        avatar: '',
        age: 25,
        interest: [],
    });
    const [countries, setCountries] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/country');
                if (response.data.success) {
                    setCountries(response.data.data.countries);
                }
            } catch (error) {
                console.error('获取国家列表失败', error);
                // 可以在此处处理错误，如设置错误消息状态
            }
        };

        fetchCountries();
    }, []);

    // 输入变化处理
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 兴趣选择处理
    const handleInterestChange = (e) => {
        const value = parseInt(e.target.value);
        const newInterests = formData.interest.includes(value)
            ? formData.interest.filter(i => i !== value)
            : [...formData.interest, value];
        setFormData(prev => ({
            ...prev,
            interest: newInterests
        }));
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = async ({ file }) => {
        if (file.status === 'done') {
            const base64 = await getBase64(file.originFileObj);
            setFormData({ ...formData, avatar: base64 });
        }
    };

    const handleCancel = () => setPreviewOpen(false);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    // 验证逻辑
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    const validateFirstName = (firstName) => /^[a-zA-Z ]{1,50}$/.test(firstName);
    const validateLastName = (lastName) => /^[a-zA-Z ]{1,50}$/.test(lastName);
    const validateDescription = (description) => /^[a-zA-Z ]{1,200}$/.test(description);
    const validateAge = (age) => age >= 15 && age <= 99;
    const validateInterests = (interests) => interests.every(i => i >= 0 && i <= 4);

    // 表单提交处理
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            alert('Invalid email address');
            return;
        }
        if (!validatePassword(formData.password)) {
            alert('The password is too weak. The password contains at least one digit, one lowercase letter, and one uppercase letter, and must contain at least eight characters');
            return;
        }
        if (!validateFirstName(formData.firstName)) {
            alert('Invalid first name');
            return;
        }
        if (!validateLastName(formData.lastName)) {
            alert('Invalid last name');
            return;
        }
        if (formData.country === '') {
            alert('Please select a country');
            return;
        }
        if (!validateDescription(formData.description)) {
            alert('Description format is invalid; Must be 1-200 letters');
            return;
        }
        if (!validateAge(formData.age)) {
            alert('Must be between 15 and 99 years old');
            return;
        }
        if (!validateInterests(formData.interest)) {
            alert('Invalid interest selection');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/user/create', formData);
            console.log(response.data);
            // 处理响应
        } catch (error) {
            console.error('提交表单时出错', error);
            // 错误处理
        }
    };

    // 渲染表单
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="邮箱" />
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="密码" />
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="名字" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="姓氏" />

            <div>
                <input type="radio" name="gender" value="0" checked={formData.gender === 0} onChange={handleInputChange} /> Female
                <input type="radio" name="gender" value="1" checked={formData.gender === 1} onChange={handleInputChange} /> Male
            </div>

            <select name="country" value={formData.country} onChange={handleInputChange}>
                <option value="">Please select a country</option>
                {countries.map(country => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                ))}
            </select>

            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="描述"></textarea>
            <Upload
                listType="picture-card"
                showUploadList={false}
                beforeUpload={() => false}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {formData.avatar ? <img src={formData.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} min="15" max="99" />

            <div>
                {interests.map(interest => (
                    <label key={interest.id}>
                        <input
                            type="checkbox"
                            name="interest"
                            value={interest.id}
                            checked={formData.interest.includes(interest.id)}
                            onChange={handleInterestChange}
                        />
                        {interest.name}
                    </label>
                ))}
            </div>

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default RegistrationPage;
