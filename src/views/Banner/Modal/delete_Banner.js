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

export const DeleteBanner = ({
  showDlt,
  setShowDlt,
  idBanner,
  slider,
  setSlider,
  getDataSlider,
}) => {
  //* Completed: Delete User
  const deleteSlider = () => {
    Api.delete(`/listSlider/${idBanner}`)
      .then(() => {
        //* Get lại data
        getDataSlider();

        //* close modal
        setShowDlt(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Get fullName of user
  var nameSlider = "";
  slider.map((item) => {
    if (item.id === idBanner) {
      return (nameSlider = item.name);
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
          Are you sure you want to delete <strong>{nameSlider}</strong> ?
        </CModalBody>
        <CModalFooter>
          <CButton className="btnSubmit" onClick={() => deleteSlider()}>
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
