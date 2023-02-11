//* Library
import React, { useState } from "react";
import axios from "axios";
import Api from "src/Api/axiosConfig";

//* CORE UI + React Bootstrap
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CForm,
  CCol,
  CFormInput,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export const ChangePassword = ({
  showCP,
  setShowCP,
  indexUser,
  user,
  setUser,
}) => {
  const [password, setPassword] = useState("");
  const [changePasswordUI, setChangePasswordUI] = useState(true);

  //* Get password
  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  //* Check current password
  const checkPassword = () => {
    if (password === user[indexUser].password) {
      setChangePasswordUI(false);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  //* Change new Password + set password
  const changePassword = () => {
    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[@]/.test(password) &&
      !/\s/.test(password) &&
      password.length > 9
    ) {
      const updatedData = [...user];
      updatedData[indexUser].password = password;

      Api.put(
        `http://localhost:8000/listUser/${user[indexUser].id}`,
        updatedData[indexUser]
      ).catch((err) => {
        console.error(err);
      });

      setShowCP(false);
      setPassword("");
    } else {
      alert(
        "Password phải chứa đủ chữ hoa, chữ thường, số, ký tự đặc biệt, dài hơn 9 ký tự và không chứa khoảng trắng"
      );
    }
  };

  //* Show/hide password
  const [inputType, setInputType] = useState("password");
  const showPassword = () => {
    var input = document.getElementsByClassName("inputCP");
    // console.log(input.password.type);

    if (input.password.type === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  //* Cancel change password
  const cancelChangePassword = () => {
    setShowCP(false);
    setInputType("password");
    setPassword("");
  };

  return (
    <React.Fragment>
      {/* Completed: Modal to change password User */}
      <CModal
        scrollable
        visible={showCP}
        backdrop="static"
        onClose={() => setShowCP(false)}
      >
        <CModalHeader>
          {changePassword ? (
            <CModalTitle>Enter Current Password</CModalTitle>
          ) : (
            <CModalTitle>Enter New Password</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={12} className="inputChangePassword">
              <CFormInput
                className="inputCP"
                type={inputType}
                placeholder={
                  changePasswordUI ? "Current Password" : "New Password"
                }
                name="password"
                value={password}
                onChange={getPassword}
              />

              <span className="showPassword" onClick={() => showPassword()}>
                <FontAwesomeIcon icon={faEye} />
              </span>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          {changePasswordUI ? (
            <CButton className="btnSubmit" onClick={() => checkPassword()}>
              Submit
            </CButton>
          ) : (
            <CButton className="btnAdd" onClick={() => changePassword()}>
              Apply
            </CButton>
          )}

          <CButton className="btnCancel" onClick={() => cancelChangePassword()}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
