
import React, { useState, useEffect } from 'react';
import './MyComponent.css'; // Import file CSS

const MyComponent = () => {
  const [buttonColor, setButtonColor] = useState('');

  useEffect(() => {
    const fetchDataFromMongoDB = async () => {
      try {
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-zsywh/endpoint/get_auto');
        const data = await response.json();

        console.log('Data from MongoDB:', data);

        // Xử lý logic dựa trên giá trị mode
        if (data.length > 0 && data[0].mode === 'manual') {
          setButtonColor('green');
        } else {
          setButtonColor('red');
        }
      } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
      }
    };

    fetchDataFromMongoDB();
  }, []); // useEffect chỉ chạy một lần khi component được mount

  useEffect(() => {
    // Sự kiện này sẽ được gọi mỗi khi buttonColor thay đổi
    // Cập nhật màu nền của nút dựa trên giá trị mới của buttonColor
    const buttonElement = document.querySelector('.my-button');
    if (buttonElement) {
      buttonElement.style.backgroundColor = buttonColor;
    }
  }, [buttonColor]);

  

  const handleClick = () => {
    setButtonColor((prevColor) => (prevColor === 'red' ? 'green' : 'red'));
  };

  return (
    <div>
      <button className={`my-button ${buttonColor}`} onClick={handleClick}>
        Click để chuyển màu
      </button>
      <p>Màu hiện tại: {buttonColor}</p>
    </div>
  );
};

export default MyComponent;
