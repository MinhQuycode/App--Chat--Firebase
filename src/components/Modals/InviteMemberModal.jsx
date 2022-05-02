import { Form, Select, Modal, Spin, Avatar } from "antd";
import { debounce } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { db } from "../../firebase/config";
import { addDocument } from "../../firebase/service";

function DebounceSelect({ fetchOptions, debounceTimeOut = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.curmembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounce);
  }, [debounceTimeOut, fetchOptions]);

  return (
    <Select
      filterOption={false}
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt()?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

const fetchUserList = async (search, curmembers) => {
  return db
    .collection("users")
    .where("keyWords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curmembers.includes(opt.value));
    });
};

const InviteMemberModal = () => {
  const { isinviteVisible, setIsInviteVisible, selectedRoomId, selectedRoom } =
    useContext(AppContext);
  const [value, setValue] = useState([]);
  const { uid } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    const roomRef = db.collection("rooms").doc(selectedRoomId);

    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    //Add new room to firestore
    setIsInviteVisible(false);
    //Reset form
    form.resetFields();
  };

  const handleCancel = () => {
    setIsInviteVisible(false);
    //Reset form
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        visible={isinviteVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curmembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberModal;
