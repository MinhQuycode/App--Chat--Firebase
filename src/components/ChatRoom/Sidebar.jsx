import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import RoomList from "./RoomList";
import UserInfo from "./UserInfo";

const SidebarStyles = styled.div`
  background: #783874;
  color: white;
  height: 100vh;
`;

const Sidebar = () => {
  return (
    <SidebarStyles>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyles>
  );
};

export default Sidebar;
