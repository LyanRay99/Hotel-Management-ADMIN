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

export const AddAndEditFaqs = ({
  addVisible,
  setAddVisible,
  faqs,
  setFaqs,
  objUser,
  setObjUser,
  idFaqs,
  getDataFaqs,
}) => {
  //* Completed: Add
  //* 1 - Get info
  const getInfo = (e) => {
    if (e.target.name === "title") {
      setObjUser({ ...objUser, title: e.target.value });
    } else if (e.target.name === "question") {
      setObjUser({
        ...objUser,
        content: [
          {
            question: e.target.value,
            answer: objUser.content[0].answer,
          },
        ],
      });
    } else if (e.target.name === "answer") {
      setObjUser({
        ...objUser,
        content: [
          {
            question: objUser.content[0].question,
            answer: e.target.value,
          },
        ],
      });
    }
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
      var check = String(objUser[key]).replace(/\s/g, "").length;
      if (!check) {
        console.log("loi");
        return (checkSpace = false);
      } else {
        checkSpace = true;
      }
    }
  };

  //* 3 - Add Faqs
  const addFaqs = () => {
    //* Run function check
    checkTextEmpty();
    checkTextSpace();

    //* Check invalid CheckEmpty + CheckSpace + CheckEmail
    if (checkEmpty && checkSpace) {
      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjUser({ ...objUser, id: faqs.length + 1 });

      //* Add objUser into User
      Api.post("/listFaqs", objUser)
        .then(() => {
          //* Get lại data
          getDataFaqs();

          //* Close Modal
          setAddVisible(false);

          //* Reset objUser
          setObjUser({
            id: 0,
            title: "",
            content: [
              {
                question: "",
                answer: "",
              },
            ],
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
    Api.put(`/listFaqs/${objUser.id}`, objUser)
      .then(() => {
        //* Get lại data
        getDataFaqs();

        //* Reset objUser
        setObjUser({
          id: 0,
          title: "",
          content: [
            {
              question: "",
              answer: "",
            },
          ],
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
      content: [
        {
          question: "",
          answer: "",
        },
      ],
    });

    //* Close Modal
    setAddVisible(false);
  };

  return (
    <React.Fragment>
      {/* Completed: Modal to get info, Add and Edit */}
      <CModal scrollable visible={addVisible} backdrop="static" size="lg">
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={12}>
              <CFormInput
                type="text"
                label="Title"
                name="title"
                value={objUser.title}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="text"
                label="Question"
                name="question"
                value={objUser.content[0].question}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="text"
                label="Answer"
                name="answer"
                value={objUser.content[0].answer}
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
              onClick={() => addFaqs()}
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
