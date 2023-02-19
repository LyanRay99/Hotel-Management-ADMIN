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
} from "@coreui/react";

export const AddAndEditRoomType = ({
  addVisible,
  setAddVisible,
  objUser,
  setObjUser,
  branch,
  indexBranch,
  getDataRoomType,
  ROOMTYPE,
}) => {
  //* Completed: Add RoomType
  //* 1 - Get info RoomType
  const getInfo = (e) => {
    if (e.target.name === "type") {
      setObjUser({ ...objUser, type: e.target.value });
    } else if (e.target.name === "price") {
      setObjUser({ ...objUser, price: e.target.value });
    } else if (e.target.name === "image") {
      const file = e.target.files[0];
      setObjUser({
        ...objUser,
        image: e.target.value,
        imageOurRoom: e.target.value,
        imageDetail: [e.target.value, e.target.value],
      });
      const jsonString = JSON.stringify(e.target.value);
      localStorage.setItem("myData", jsonString);
    } else if (e.target.name === "maxPerson") {
      setObjUser({ ...objUser, max_person: e.target.value });
    } else if (e.target.name === "roomTotal") {
      setObjUser({ ...objUser, roomTotal: e.target.value });
    } else if (e.target.name === "introduction") {
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
        introduction: e.target.value,
      });
    }
  };

  //* Check Text Empty ?
  var checkEmpty = true;
  const checkTextEmpty = () => {
    //* Bây giờ mới set ID để thay đổi UI button trong Modal
    setObjUser({
      ...objUser,
      id: branch[indexBranch].roomType.length + 1,
      price: `$${objUser.price}`,
      introduction: `<p>${objUser.introduction}</p>`,
    });

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
      var check = String(objUser[key]).replace(/\s/g, "").length;
      if (!check && key !== "typeR") {
        console.log("loi");
        return (checkSpace = false);
      } else {
        checkSpace = true;
      }
    }
  };

  //* 3 - Add RoomType
  const addRoomType = () => {
    //* Run function check
    checkTextEmpty();
    checkTextSpace();

    //* Check invalid CheckEmpty + CheckSpace + CheckEmail
    if (checkEmpty && checkSpace) {
      //* Get info to Add RoomType
      branch[indexBranch].roomType.push(objUser);

      //* Add objUser into User
      Api.put(`/listRooms/${branch[indexBranch].id}`, branch[indexBranch])
        .then(() => {
          //* Get lại data
          getDataRoomType();

          //* Close Modal
          setAddVisible(false);
        })
        .catch((err) => {
          console.error(err);
        });

      //* Reset objUser
      setObjUser({
        id: 0,
        type: "",
        price: "",
        image: "",
        imageOurRoom: "",
        imageDetail: [],
        max_person: "",
        introduction: "",
        roomTotal: "",
        dateCreated: "",
        dateUpdated: "",
        actived: true,
        typeR: [],
      });
    } else if (!checkEmpty) {
      alert("input khônng được trống");
    } else if (!checkSpace) {
      alert("input chứa toàn khoảng trắng");
    }
  };

  //* Completed: Edit RoomType
  //* Update state
  const editRoomType = () => {
    branch[indexBranch].roomType[ROOMTYPE.index] = objUser;
    branch[indexBranch].roomType[
      ROOMTYPE.index
    ].introduction = `<p>${objUser.introduction}</p>`;
    const BranchObj = branch[indexBranch];

    console.log(BranchObj);
    //* set item editted
    Api.put(`/listRooms/${branch[indexBranch].id}`, BranchObj)
      .then(() => {
        //* Get lại data
        getDataRoomType();
      })
      .then(() => {
        //* Reset objUser
        setObjUser({
          id: 0,
          type: "",
          price: "",
          image: "",
          imageOurRoom: "",
          imageDetail: [],
          max_person: "",
          introduction: "",
          roomTotal: "",
          dateCreated: "",
          dateUpdated: "",
          actived: true,
          typeR: [],
        });

        //* Close Modal
        setAddVisible(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Reset ObjUser khi click Cancel
  const cancelEdit = () => {
    //* Reset objUser
    setObjUser({
      id: 0,
      type: "",
      price: "",
      image: "",
      imageOurRoom: "",
      imageDetail: [],
      max_person: "",
      introduction: "",
      roomTotal: "",
      dateCreated: "",
      dateUpdated: "",
      actived: true,
      typeR: [],
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
                label="Type Name"
                name="type"
                value={objUser.type}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                label="Price"
                name="price"
                value={objUser.price}
                onChange={getInfo}
                onKeyDown={blockInvalidChar}
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
                type="number"
                label="Max Person"
                name="maxPerson"
                value={objUser.max_person}
                onChange={getInfo}
                onKeyDown={blockInvalidChar}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                label="Total Room"
                name="roomTotal"
                value={objUser.roomTotal}
                onChange={getInfo}
                onKeyDown={blockInvalidChar}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                label="Introduction"
                name="introduction"
                value={objUser.introduction}
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
                addRoomType();
              }}
            >
              Aplly
            </CButton>
          ) : (
            <CButton className="btnEdit" onClick={() => editRoomType()}>
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
