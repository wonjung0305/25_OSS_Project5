import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dropdown, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import axios from 'axios';

export default function Update() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [progress, setProgress] = useState(0);
  const [id, setID] = useState(null);
  const [gender, setGender] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  let history = useNavigate();

  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setFirstName(localStorage.getItem('First Name'));
    setLastName(localStorage.getItem('Last Name'));
    setCheckbox(localStorage.getItem('Checkbox Value') === 'true');
    setGender(localStorage.getItem('Gender'));
    setUpdatedAt(localStorage.getItem('Updated At'));
    setPhoneNumber(localStorage.getItem('Phone Number'));
  }, []);

  const updateAPIData = () => {

    const updatedDate = new Date().toISOString();

    axios.put(`https://68db331623ebc87faa323b92.mockapi.io/users/${id}`, {
      firstName,
      lastName,
      checkbox,
      gender,
      updatedAt: updatedDate,
      phoneNumber
    }).then(() => {
      history('/read')
    })
  }

  const genderOptions = [
    { key: 'm', text: 'Male', value: 'male'},
    { key: 'f', text: 'Female', value: 'female'},
    { key: 'p', text: 'Private', value: 'N/A'}
  ];

  const handleButtonClick = () => {
    // if(!checkbox){
    //   return;
    // }
    setProgress(100); // Set the progress to 100
    updateAPIData();  // Call the postData function
  }

  // 제출이 안되는 경우는 이름 성별을 입력하지 않았을 때
  const isFormInvalid = !(firstName && lastName && gender && phoneNumber);

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
      />
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input  placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <input  placeholder='Phone Number (Required)' value={phoneNumber} type='text' onChange={(e) => setPhoneNumber(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Gender</label>
          <Dropdown placeholder='Please choose your gender'
            fluid /* dropdown 컴포넌트가 전체 너비 차지하도록 */
            selection
            options={genderOptions}
            value={gender}
            onChange={(e,{value}) => setGender(value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' checked={checkbox}  onChange={() => setCheckbox(!checkbox)} />
        </Form.Field>
        <Button type='submit' onClick={handleButtonClick} disabled={isFormInvalid}>Update</Button>
      </Form>
    </div>
  )
}