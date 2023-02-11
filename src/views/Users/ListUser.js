//* Library
import React, { useEffect, useState } from "react";
import axios from "axios";

//* Components
import { AddAndEdit } from "./Modal/Add&Edit_Modal";
import { ChangePassword } from "./Modal/changePassword.js.js";
import { ConfirmDelete } from "./Modal/confirmDelete";

//* CORE UI + React Bootstrap
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CFormSwitch,
} from "@coreui/react";
import { Table, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

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
    axios
      .get("http://localhost:8000/listUser")
      .then((response) => response.data)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

  // const deleteUser = (userID) => {
  //   axios.delete(`http://localhost:8000/listUser/${userID}`).catch((err) => {
  //     console.error(err);
  //   });
  // };

  //* Completed: Sort Role
  const sortRole = (e) => {
    if (e.target.value !== "Select All") {
      setUser(() => userData);
      setUser((users) => [
        ...users.filter((Users, index) => {
          return Users.role === e.target.value;
        }),
      ]);
    } else {
      setUser(userData);
    }
  };

  //* Completed: Search User Name
  const [searchFullName, setSearchFullName] = useState("");
  const getInfoFullName = (e) => {
    setSearchFullName(() => e.target.value);
    if (e.target.value == "") {
      setUser(userData);
    } else {
      var searchUser = user.filter((item) => {
        if (
          item.fullName.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          // console.log(user[index].actived)
          return item;
        }
      });
      console.log(searchUser);
      setUser(searchUser);
      console.log(e.target.value);
    }
  };

  //* Completed: Active User
  const activeUser = (USER, e) => {
    setUser(
      user.filter((item) => {
        if (item.id === USER.id) {
          // console.log(user[index].actived)
          item.actived = e.target.checked;
          // console.log(item.id + ' ' + USER.id)
        }
        return item;
      })
    );
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
                  <Form.Select
                    aria-label="Default select example"
                    className="formSelect__form"
                    // name="role"
                    onChange={sortRole}
                  >
                    <option>Select All</option>
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </Form.Select>
                </div>
              </div>

              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
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
                    <th>Name</th>
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
      />

      {/* Completed: Modal Change Password */}
      <ChangePassword
        showCP={showCP}
        setShowCP={setShowCP}
        indexUser={indexUser}
        user={user}
        setUser={setUser}
      />

      {/* Completed: Modal Confirm Delete */}
      <ConfirmDelete
        showDlt={showDlt}
        setShowDlt={setShowDlt}
        indexUser={indexUser}
        user={user}
      />
    </>
  );
};

export default ListUser;
