//* Library
import React, { useEffect, useState } from "react";
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

export const AddAndEditBanner = ({
  addVisible,
  setAddVisible,
  slider,
  setSlider,
  objUser,
  setObjUser,
  idBanner,
  getDataSlider,
}) => {
  //* Completed: Add User
  //* 1 - Get info user
  const getInfo = (e) => {
    if (e.target.name === "name") {
      setObjUser({ ...objUser, name: e.target.value });
    } else if (e.target.name === "image") {
      setObjUser({ ...objUser, image: e.target.value });
    } else if (e.target.name === "content") {
      //* Create dateCreated + dateUpdated luôn tại đây
      var today = new Date();
      var day = String(today.getDate()).padStart(2, "0");
      var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var year = String(today.getFullYear());
      var hour = String(today.getHours()).padStart(2, "0");
      var minutes = String(today.getMinutes()).padStart(2, "0");
      today = `${hour}h${minutes} ${day}-${month}-${year}`;
      setObjUser({
        ...objUser,
        dateCreated: today,
        dateUpdated: today,
        content: e.target.value,
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
    if (checkEmpty && checkSpace) {
      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjUser({ ...objUser, id: slider.length + 1 });

      //* Add objUser into User
      Api.post("/listSlider", objUser)
        .then(() => {
          //* Get lại data
          getDataSlider();

          //* Close Modal
          setAddVisible(false);

          //* Reset objUser
          setObjUser({
            id: 0,
            name: "",
            image: "",
            content: "",
            actived: true,
            dateCreated: "",
            dateUpdated: "",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (!checkEmpty) {
      alert("input khônng được trống");
    } else if (!checkSpace) {
      alert("input chứa toàn khoảng trắng");
    }
  };

  //* Update state
  const editBanner = () => {
    //* set item editted
    Api.put(`/listSlider/${idBanner}`, objUser)
      .then(() => {
        //* Get lại data
        getDataSlider();

        //* Reset objUser
        setObjUser({
          id: 0,
          name: "",
          image: "",
          content: "",
          actived: true,
          dateCreated: "",
          dateUpdated: "",
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
      name: "",
      image: "",
      content: "",
      actived: true,
      dateCreated: "",
      dateUpdated: "",
    });

    //* Close Modal
    setAddVisible(false);
  };

  return (
    <React.Fragment>
      {/* Completed: Modal to get info, Add and Edit */}
      <CModal scrollable visible={addVisible} backdrop="static" size="xl">
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={4}>
              <CFormInput
                type="text"
                label="Name"
                name="name"
                value={objUser.name}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type={objUser.image ? "text" : "file"}
                label="Image"
                name="image"
                value={objUser.image}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                label="Content"
                name="content"
                value={objUser.content}
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
              onClick={() => addUser()}
            >
              Aplly
            </CButton>
          ) : (
            <CButton className="btnEdit" onClick={() => editBanner()}>
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
