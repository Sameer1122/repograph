import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { ArrowLeftOutlined, AudioOutlined } from "@ant-design/icons";
import { Input, Space, Button, Row, Col } from "antd";
import { Avatar, List } from "antd";
import { userData } from "./data/dummy";
import { Select } from "antd";

import Bar from "./Components/Bar";
const { Search } = Input;

function App() {
  const { Option } = Select;
  const [filter, setfilter] = useState("");
  const [repoData, setrepoData] = useState([]);
  const [isUser, setisUser] = useState(true);
  const [active, setactive] = useState(1);
  const [currentUser, setcurrentUser] = useState("User");
  const [barData, setbarData] = useState([]);
  const [repoClick, setrepoClick] = useState(false);
  const [currentRepo, setcurrentRepo] = useState([]);
  const onSearch = (value) => {
    setfilter(value);
  };
  const clickHandler = (e, id) => {
    const filtered = userData.filter((val) => val.id === id);
    const data = filtered[0].repoList;
    setcurrentUser(filtered[0].name);

    setrepoData(data);
    setisUser(false);
  };
  const repoClickHandler = (id) => {
    setrepoClick(true);
    setactive(1);
    const filtered = repoData.filter((val) => val.id === id);
    setcurrentRepo(filtered[0]);
    const data = filtered[0].yearData;
    setbarData(data);
  };
  const backHandler = () => {
    setisUser(true);
    setrepoClick(false);
    setactive(1);
    setbarData([]);
  };
  const monthhandleChange = (value) => {
    const filtered = repoData.filter((val) => val.id === currentRepo.id);
    const data = filtered[0].monthData.filter((val) => val.year === value);
    setbarData(data[0].data);
  };
  const weekhandleChange = (value) => {
    const filtered = repoData.filter((val) => val.id === currentRepo.id);
    const data = filtered[0].weekData.filter((val) => val.year === value);
    setbarData(data[0].data);
  };
  const yearHandler = () => {
    setactive(1);
    const filtered = repoData.filter((val) => val.id === currentRepo.id);
    const data = filtered[0].yearData;
    setbarData(data);
  };
  const monthHandler = () => {
    setactive(2);
    const filtered = repoData.filter((val) => val.id === currentRepo.id);
    const data = filtered[0].monthData[0].data;
    setbarData(data);
  };
  const weekHandler = () => {
    setactive(3);
    const filtered = repoData.filter((val) => val.id === currentRepo.id);
    const data = filtered[0].weekData[0].data;
    setbarData(data);
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <Row className="search-area">
        <Col xs={24} sm={2}>
          <h1>Search</h1>
        </Col>

        <Col xs={16} sm={10}>
          <Search
            placeholder="Please Enter user name"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col xs={2} sm={10} />
        <Col xs={6} sm={2}>
          <Button
            style={{
              background: "green",
              color: "white",
              padding: "4px 18px",
              borderRadius: "8px",
            }}
          >
            Download
          </Button>
        </Col>
      </Row>
      <Row className="main-area">
        <Col xs={24} sm={8}>
          <h1>{isUser ? "User List" : `${currentUser} Repo`}</h1>
          {!isUser && (
            <ArrowLeftOutlined
              style={{ fontSize: "24px", marginBottom: "16px" }}
              onClick={backHandler}
            />
          )}
          {isUser && (
            <List
              itemLayout="horizontal"
              pagination={{
                onChange: (page) => {},
                pageSize: 10,
              }}
              dataSource={userData.filter((data) => {
                if (filter === "") {
                  return [];
                } else if (
                  data.name.toLowerCase().includes(filter.toLocaleLowerCase())
                ) {
                  return data;
                }
              })}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <a onClick={(e) => clickHandler(e, item.id)}>
                        {item.name}
                      </a>
                    }
                  />
                </List.Item>
              )}
            />
          )}
          {!isUser && (
            <List
              itemLayout="horizontal"
              pagination={{
                onChange: (page) => {},
                pageSize: 5,
              }}
              dataSource={repoData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://w7.pngwing.com/pngs/182/979/png-transparent-github-repository-commit-version-control-github-angle-rectangle-logo-thumbnail.png" />
                    }
                    title={
                      <a onClick={() => repoClickHandler(item.id)}>
                        {item.url}
                      </a>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Col>
        <Col xs={0} sm={2} />
        <Col xs={24} sm={14}>
          <div className="bar-wrapper">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {repoClick ? <h1>{currentRepo.name}</h1> : <h1>Repo Name</h1>}
              {repoClick && (
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Button
                    onClick={yearHandler}
                    style={{
                      background: `${active === 1 ? "black" : ""}`,
                      color: `${active === 1 ? "white" : "black"}`,
                    }}
                  >
                    Year
                  </Button>
                  <Button
                    style={{
                      background: `${active === 2 ? "black" : ""}`,
                      color: `${active === 2 ? "white" : "black"}`,
                    }}
                    onClick={monthHandler}
                  >
                    Month
                  </Button>
                  {active === 2 && (
                    <Select
                      defaultValue="2022"
                      style={{ width: 120 }}
                      onChange={monthhandleChange}
                    >
                      <Option value="2022">2022</Option>
                      <Option value="2021">2021</Option>
                      <Option value="2020">2020</Option>
                    </Select>
                  )}
                  <Button
                    style={{
                      background: `${active === 3 ? "black" : ""}`,
                      color: `${active === 3 ? "white" : "black"}`,
                    }}
                    onClick={weekHandler}
                  >
                    Weekly
                  </Button>
                  {active === 3 && (
                    <Select
                      defaultValue="2022"
                      style={{ width: 120 }}
                      onChange={weekhandleChange}
                    >
                      <Option value="2022">2022</Option>
                      <Option value="2021">2021</Option>
                    </Select>
                  )}
                </div>
              )}
            </div>
            <Bar barData={barData} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
