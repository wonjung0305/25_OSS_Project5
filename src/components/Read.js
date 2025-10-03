import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Read() {
  const [APIData, setAPIData] = useState([]);

  // ! 좌우 여백을 추가로 제공
  const containerStyle = {
    margin: "0 auto",

    maxWidth: "1400px", // 최대 너비 1400px
    boxSizing: "border-box", // 패딩이 너비를 초과하지 않도록
  };

  // ! 흰색 테이블 부분 크기 늘려야함
  const tableStyle = {
    fontSize: "1.4rem", // 내용 크기 늘림
    padding: "0.8rem 1.2rem", // 흰색 여백 여유롭게

    width: "100%"
  };

  useEffect(() => {
    axios
      .get("https://68db331623ebc87faa323b92.mockapi.io/users")
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  const setData = (data) => {
    let { id, firstName, lastName, checkbox, gender, updatedAt, phoneNumber } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox);
    localStorage.setItem("Gender", gender); // localStorage에 저장
    localStorage.setItem("Updated At", updatedAt); // 자동 저장 값
    localStorage.setItem("Phone Number", phoneNumber);
  };

  const onDelete = (id) => {
    axios
      .delete(`https://68db331623ebc87faa323b92.mockapi.io/users/${id}`)
      .then(() => {
        getData();
      });
  };

  const getData = () => {
    axios
      .get(`https://68db331623ebc87faa323b92.mockapi.io/users`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  // 버튼 셀 높낮이 조절
  const buttonCellStyles = {
    verticalAlign: "middle",
    position: "relative",
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem'
  }

  // 버튼 높이 조금 더 세밀하게 조절
  const buttonStyles = {
    position: 'relative',
    top: '-0.5rem'
  }

  // 행 가독성을 위해 색깔 부여
  const rowColor = {
    backgroundColor: '#d1d3d1ff'
  }

  const scrollContainer = {
    maxHeight: '600px',
    overflowY: 'scroll'
  }


  return (
    <div style={containerStyle}>
      <div style={scrollContainer}>
      <Table singleLine style={tableStyle}>
        <Table.Header style={{ position: 'sticky', top: 0, zIndex: 100}}>
          <Table.Row>
            <Table.HeaderCell width={1}>No.</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Checked</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* 인덱스를 추가하여 순번 매김 */}
          {APIData.map((data, index) => {

            // 짝수일 때 그 열에 색깔 부여 (index 기준)
            const rowStyle = index % 2 !== 0 ? rowColor : {};

            return (
              <Table.Row key={data.id} style={rowStyle}>
                <Table.Cell >
                  {index + 1}
                </Table.Cell>{" "}
                {/* 순번 추가 */}
                <Table.Cell>
                  {data.firstName}
                </Table.Cell>
                <Table.Cell>
                  {data.lastName}
                </Table.Cell>
                <Table.Cell> {/* 성별 추가 */}
                  {data.gender || "N/A" }
                </Table.Cell>
                <Table.Cell> 
                  {data.phoneNumber || "N/A" }
                </Table.Cell>
                <Table.Cell>
                  {data.checkbox ? "agree" : "disagree"}
                </Table.Cell>
                <Table.Cell>
                  {new Date(data.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell style={{ buttonCellStyles }}>
                  <Link to="/update">
                    <Button onClick={() => setData(data)} style={buttonStyles}>Update</Button>
                  </Link>
                </Table.Cell>
                <Table.Cell style={{ buttonCellStyles }}>
                  <Button onClick={() => onDelete(data.id)}  style={buttonStyles}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      </div>
    </div>
  );
}
