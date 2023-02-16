//* Library
import React, { useState } from "react";
import Api from "src/Api/axiosConfig";

//* CORE UI + React Bootstrap
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CForm,
  CCol,
  CFormInput,
} from "@coreui/react";

export const AddAndEditBranch = ({
  addVisible,
  setAddVisible,
  branch,
  setBranch,
  objUser,
  setObjUser,
  idBranch,
  getDataBranch,
  toNonAccentVietnamese,
  indexBranch,
}) => {
  //* Completed: Add Branch
  //* 1 - Get info Branch
  const getInfo = (e) => {
    if (e.target.name === "name") {
      //* Conver VN => EN
      var nameEN = toNonAccentVietnamese(e.target.value);

      setObjUser({
        ...objUser,
        nameBranchEN: nameEN,
        nameBranchVN: e.target.value,
      });
    } else if (e.target.name === "phone") {
      setObjUser({ ...objUser, phone: e.target.value });
    } else if (e.target.name === "address") {
      //* Conver VN => EN
      var addressEN = toNonAccentVietnamese(e.target.value);

      setObjUser({
        ...objUser,
        addressEN: addressEN,
        addressVN: e.target.value,
      });
    } else if (e.target.name === "email") {
      setObjUser({ ...objUser, email: e.target.value });
    } else if (e.target.name === "roomTotal") {
      setObjUser({ ...objUser, roomTotal: e.target.value });
    } else if (e.target.name === "manager") {
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
        manager: e.target.value,
      });
    }

    console.log(objUser);
  };

  //* Check Text Empty ?
  var checkEmpty = true;
  const checkTextEmpty = () => {
    for (const key in objUser) {
      if (objUser[key] === "") {
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
      //* Xóa đi các khoảng trắng
      var check = String(objUser[key]).replace(/\s/g, "").length;
      if (!check && key !== "numberOfMember" && key !== "roomType") {
        console.log("loi");
        return (checkSpace = false);
      } else {
        checkSpace = true;
      }
    }
  };

  // //* 3 - Add Branch
  const addBranch = () => {
    //* Run function check
    checkTextEmpty();
    checkTextSpace();

    //* Push into Array + Reset objUser
    if (
      checkEmpty &&
      checkSpace &&
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(objUser.email)
    ) {
      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjUser({
        ...objUser,
        id: branch.length + 1,
      });

      //* Add objUser into User
      Api.post("/listRooms", objUser).catch((err) => {
        console.error(err);
      });

      //* Get lại data
      getDataBranch();

      //* Close Modal
      setAddVisible(false);

      //* Reset objUser
      setObjUser({
        id: 0,
        nameBranchEN: "",
        nameBranchVN: "",
        phone: "",
        addressVN: "",
        addressEN: "",
        email: "",
        roomTotal: 0,
        manager: "",
        actived: true,
        dateCreated: "",
        dateUpdated: "",
        numberOfMember: [],
        roomType: [],
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

  // //* Completed: Edit User
  // //* Update state
  const editBranch = () => {
    //* set item editted
    Api.put(`/listRooms/${branch[indexBranch].id}`, objUser).catch((err) => {
      console.error(err);
    });

    //* Get lại data
    getDataBranch();

    //* Reset objUser
    setObjUser({
      id: 0,
      nameBranchEN: "",
      nameBranchVN: "",
      phone: "",
      addressVN: "",
      addressEN: "",
      email: "",
      roomTotal: 0,
      manager: "",
      actived: true,
      dateCreated: "",
      dateUpdated: "",
    });

    //* Close Modal
    setAddVisible(false);
  };

  // //* Reset ObjUser khi click Cancel (phòng khi user click change password nhưng lại đổi ý nhấn close)
  const cancelEdit = () => {
    //* Reset objUser
    setObjUser({
      id: 0,
      nameBranchEN: "",
      nameBranchVN: "",
      phone: "",
      addressVN: "",
      addressEN: "",
      email: "",
      roomTotal: 0,
      manager: "",
      actived: true,
      dateCreated: "",
      dateUpdated: "",
      numberOfMember: [],
      roomType: [],
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
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Branch Name"
                name="name"
                value={objUser.nameBranchVN}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                label="Phone"
                name="phone"
                value={objUser.phone}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
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
                value={objUser.addressVN}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                label="Amount Room"
                name="roomTotal"
                value={objUser.roomTotal}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Manager"
                name="manager"
                value={objUser.manager}
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
                addBranch();
              }}
            >
              Aplly
            </CButton>
          ) : (
            <CButton className="btnEdit" onClick={() => editBranch()}>
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
