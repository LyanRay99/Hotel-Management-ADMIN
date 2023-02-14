//* Library
import React, { useEffect, useState } from "react";
import Api from "src/Api/axiosConfig";
import Select from "react-select";

//* Components
import { AddAndEdit } from "./Modal/Add&Edit_Users";
import { ChangePassword } from "./Modal/changePassword.js.js";
import { ConfirmDelete } from "./Modal/delete_Users";

//* CORE UI + React Bootstrap
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CFormSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowTop } from "@coreui/icons";
import { Table, Button } from "react-bootstrap";

//* Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ListUser = () => {
  //* Get + binding data
  const [user, setUser] = useState([]);

  //* Call Api to binding data
  useEffect(() => {
    Api.get("/listUser")
      .then((response) => response.data)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //* Function GET data Users
  const getDataUser = () => {
    Api.get("/listUser")
      .then((response) => response.data)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Modal Add and Edit User
  const [addVisible, setAddVisible] = useState(false);

  //* Completed: Create Object empty to handle Add + Edit User
  const [objUser, setObjUser] = useState({
    id: 0,
    fullName: "",
    date: "",
    sex: "",
    avatar: "URL",
    identityCard: "",
    nationality: "",
    phone: "",
    email: "",
    address: "",
    dateCreated: "",
    dateUpdated: "",
    actived: true,
    userName: "",
    password: "",
    role: "",
    branch: "",
  });

  //* Completed: Get info to Edit User
  const getInfoEdit = (user, index) => {
    //* Open Modal
    setAddVisible(true);

    //* Get index item
    setindexUser(index);

    //* Binding data of user to edit
    setObjUser({
      id: user.id,
      fullName: user.fullName,
      date: user.date,
      sex: user.sex,
      avatar: user.avatar,
      identityCard: user.identityCard,
      nationality: user.nationality,
      phone: user.phone,
      email: user.email,
      address: user.address,
      dateCreated: user.dateCreated,
      dateUpdated: user.dateUpdated,
      actived: user.actived,
      userName: user.userName,
      password: user.password,
      role: user.role,
      branch: user.branch,
    });
  };

  //* Completed: Get info to Delete User
  const [showDlt, setShowDlt] = useState(false);
  const getInfoDelete = (userID) => {
    setindexUser(userID);
    setShowDlt(true);
  };

  //* Completed: Sort Role
  const options = [
    { value: "Select All", label: "Select All" },
    { value: "Admin", label: "Admin" },
    { value: "Super Admin", label: "Super Admin" },
  ];

  const [selectRole, setSelectRole] = useState(options[0]);

  const sortRole = (selectedOption) => {
    setSelectRole(selectedOption);
    if (selectedOption.value !== "Select All") {
      Api.get("/listUser")
        .then((response) => {
          console.log(response.data);
          response.data;
          setUser([
            ...response.data.filter((item) => {
              return item.role === selectedOption.label;
            }),
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      getDataUser();
    }
  };

  //* Completed: Search User Name
  const [searchFullName, setSearchFullName] = useState("");
  const getInfoFullName = (e) => {
    setSearchFullName(() => e.target.value);

    if (e.target.value == "") {
      getDataUser();
    } else {
      Api.get("/listUser")
        .then((response) => response.data)
        .then((user) => {
          setUser([
            ...user.filter((item) => {
              if (
                item.fullName
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
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

    //* Reset Select (Select All)
    setSelectRole(options[0]);
  };

  //* Completed: Active User
  const activeUser = (USER, e) => {
    USER.actived = e.target.checked;

    Api.put(`/listUser/${USER.id}`, USER).catch((err) => {
      console.error(err);
    });

    getDataUser();
  };

  //* Completed: Sort fullName of User
  //* State to set UI Sort fullName
  const [sortAZ, setSortAZ] = useState(true);
  //* Sort A-Z
  const sortNameAZ = () => {
    Api.get("/listUser")
      .then((response) => response.data)
      .then((user) => {
        setUser([
          ...user.sort(function (a, b) {
            var nameA = a.fullName.toUpperCase();
            var nameB = b.fullName.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });

    setSortAZ(!sortAZ);
  };

  //* Sort Z-A
  const sortNameZA = () => {
    Api.get("/listUser")
      .then((response) => response.data)
      .then((user) => {
        setUser([
          ...user.sort(function (a, b) {
            var nameA = a.fullName.toUpperCase();
            var nameB = b.fullName.toUpperCase();
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            return 0;
          }),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });

    setSortAZ(!sortAZ);
  };

  //* Completed: Change password
  //* Modal change password
  const [showCP, setShowCP] = useState(false);
  const [indexUser, setindexUser] = useState(0);

  //* Get info change password
  const getInfoCP = (index) => {
    //* Open modal
    setShowCP(true);

    //* Get index item
    setindexUser(index);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List User</CCardHeader>
        <CCardBody>
          <CRow>
            <div className="control">
              <div className="select">
                <div className="btn">
                  <Button variant="info" onClick={() => setAddVisible(true)}>
                    Add <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>

                <div className="formSelect">
                  <Select
                    value={selectRole}
                    onChange={sortRole}
                    options={options}
                  />
                </div>
              </div>

              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  aria-label="Type String..."
                  aria-describedby="basic-addon1"
                  value={searchFullName}
                  onChange={getInfoFullName}
                />
              </div>
            </div>

            <div className="tableParent">
              <Table responsive="sm">
                <thead style={{ backgroundColor: "rgba(60, 75, 100,0.5)" }}>
                  <tr>
                    <th>No</th>
                    <th>
                      {sortAZ ? (
                        <CIcon
                          className="sort"
                          icon={cilArrowTop}
                          style={{ marginRight: "5px" }}
                          onClick={() => sortNameAZ()}
                        ></CIcon>
                      ) : (
                        <CIcon
                          className="sort"
                          icon={cilArrowBottom}
                          style={{ marginRight: "5px" }}
                          onClick={() => sortNameZA()}
                        ></CIcon>
                      )}
                      Name
                    </th>
                    <th>Sex</th>
                    <th>Date of birth</th>
                    <th>Identity Card</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Branch</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.fullName}</td>
                      <td>{user.sex}</td>
                      <td>{user.date}</td>
                      <td>{user.address}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.branch}</td>
                      <td>{user.role}</td>
                      <td>
                        <CFormSwitch
                          checked={user.actived}
                          onChange={(e) => activeUser(user, e)}
                        />
                      </td>
                      <td className="tdAction">
                        <span>
                          <FontAwesomeIcon
                            icon={faKey}
                            className="icon key"
                            onClick={() => getInfoCP(index)}
                          />
                        </span>
                        <span onClick={() => getInfoEdit(user, index)}>
                          <FontAwesomeIcon icon={faPen} className="icon pen" />
                        </span>
                        <span
                          onClick={() => {
                            getInfoDelete(user.id);
                          }}
                        >
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

      {/* Completed: Modal Add + Edit User*/}
      <AddAndEdit
        addVisible={addVisible}
        setAddVisible={setAddVisible}
        user={user}
        setUser={setUser}
        objUser={objUser}
        setObjUser={setObjUser}
        indexUser={indexUser}
        getDataUser={getDataUser}
      />

      {/* Completed: Modal Change Password */}
      <ChangePassword
        showCP={showCP}
        setShowCP={setShowCP}
        indexUser={indexUser}
        user={user}
        setUser={setUser}
        getDataUser={getDataUser}
      />

      {/* Completed: Modal Confirm Delete */}
      <ConfirmDelete
        showDlt={showDlt}
        setShowDlt={setShowDlt}
        indexUser={indexUser}
        user={user}
        setUser={setUser}
        getDataUser={getDataUser}
      />
    </>
  );
};

export default ListUser;
