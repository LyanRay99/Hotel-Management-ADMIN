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

export const DeleteRoomType = ({
  showDlt,
  setShowDlt,
  branch,
  RoomTYPE,
  indexBranch,
  getDataRoomType,
}) => {
  //* Completed: Delete RoomType
  const deleteRoomType = () => {
    //* Get info to delete
    const RoomTypeObj = branch[indexBranch].roomType.filter((item) => {
      return item.type !== RoomTYPE.nameRoomType.type;
    });

    const BranchObj = { ...branch[indexBranch], roomType: RoomTypeObj };

    Api.put(`/listRooms/${branch[indexBranch].id}`, BranchObj)
      .then(() => {
        //* Get lại data
        getDataRoomType();

        //* close modal
        setShowDlt(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      {/* Completed: Modal to change password User */}
      <CModal scrollable visible={showDlt} backdrop="static">
        <CModalHeader>
          <CModalTitle>Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete Room Type{" "}
          <strong>{RoomTYPE.nameRoomType.type}</strong> of Branch{" "}
          <strong>{RoomTYPE.nameBranch}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton className="btnSubmit" onClick={() => deleteRoomType()}>
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
