//* Library
import React from "react";
import Api from "src/Api/axiosConfig";

//* CORE UI
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
} from "@coreui/react";

export const DeleteAbout = ({
  showDlt,
  setShowDlt,
  idAbout,
  about,
  setAbout,
  getDataAbout,
}) => {
  //* Completed: Delete User
  const deleteAbout = () => {
    Api.delete(`/aboutUs_Page/${idAbout}`)
      .then(() => {
        //* Get lại data
        getDataAbout();

        //* close modal
        setShowDlt(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Get fullName of user
  var nameAbout = "";
  about.map((item) => {
    if (item.id === idAbout) {
      return (nameAbout = item.title);
    }
  });

  return (
    <React.Fragment>
      <CModal scrollable visible={showDlt} backdrop="static">
        <CModalHeader>
          <CModalTitle>Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete <strong>{nameAbout}</strong> ?
        </CModalBody>
        <CModalFooter>
          <CButton className="btnSubmit" onClick={() => deleteAbout()}>
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
