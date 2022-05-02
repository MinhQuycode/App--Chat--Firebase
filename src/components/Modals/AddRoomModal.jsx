import { Form, Input, Modal } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/service";

const AddRoomModal = () => {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { uid } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOk = () => {
    //Add new room to firestore
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    setIsAddRoomVisible(false);

    //Reset form
    form.resetFields();
  };
  const handleCancel = () => {
    setIsAddRoomVisible(false);

    //Reset form
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
