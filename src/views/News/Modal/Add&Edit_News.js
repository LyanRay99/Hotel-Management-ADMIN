//* Library
import React, { useEffect, useState } from "react";
import Api from "src/Api/axiosConfig";
import moment from "moment";
import Select from "react-select";

//* CORE UI + React Bootstrap
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CForm,
  CCol,
  CFormInput,
} from "@coreui/react";

export const AddAndEditNews = ({
  addVisible,
  setAddVisible,
  news,
  setNews,
  objUser,
  setObjUser,
  getDataNews,
  indexNews,
}) => {
  //* Data to select choose Tags
  const tagsOption = [
    {
      label: "Food Dinner",
      value: "Food Dinner",
    },
    {
      label: "Tralvel",
      value: "Tralvel",
    },
    {
      label: "Relax",
      value: "Relax",
    },
  ];

  //* Get info Tags to binding data when click edit
  var defaltTags = [];
  objUser.tags.map((item) => {
    defaltTags.push({
      label: item,
      value: item,
    });
  });

  //* Completed: Add RoomType
  //* 1 - Get info RoomType
  const getInfo = (e) => {
    if (e.target.name === "name") {
      setObjUser({ ...objUser, name: e.target.value });
    } else if (e.target.name === "time") {
      setObjUser({
        ...objUser,
        time: `${e.target.value} ${
          objUser.time.slice(0, 2) > 12 ? "PM" : "AM"
        }, ${objUser.date} ${objUser.month} ${objUser.year}`,
      });
    } else if (e.target.name === "image") {
      setObjUser({
        ...objUser,
        image: e.target.value,
        imageMain: e.target.value,
        imageSup: e.target.value,
      });
    } else if (e.target.name === "date") {
      setObjUser({
        ...objUser,
        date: moment(e.target.value).format("DD"),
        monthNumber: moment(e.target.value).format("MM"),
        year: moment(e.target.value).format("YYYY"),
        month: moment(e.target.value).format("MMMM").toUpperCase(),
      });
    } else if (e.target.name === "author") {
      setObjUser({ ...objUser, author: e.target.value });
    } else if (e.target.name === "content") {
      //* Create dateCreated + dateUpdated luôn tại đây
      var today = new Date();
      var day = String(today.getDate()).padStart(2, "0");
      var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var year = String(today.getFullYear());
      var hour = String(today.getHours()).padStart(2, "0");
      var minutes = String(today.getMinutes()).padStart(2, "0");
      today = `${hour}h${minutes} ${day}-${month}-${year}`;
      setObjUser({
        ...objUser,
        dateCreated: today,
        dateUpdated: today,
        content: [e.target.value],
      });
    }

    // console.log(objUser);
  };

  //* 2 - Get info Tags
  const getInfoTags = (e) => {
    var TAGS = [];
    e.map((item) => {
      TAGS.push(item.value);
    });

    setObjUser({ ...objUser, tags: TAGS });
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
      if (!check && key !== "comment" && key !== "tags") {
        console.log("loi");
        return (checkSpace = false);
      } else {
        checkSpace = true;
      }
    }
  };

  //* 3 - Add RoomType
  const addRoomType = () => {
    //* Run function check
    checkTextEmpty();
    checkTextSpace();

    //* Check invalid CheckEmpty + CheckSpace + CheckEmail
    if (checkEmpty && checkSpace) {
      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjUser({ ...objUser, id: news.length + 1 });

      //* Add objUser into User
      Api.post(`/news_recent`, objUser)
        .then(() => {
          //* Get lại data
          getDataNews();

          //* Close Modal
          setAddVisible(false);

          //* Reset objUser
          setObjUser({
            id: 0,
            name: "",
            time: "",
            date: "",
            month: "",
            monthNumber: "",
            year: "",
            image: "",
            imageMain: "",
            imageSup: "",
            author: "",
            tags: [],
            content: [""],
            comment: [],
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

  //* Completed: Edit RoomType
  //* Update state
  const editNews = () => {
    //* set item editted
    Api.put(`/news_recent/${news[indexNews].id}`, objUser)
      .then(() => {
        //* Get lại data
        getDataNews();
      })
      .then(() => {
        //* Reset objUser
        setObjUser({
          id: 0,
          name: "",
          time: "",
          date: "",
          month: "",
          monthNumber: "",
          year: "",
          image: "",
          imageMain: "",
          imageSup: "",
          author: "",
          tags: [],
          content: [""],
          comment: [],
        });

        //* Close Modal
        setAddVisible(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Reset ObjUser khi click Cancel
  const cancelEdit = () => {
    //* Reset objUser
    setObjUser({
      id: 0,
      name: "",
      time: "",
      date: "",
      month: "",
      monthNumber: "",
      year: "",
      image: "",
      imageMain: "",
      imageSup: "",
      author: "",
      tags: [],
      content: [""],
      comment: [],
    });

    //* Close Modal
    setAddVisible(false);
  };

  return (
    <React.Fragment>
      {/* Completed: Modal to get info, Add and Edit User */}
      <CModal scrollable visible={addVisible} backdrop="static" size="xl">
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                label="Name"
                name="name"
                value={objUser.name}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="date"
                label="Date"
                name="date"
                value={`${objUser.year}-${objUser.monthNumber}-${objUser.date}`}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="time"
                label="Time"
                name="time"
                value={objUser.time.slice(0, 5)}
                onChange={getInfo}
                disabled={objUser.date ? false : true}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type={objUser.image ? "text" : "file"}
                label="Image"
                name="image"
                value={objUser.image}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                label="Author"
                name="author"
                value={objUser.author}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                label="Content"
                name="content"
                value={objUser.content[0]}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <label style={{ padding: "4px 0px" }}>Tags</label>
              <Select
                isMulti
                name="tags"
                defaultValue={defaltTags}
                options={tagsOption}
                onChange={getInfoTags}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          {objUser.id == false ? (
            <CButton
              color="primary"
              className="btnAdd"
              onClick={() => {
                addRoomType();
              }}
            >
              Aplly
            </CButton>
          ) : (
            <CButton className="btnEdit" onClick={() => editNews()}>
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
