
import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './profile-dropdown.style.css'; // Import the CSS file for styling
import { Badge, Avatar } from 'antd';
import { useNavigate, useEffect } from 'react-router-dom';
import { UsergroupAddOutlined, CommentOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';


const ProfileDropdown = () => {
    const navigate = useNavigate();

    const pageSwitch = (path) => {
        navigate(`/${path}`);
    };

    const { isAuthenticated, avatar, username, email, userType } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        
        console.log(email);
        
        navigate('/login');
    };



    return (
        <div className='profile-container'>
            <Dropdown className='dropdown-box'>
                <Dropdown.Toggle variant="light" id="profile-dropdown">
                    {/* <Badge count={100} overflowCount={99}>
                        <img src={process.env.PUBLIC_URL + '/profile.jpg'} alt="avatar" width="50" height="50" size="large" />
                    </Badge> */}

                    <Badge count={100}>
                        <Avatar shape="square" size="large" />
                        {/* <img src={process.env.PUBLIC_URL + '/profile.jpg'} alt="avatar" width="40" height="40" size="large" className='profile-avatar'/> */}
                    </Badge>
                    <span className="profile-name">
                        {username}
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdwon-menu' placement="bottom">
                    <Dropdown.Item href="#action/3.2">
                        <p className='profile-info'>{username}</p>
                        <p className='profile-email'><b><i>{email}</i></b></p>

                    </Dropdown.Item>
                    <Dropdown.Divider />



                    {(userType === 1) ? (
                        <div>
                            <Dropdown.Item onClick={() => { pageSwitch('userComments') }}>
                                <EditOutlined width="14" height="14" className='icon' />Manage Comment
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { pageSwitch('userManagement') }}>
                                <UsergroupAddOutlined width="14" height="14" className='icon' />Manage User
                            </Dropdown.Item>
                        </div>
                    ) : (
                        <Dropdown.Item>
                            <CommentOutlined width="14" height="14" className='icon' />Edit Profile
                        </Dropdown.Item>
                    )}

                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => { handleLogout() }}>
                        <LogoutOutlined width="14" height="14" className='icon' />LOGOUT
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div >

    );

}

export default ProfileDropdown;