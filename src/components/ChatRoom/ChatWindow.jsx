import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useMemo, useState } from "react";

import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/service";
import useFileStore from "../../hooks/useFileStore";
import Message from "./Message";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgba(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__desc {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WraperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgba(230, 230, 230);
  border-radius: 2px;

  .ant-row.ant-form-item {
    margin: 0;
    width: 100%;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsInviteVisible } = useContext(AppContext);
  const { uid, photoURL, displayName } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const { form } = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(["message"]);
  };

  const condition = useMemo(() => {
    return {
      fielName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    };
  }, [selectedRoom.id]);

  const messages = useFileStore("messages", condition);
  console.log("messages:", messages);

  const handleInvite = () => {
    setIsInviteVisible(true);
  };

  return (
    <WraperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="header__title">{selectedRoom?.name}</p>
          <span className="header__desc">{selectedRoom?.description}</span>
        </div>
        <div>
          <ButtonGroupStyle>
            <Button
              icon={<UserAddOutlined />}
              type="text"
              onClick={handleInvite}
            >
              Invite
            </Button>
            <Avatar.Group size="small" maxCount={2}>
              {members.map((member) => {
                return (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                );
              })}
            </Avatar.Group>
          </ButtonGroupStyle>
        </div>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          {messages?.map((mes) => {
            return (
              <Message
                key={mes.id}
                text={mes.text}
                photoURL={mes.photoURL}
                displayName={mes.displayName}
                createdAt={mes.createdAt}
              />
            );
          })}
        </MessageListStyled>
        <FormStyled form={form}>
          <Form.Item name="message">
            <Input
              onChange={handleInputChange}
              onPressEnter={handleSubmit}
              placeholder="Nhập tin nhắn..."
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Send
          </Button>
        </FormStyled>
      </ContentStyled>
    </WraperStyled>
  );
};

export default ChatWindow;
