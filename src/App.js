import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { ArrowLeftOutlined, AudioOutlined } from "@ant-design/icons";
import { Input, Space, Button, Row, Col } from "antd";
import { Avatar, List } from "antd";
import { userData } from "./data/dummy";
import Bar from "./Components/Bar";
const { Search } = Input;

function App() {
  const [filter, setfilter] = useState("");
  const [repoData, setrepoData] = useState([]);
  const [isUser, setisUser] = useState(true);
  const [currentUser, setcurrentUser] = useState("User");
  const [barData, setbarData] = useState([]);
  const onSearch = (value) => {
    setfilter(value);
  };
  const clickHandler = (e, id) => {
    console.log(id);
    const filtered = userData.filter((val) => val.id === id);
    const data = filtered[0].repoList;
    setcurrentUser(filtered[0].name);
    console.log(data);
    setrepoData(data);
    setisUser(false);
  };
  const repoClickHandler = (id) => {
    const filtered = repoData.filter((val) => val.id === id);
    const data = filtered[0].repodata;
    setbarData(data);
  };
  const backHandler = () => {
    setisUser(true);
    setbarData([]);
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
                onChange: (page) => {
                  console.log(page);
                },
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
                onChange: (page) => {
                  console.log(page);
                },
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
            <h1>Repo Name</h1>
            <Bar barData={barData} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
