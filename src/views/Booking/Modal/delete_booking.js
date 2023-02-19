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

export const DeleteBooking = ({
  showDlt,
  setShowDlt,
  idBooking,
  booking,
  setBooking,
  getDataBooking,
}) => {
  //* Completed: Delete User
  const deleteBooking = () => {
    Api.delete(`/listBooking/${idBooking}`)
      .then(() => {
        //* Get lại data
        getDataBooking();

        //* close modal
        setShowDlt(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Get fullName of user
  var user_fullName = "";
  booking.map((item) => {
    if (item.id === idBooking) {
      return (user_fullName = item.fullName);
    }
  });

  return (
    <React.Fragment>
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
          Are you sure you want to delete booking of{" "}
          <strong>{user_fullName}</strong> ?
        </CModalBody>
        <CModalFooter>
          <CButton className="btnSubmit" onClick={() => deleteBooking()}>
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
