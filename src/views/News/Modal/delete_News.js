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

export const DeleteNews = ({
  showDlt,
  setShowDlt,
  news,
  getDataNews,
  indexNews,
}) => {
  //* Completed: Delete RoomType
  const deleteNews = () => {
    //* Get info to delete

    Api.delete(`/news_recent/${news[indexNews].id}`)
      .then(() => {
        //* Get lại data
        getDataNews();

        //* close modal
        setShowDlt(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  var nameNews = "";
  news.map((item, index) => {
    if (index === indexNews) {
      return (nameNews = item.name);
    }
  });

  return (
    <React.Fragment>
      {/* Completed: Modal to change password User */}
      <CModal scrollable visible={showDlt} backdrop="static">
        <CModalHeader>
          <CModalTitle>Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete News <strong>{nameNews}</strong>
        </CModalBody>
        <CModalFooter>
          <CButton className="btnSubmit" onClick={() => deleteNews()}>
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
