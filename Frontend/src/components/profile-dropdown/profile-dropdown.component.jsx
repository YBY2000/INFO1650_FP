
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './profile-dropdown.style.css'; // Import the CSS file for styling
import { Badge, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';



const ProfileDropdown = ({ user }) => {
    const navigate = useNavigate();
    const pageSwitch = () => {
        navigate(`/edit`);
    };

    return (
        <div className='profile-container'>
            <Dropdown className='dropdown-box'>
                <Dropdown.Toggle variant="light" id="profile-dropdown">
                    <Badge count={100} overflowCount={99}>
                        <Avatar src={process.env.PUBLIC_URL + '/profile.jpg'} alt="avatar" width="50" height="50" shape="circle" size="large" />
                    </Badge>
                    <span className="profile-name">
                        {/* {user.username} */}
                        username
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdwon-menu' placement="bottom">
                    <Dropdown.Item href="#action/3.2">
                        {/* {user.email} */}
                        <p className='profile-info'><h4>Username</h4></p>
                        <p className='profile-info'><b><i>name@email.com</i></b></p>
                        
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    <Dropdown.Item>
                        <EditOutlined width="14" height="14" onClick={() => { pageSwitch() }} className='icon' />Edit Profile
                    </Dropdown.Item>
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