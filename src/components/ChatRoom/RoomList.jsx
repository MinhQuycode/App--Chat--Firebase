import React, { useContext, useMemo } from "react";
import { Collapse, Typography, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import styled from "styled-components";
import useFileStore from "../../hooks/useFileStore";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
const { Panel } = Collapse;

const PanelStyle = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
    }
  }
`;

const LinkStyle = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const RoomList = () => {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);
  const handleAddroom = () => {
    setIsAddRoomVisible(true);
  };
  console.log(rooms);
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyle header="Danh sách các phòng chat" key="1">
        {rooms?.map((room) => {
          return (
            <LinkStyle
              key={room.id}
              onClick={() => {
                setSelectedRoomId(room.id);
              }}
            >
              {room.name}
            </LinkStyle>
          );
        })}
        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={handleAddroom}
        >
          Thêm phòng
        </Button>
      </PanelStyle>
    </Collapse>
  );
};

export default RoomList;
