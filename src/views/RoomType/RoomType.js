//* Library
import React, { useEffect, useState } from "react";
import Api from "src/Api/axiosConfig";
import Select from "react-select";
import { customStyles } from "src/components/Others/others";

//* CORE UI + React Bootstrap
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CFormSwitch,
} from "@coreui/react";
import { Table, Button } from "react-bootstrap";

//* Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const RoomType = () => {
  //* Get + binding data
  const [roomType, setRoomType] = useState([]);
  const [branch, setBranch] = useState([]);

  //* Call Api to binding data
  useEffect(() => {
    Api.get("/listRooms")
      .then((response) => response.data)
      .then((data) => {
        setRoomType(data[0].roomType);
        setBranch(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //* Function GET data RoomType
  const getDataRoomType = () => {
    Api.get("/listRooms")
      .then((response) => response.data[0].roomType)
      .then((data) => {
        setRoomType(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Completed: Select Branch to CRUD RoomType
  const options = [];
  branch.map((item) => {
    options.push({
      value: item.nameBranchVN,
      label: item.nameBranchVN,
    });
  });

  const [selectBranch, setSelectBranch] = useState(options[0]);

  const sortRole = (selectedOption) => {
    setSelectBranch(selectedOption);

    //* Get roomType of selected Branch
    var indexBranch = 0;
    branch.map((item, index) => {
      if (item.nameBranchVN === selectedOption.value) {
        return (indexBranch = index);
      }
    });

    Api.get("/listRooms")
      .then((response) => {
        setRoomType([
          ...response.data[indexBranch].roomType.filter((item) => {
            return item;
          }),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List Room Type</CCardHeader>
        <CCardBody>
          <CRow>
            <div className="control">
              <div className="select">
                <div className="btn">
                  <Button variant="info">
                    Add <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>

                <div className="formSelect">
                  <Select
                    value={selectBranch}
                    onChange={sortRole}
                    options={options}
                    styles={customStyles}
                  />
                </div>
              </div>

              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Type"
                  aria-label="Type String..."
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <div className="tableParent">
              <Table responsive="sm">
                <thead style={{ backgroundColor: "rgba(60, 75, 100,0.5)" }}>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Max Person</th>
                    <th>Total Room</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomType.map((roomType, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{roomType.type}</td>
                      <td>{roomType.image}</td>
                      <td>{roomType.price}</td>
                      <td>{roomType.max_person}</td>
                      <td>{roomType.roomTotal}</td>
                      <td>
                        <CFormSwitch
                          checked={roomType.actived}
                          onChange={(e) => activeUser(roomType, e)}
                        />
                      </td>
                      <td className="tdAction">
                        <span>
                          <FontAwesomeIcon icon={faPen} className="icon pen" />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="icon trash"
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default RoomType;
