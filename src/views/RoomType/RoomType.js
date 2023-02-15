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
      .then((response) => response.data)
      .then((data) => {
        setRoomType(data[indexBranch].roomType);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log("ok");
  };

  //* Completed: Active RoomType
  const activeRoomType = (e, indexRoomType) => {
    branch[indexBranch].roomType[indexRoomType].actived = e.target.checked;
    const BranchObj = branch[indexBranch];

    Api.put(`/listRooms/${branch[indexBranch].id}`, BranchObj)
      .then(() => {
        getDataRoomType();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Completed: Select Branch to CRUD RoomType
  //* 1 - Create varible
  const options = [];
  const [selectBranch, setSelectBranch] = useState([]);
  var [indexBranch, setIndexBranch] = useState(0);

  //* 2 - Get data Branch to binding in select
  branch.map((item, index) => {
    options.push({
      value: item.nameBranchVN,
      label: item.nameBranchVN,
    });
  });

  //* 3 - Set lại các state cần thiết
  const SelectBranchs = (selectedOption) => {
    setSelectBranch(selectedOption);

    //* Get roomType of selected Branch
    branch.map((item, index) => {
      if (item.nameBranchVN === selectedOption.value) {
        setIndexBranch(index);
      }
    });
  };

  //* 4 - Filter roomType after indexBranch changed
  useEffect(() => {
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
  }, [indexBranch]);

  //* Completed: Search RoomType
  const [searchRoomType, setSearchRoomType] = useState("");
  const getInfoRoomType = (e) => {
    setSearchRoomType(() => e.target.value);

    if (e.target.value == "") {
      getDataRoomType();
    } else {
      Api.get("/listRooms")
        .then((response) => response.data)
        .then((user) => {
          setRoomType([
            ...roomType.filter((item) => {
              if (
                item.type.toLowerCase().includes(e.target.value.toLowerCase())
              ) {
                return item;
              }
            }),
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
                    onChange={SelectBranchs}
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
                  onChange={getInfoRoomType}
                />
              </div>
            </div>

            <div className="tableParent">
              <Table responsive="sm">
                <thead style={{ backgroundColor: "rgba(60, 75, 100,0.5)" }}>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Branch</th>
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
                      <td>{branch[indexBranch].nameBranchVN}</td>
                      <td>{roomType.image}</td>
                      <td>{roomType.price}</td>
                      <td>{roomType.max_person}</td>
                      <td>{roomType.roomTotal}</td>
                      <td>
                        <CFormSwitch
                          checked={roomType.actived}
                          onChange={(e) => activeRoomType(e, index)}
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
