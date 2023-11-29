import React, { useEffect } from 'react';
import './index.css'; // Import the CSS file for styling
import useRequest from '../../hooks/useRequest';

const Contact = () => {
  const { request, isLoading, error } = useRequest('/user/getAll', { method: 'GET' });
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

  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Us</h1>

      <div className="contact-info">
        <div className="contact-item">
          <strong>Name:</strong> Likun
        </div>
        <div className="contact-item">
          <strong>Email:</strong> <a href="mailto:likun9452@gmail.com">likun9452@gmail.com</a>
        </div>
        <div className="contact-item">
          <strong>Phone:</strong> 781-957-8803
        </div>
        <div className="contact-item">
          <strong>Address:</strong> 190 Pleasant Street, Malden, 02148, MA
        </div>
      </div>
    </div>
  );
};

export default Contact;
