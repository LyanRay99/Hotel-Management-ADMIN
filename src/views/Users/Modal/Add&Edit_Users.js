//* Library
import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from "src/Api/axiosConfig";

//* Function feature
import { blockInvalidChar } from "src/components/Others/others";

//* CORE UI + React Bootstrap
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
} from "@coreui/react";

export const AddAndEdit = ({
  addVisible,
  setAddVisible,
  user,
  setUser,
  objUser,
  setObjUser,
  indexUser,
  getDataUser,
}) => {
  //* Setup to binding data for Select Branch
  const [room, setRoom] = useState([]);

  //* Get data Branch
  useEffect(() => {
    Api.get("/listRooms")
      .then((response) => response.data)
      .then((data) => {
        setRoom(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const branchName = room.map((item, index) => ({
    label: item.nameBranchVN,
    value: item.nameBranchEN,
  }));
  branchName.unshift("choose");

  //* Completed: Add User
  //* 1 - Get info user
  const getInfo = (e) => {
    if (e.target.name === "fullName") {
      setObjUser({ ...objUser, fullName: e.target.value });
    } else if (e.target.name === "birth") {
      setObjUser({ ...objUser, date: e.target.value });
    } else if (e.target.name === "sex") {
      setObjUser({ ...objUser, sex: e.target.value });
    } else if (e.target.name === "identityCard") {
      // if (/^\d+$/.test(e.target.value)) {
      setObjUser({ ...objUser, identityCard: e.target.value });
      // }
    } else if (e.target.name === "nationality") {
      setObjUser({ ...objUser, nationality: e.target.value });
    } else if (e.target.name === "email") {
      setObjUser({ ...objUser, email: e.target.value });
    } else if (e.target.name === "address") {
      setObjUser({ ...objUser, address: e.target.value });
    } else if (e.target.name === "role") {
      setObjUser({ ...objUser, role: e.target.value });
    } else if (e.target.name === "branch") {
      setObjUser({ ...objUser, branch: e.target.value });
    } else if (e.target.name === "userName") {
      setObjUser({ ...objUser, userName: e.target.value });
    } else if (e.target.name === "password") {
      setObjUser({ ...objUser, password: e.target.value });
    } else if (e.target.name === "phone") {
      //* Create dateCreated + dateUpdated luôn tại đây
      var today = new Date();
      var day = String(today.getDate()).padStart(2, "0");
      var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var year = today.getFullYear();
      var hour = today.getHours();
      var minutes = today.getMinutes();
      today = `${hour}h${minutes} ${day}-${month}-${year}`;
      setObjUser({
        ...objUser,
        dateCreated: today,
        dateUpdated: today,
        phone: e.target.value,
      });
    }
  };

  //* Check Text Empty ?
  var checkEmpty = true;
  const checkTextEmpty = () => {
    for (const key in objUser) {
      if (objUser[key] === "") {
        // console.log(objUser[key])
        return (checkEmpty = false);
      } else {
        checkEmpty = true;
      }
    }
  };

  //* Check text chứa toàn khoảng trắng
  var checkSpace = true;
  const checkTextSpace = () => {
    for (const key in objUser) {
      var check = String(objUser[key]).replace(/\s/g, "").length;
      if (!check) {
        console.log("loi");
        return (checkSpace = false);
      } else {
        checkSpace = true;
      }
    }
  };

  //* 3 - Add User
  const addUser = () => {
    //* Run function check
    checkTextEmpty();
    checkTextSpace();

    //* Check invalid CheckEmpty + CheckSpace + CheckEmail
    if (
      checkEmpty &&
      checkSpace &&
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(objUser.email)
    ) {
      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjUser({ ...objUser, id: user.length + 1 });

      //* Add objUser into User
      Api.post("/listUser", objUser)
        .then(() => {
          //* Get lại data
          getDataUser();

          //* Close Modal
          setAddVisible(false);

          //* Reset objUser
          setObjUser({
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
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (!checkEmpty) {
      alert("input khônng được trống");
    } else if (!checkSpace) {
      alert("input chứa toàn khoảng trắng");
    } else if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(objUser.email) == false
    ) {
      alert("Email không hợp lệ");
    }
  };

  //* Completed: Edit User
  //* Update state
  const editUser = () => {
    console.log(objUser);
    //* set item editted
    Api.put(`/listUser/${user[indexUser].id}`, objUser)
      .then(() => {
        //* Get lại data
        getDataUser();

        //* Reset objUser
        setObjUser({
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

        //* Close Modal
        setAddVisible(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Reset ObjUser khi click Cancel (phòng khi user click change password nhưng lại đổi ý nhấn close)
  const cancelEdit = () => {
    //* Reset objUser
    setObjUser({
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

    //* Close Modal
    setAddVisible(false);
  };

  return (
    <React.Fragment>
      {/* Completed: Modal to get info, Add and Edit User */}
      <CModal
        scrollable
        visible={addVisible}
        backdrop="static"
        size="xl"
        onClose={() => setAddVisible(false)}
      >
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={4}>
              <CFormInput
                type="text"
                label="Full Name"
                name="fullName"
                value={objUser.fullName}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="date"
                label="Birth"
                name="birth"
                value={objUser.date}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Sex"
                aria-label="Default select example"
                name="sex"
                value={objUser.sex}
                onChange={getInfo}
                options={[
                  "Choose",
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                label="Identity Card"
                name="identityCard"
                value={objUser.identityCard}
                onChange={getInfo}
                onKeyDown={blockInvalidChar}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Nationality"
                aria-label="Default select example"
                name="nationality"
                value={objUser.nationality}
                onChange={getInfo}
                options={[
                  "Choose",
                  { label: "Viet Nam", value: "Viet Nam" },
                  { label: "USA", value: "USA" },
                  { label: "France", value: "France" },
                  { label: "Italia", value: "Italia" },
                ]}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="email"
                label="Email"
                name="email"
                value={objUser.email}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Address"
                name="address"
                value={objUser.address}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                label="Phone Number"
                name="phone"
                value={objUser.phone}
                onChange={getInfo}
                onKeyDown={blockInvalidChar}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Role"
                aria-label="Default select example"
                name="role"
                value={objUser.role}
                onChange={getInfo}
                options={[
                  "Choose",
                  { label: "Admin", value: "Admin" },
                  { label: "Super Admin", value: "Super Admin" },
                ]}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Branch"
                aria-label="Default select example"
                name="branch"
                value={objUser.branch}
                onChange={getInfo}
                options={branchName}
                disabled={objUser.role === "" ? true : false}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Username"
                name="userName"
                value={objUser.userName}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="password"
                label="Password"
                name="password"
                value={objUser.password}
                onChange={getInfo}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          {objUser.id == false ? (
            <CButton
              color="primary"
              className="btnAdd"
              onClick={() => {
                addUser();
              }}
            >
              Aplly
            </CButton>
          ) : (
            <CButton className="btnEdit" onClick={() => editUser()}>
              Edit
            </CButton>
          )}

          <CButton className="btnCancel" onClick={() => cancelEdit()}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
