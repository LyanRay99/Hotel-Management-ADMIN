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

export const DeleteFaqs = ({
  showDlt,
  setShowDlt,
  faqs,
  setFaqs,
  idFaqs,
  getDataFaqs,
}) => {
  //* Completed: Delete User
  const deleteFaqs = () => {
    Api.delete(`/listFaqs/${idFaqs}`)
      .then(() => {
        //* Get lại data
        getDataFaqs();

        //* close modal
        setShowDlt(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Get fullName of user
  var nameFaqs = "";
  faqs.map((item) => {
    if (item.id === idFaqs) {
      return (nameFaqs = item.title);
    }
  });

  return (
    <React.Fragment>
      <CModal scrollable visible={showDlt} backdrop="static">
        <CModalHeader>
          <CModalTitle>Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete title: <strong>{nameFaqs}</strong> ?
        </CModalBody>
        <CModalFooter>
          <CButton className="btnSubmit" onClick={() => deleteFaqs()}>
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
