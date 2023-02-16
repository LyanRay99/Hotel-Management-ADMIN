//* Library
import React, { useEffect } from "react";
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

export const DeleteBranch = ({
  showDlt,
  setShowDlt,
  branch,
  setBranch,
  idBranch,
  getDataBranch,
}) => {
  //* Completed: Delete User
  const deleteUser = () => {
    Api.delete(`/listRooms/${idBranch}`)
      .then(() => {
        //* Get lại data
        getDataBranch();

        //* close modal
        setShowDlt(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Get fullName of user
  var branchName = "";
  branch.map((item) => {
    if (item.id === idBranch) {
      return (branchName = item.nameBranchVN);
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
          Are you sure you want to delete Branch <strong>{branchName}</strong> ?
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
