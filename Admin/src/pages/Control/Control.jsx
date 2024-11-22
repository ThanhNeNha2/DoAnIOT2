import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./Control.css";
import Form from "react-bootstrap/Form";
import { db, ref, onValue, update } from "../../firebase";

export default function Control() {
  const [door, setDoor] = useState("");
  const [doorChecked, setDoorChecked] = useState(false);
  console.log(doorChecked);

  useEffect(() => {
    const data = ref(db);
    onValue(data, (snapshot) => {
      setDoor(snapshot.val().DOOR);
      setDoorChecked(snapshot.val().DOOR === "ON");
    });
  }, [db]);

  const handleSwitchChange = () => {
    const newStatus = door === "OFF" ? "ON" : "OFF";
    update(ref(db), { DOOR: newStatus }) // Sử dụng update để cập nhật chỉ trường DOOR
      .then(() => {
        setDoor(newStatus);
        setDoorChecked(!doorChecked);
      })
      .catch((error) => {
        console.error("Lỗi cập nhật DOOR:", error);
      });
  };
  return (
    <div className="container control">
      <div className="content">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Thiết bị</th>

              <th>Tên thiết bị</th>
              <th>Trạng thái</th>
              <th>ON/OFF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Cửa </td>
              <td>{door}</td>
              <td>
                {" "}
                <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label=""
                    checked={doorChecked}
                    onChange={handleSwitchChange}
                  />
                </Form>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Đèn </td>
              <td>Tắt </td>
              <td>
                {" "}
                <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label=""
                  />
                </Form>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td> Phòng</td>
              <td>Mở</td>
              <td>
                {" "}
                <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label=""
                  />
                </Form>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
