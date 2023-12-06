
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './profile-dropdown.style.css'; // Import the CSS file for styling
import { Badge, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';


const ProfileDropdown = () => {
    const navigate = useNavigate();
    const pageSwitch = (path) => {
        navigate(`/${path}`);
    };

    const { isAuthenticated, avatar, username, email, userType } = useAuth();

    const handleLogout = () => {
        
    };



    return (
        <div className='profile-container'>
            <Dropdown className='dropdown-box'>
                <Dropdown.Toggle variant="light" id="profile-dropdown">
                    <Badge count={100} overflowCount={99}>
                        <Avatar src={avatar} alt="avatar" width="50" height="50" shape="circle" size="large" />
                    </Badge>
                    <span className="profile-name">
                        {username}
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdwon-menu' placement="bottom">
                    <Dropdown.Item href="#action/3.2">
                        <p className='profile-info'><h5>{username}</h5></p>
                        <p className='profile-info'><b><i>{email}</i></b></p>

                    </Dropdown.Item>
                    <Dropdown.Divider />



                    {(userType === 1) ? (
                        <div>
                            <Dropdown.Item>
                                <EditOutlined width="14" height="14" className='icon' onClick={() => { pageSwitch('userComments') }}/>Manage Comment
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <EditOutlined width="14" height="14" className='icon' onClick={() => { pageSwitch('userManagement') }}/>Manage User
                            </Dropdown.Item>
                        </div>
                    ) : (
                        <Dropdown.Item>
                            <EditOutlined width="14" height="14" className='icon' />Edit Profile
                        </Dropdown.Item>
                    )}

                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <LogoutOutlined width="14" height="14" className='icon' />LOGOUT
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div >

    );

}

export default ProfileDropdown;