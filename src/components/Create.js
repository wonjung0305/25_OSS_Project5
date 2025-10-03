import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";

export default function Create() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [progress, setProgress] = useState(0);
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const updatedAt = new Date().toISOString();
  let history = useNavigate();

  const postData = () => {
    axios
      .post("https://68db331623ebc87faa323b92.mockapi.io/users", {
        firstName,
        lastName,
        checkbox,
        gender,
        updatedAt,
        phoneNumber
      })
      .then(() => {
        history("/read");
      });
  };

  const handleButtonClick = () => {
    // if (!checkbox) { // 체크 안해도 제출할 수 있게
    //   return;
    // }
    postData(); // Call the postData function
    setProgress(100); // Set the progress to 100
  };

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
      />
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name (Required)"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name (Required)"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Phone number</label>
          <input
            placeholder="Phone Number (Required)"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Field>

        {/* 이부분 데이터 보낼 수 있도록, 색깔도 바꿔야 됨 */}
        <Form.Field>
          <label>Gender</label>
          <select onChange={(e) => setGender(e.target.value)}>
            <option disabled selected hidden>Choose your gender (Required)</option>
            <option>male</option>
            <option>female</option>
            <option value={"N/A"}>private</option>
            
          </select>
        </Form.Field>


        <Form.Field>
          <Checkbox
            label="I agree to the collection and use of personal information"
            onChange={(e) => setCheckbox(!checkbox)}
            checked={checkbox}
          />
        </Form.Field>
        <Button
          type="submit"
          onClick={handleButtonClick}
          disabled={!(firstName && lastName && gender && phoneNumber)} //  무조건 입력
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
