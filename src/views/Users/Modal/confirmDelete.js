//* Library
import React from "react";
import axios from "axios";

//* CORE UI
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
} from "@coreui/react";

export const ConfirmDelete = ({ showDlt, setShowDlt, indexUser, user }) => {
  //* Completed: Delete User
  const deleteUser = () => {
    axios.delete(`http://localhost:8000/listUser/${indexUser}`).catch((err) => {
      console.error(err);
    });
  };

  //* Get fullName of user
  var user_fullName = "";
  user.map((item) => {
    if (item.id === indexUser) {
      return (user_fullName = item.fullName);
    }
  });

  return (
    <React.Fragment>
      {/* Completed: Modal to change password User */}
      <CModal
        scrollable
        visible={showDlt}
        backdrop="static"
        onClose={() => setShowDlt(false)}
      >
        <CModalHeader>
          <CModalTitle>Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete User <strong>{user_fullName}</strong>{" "}
          ?
        </CModalBody>
        <CModalFooter>
          <CButton className="btnSubmit" onClick={() => deleteUser()}>
            Confirm
          </CButton>

          <CButton className="btnCancel" onClick={() => setShowDlt(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
