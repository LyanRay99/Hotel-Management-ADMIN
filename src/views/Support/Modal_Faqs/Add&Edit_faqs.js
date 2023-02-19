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

export const AddAndEditAbout = ({
  addVisible,
  setAddVisible,
  about,
  setAbout,
  objUser,
  setObjUser,
  idAbout,
  getDataAbout,
}) => {
  //* Completed: Add User
  //* 1 - Get info user
  const getInfo = (e) => {
    if (e.target.name === "title") {
      setObjUser({ ...objUser, title: e.target.value });
    } else if (e.target.name === "image") {
      setObjUser({ ...objUser, image: e.target.value });
    } else if (e.target.name === "content") {
      setObjUser({
        ...objUser,
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
  const addAbout = () => {
    //* Run function check
    checkTextEmpty();
    checkTextSpace();

    //* Check invalid CheckEmpty + CheckSpace + CheckEmail
    if (checkEmpty && checkSpace) {
      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjUser({ ...objUser, id: about.length + 1 });

      //* Add objUser into User
      Api.post("/aboutUs_Page", objUser)
        .then(() => {
          //* Get lại data
          getDataAbout();

          //* Close Modal
          setAddVisible(false);

          //* Reset objUser
          setObjUser({
            id: 0,
            title: "",
            content: "",
            image: "",
            actived: true,
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
  const editAbout = () => {
    //* set item editted
    Api.put(`/aboutUs_Page/${idAbout}`, objUser)
      .then(() => {
        //* Get lại data
        getDataAbout();

        //* Reset objUser
        setObjUser({
          id: 1,
          title: "",
          content: "",
          image: "",
          actived: true,
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
      title: "",
      content: "",
      image: "",
      actived: true,
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
                label="Title"
                name="title"
                value={objUser.title}
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
              onClick={() => addAbout()}
            >
              Aplly
            </CButton>
          ) : (
            <CButton className="btnEdit" onClick={() => editAbout()}>
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
