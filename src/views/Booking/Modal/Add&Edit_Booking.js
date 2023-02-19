//* Library
import React, { useEffect, useState } from "react";
import Api from "src/Api/axiosConfig";

//* Function feature
import { blockInvalidChar } from "src/components/Others/others";
import { checkDate } from "src/components/Others/others";

//* CORE UI + React Bootstrap
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const AddAndEditBooking = ({
  addVisible,
  setAddVisible,
  booking,
  setBooking,
  objBooking,
  setObjBooking,
  idBooking,
  getDataBooking,
  lockSelectBook,
  setLockSelectBook,
}) => {
  //* Get data Room to set index Branch, Type ,Kind
  const [roomData, setRoomData] = useState([]);
  const [roomDataType, setRoomDataType] = useState([]);

  //* Setup to binding data for Select Branch
  const [room, setRoom] = useState({
    branch: [],
    type: [],
    kind: [],
  });

  const [indexSelected, setIndexSelected] = useState({
    branch: 0,
    type: 0,
  });

  //* Set or Reset index of Branch selected
  useEffect(() => {
    if (
      objBooking.nameBranchVN === "choose" &&
      objBooking.nameBranchVN === ""
    ) {
      setIndexSelected({
        ...indexSelected,
        branch: 0,
      });
    } else {
      roomData.map((item, index) => {
        if (item.nameBranchVN === objBooking.nameBranchVN) {
          setIndexSelected({ ...indexSelected, branch: index });
        }
      });
    }
  }, [objBooking.nameBranchVN]);

  //* Set or Reset index of Room Type selected
  useEffect(() => {
    if (objBooking.roomType === "choose" && objBooking.roomType === "") {
      setIndexSelected({
        ...indexSelected,
        type: 0,
      });
    } else {
      roomDataType.map((item, index) => {
        if (item.type === objBooking.roomType) {
          setIndexSelected({ ...indexSelected, type: index });
        }
      });
    }
  }, [objBooking.roomType]);

  //* Get data to select Branch + Room Type + Room Kind (re-run when index of branch or roomType changed)
  useEffect(() => {
    Api.get("/listRooms")
      .then((response) => response.data)
      .then((data) => {
        //* Get data list room
        setRoomData(data);
        setRoomDataType(data[indexSelected.branch].roomType);

        //* Get info RoomType
        let BRANCH = ["choose"];
        let ROOMTYPE = ["choose"];
        let ROOMKIND = ["choose"];

        data.filter((item) =>
          BRANCH.push({
            value: item.nameBranchVN,
            label: item.nameBranchVN,
          })
        );

        data[indexSelected.branch].roomType.filter((item) =>
          ROOMTYPE.push({
            value: item.type,
            label: item.type,
          })
        );

        data[indexSelected.branch].roomType[indexSelected.type].typeR.filter(
          (item) =>
            ROOMKIND.push({
              value: item.name,
              label: item.name,
            })
        );

        setRoom({
          branch: BRANCH,
          type: ROOMTYPE,
          kind: ROOMKIND,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [indexSelected.branch, indexSelected.type]);

  //* Completed: Add User
  //* I - Get info user
  const getInfo = (e) => {
    if (e.target.name === "fullName") {
      setObjBooking({
        ...objBooking,
        fullName: e.target.value,
      });
    } else if (e.target.name === "birth") {
      setObjBooking({
        ...objBooking,
        date: e.target.value,
      });
    } else if (e.target.name === "sex") {
      if (e.target.value === "choose") {
        setObjBooking({
          ...objBooking,
          sex: "",
        });
      } else {
        setObjBooking({
          ...objBooking,
          sex: e.target.value,
        });
      }
    } else if (e.target.name === "identityCard") {
      setObjBooking({
        ...objBooking,
        identityCard: e.target.value,
      });
    } else if (e.target.name === "nationality") {
      if (e.target.value === "choose") {
        setObjBooking({
          ...objBooking,
          nationality: "",
        });
      } else {
        setObjBooking({
          ...objBooking,
          nationality: e.target.value,
        });
      }
    } else if (e.target.name === "email") {
      setObjBooking({
        ...objBooking,
        email: e.target.value,
      });
    } else if (e.target.name === "address") {
      setObjBooking({
        ...objBooking,
        address: e.target.value,
      });
    } else if (e.target.name === "branch") {
      //* Get select branch
      if (e.target.value === "choose") {
        setLockSelectBook({ ...lockSelectBook, type: true, kind: true });
        setObjBooking({
          ...objBooking,
          nameBranchVN: "",
          roomType: "",
          typeR: "",
        });
      } else {
        if (objBooking.nameBranchVN !== e.target.value) {
          setLockSelectBook({ ...lockSelectBook, type: false, kind: true });
          setObjBooking({
            ...objBooking,
            nameBranchVN: e.target.value,
            roomType: "",
            typeR: "",
          });
        }
      }
    } else if (e.target.name === "type") {
      //* Get select roomType
      if (e.target.value === "choose") {
        setLockSelectBook({ ...lockSelectBook, kind: true });
        setObjBooking({
          ...objBooking,
          roomType: "",
          typeR: "",
        });
      } else {
        setLockSelectBook({ ...lockSelectBook, kind: false });
        setObjBooking({
          ...objBooking,
          roomType: e.target.value,
        });
      }
    } else if (e.target.name === "kind") {
      //* Get select roomKind
      if (e.target.value === "choose") {
        setObjBooking({
          ...objBooking,
          typeR: "",
        });
      } else {
        setObjBooking({
          ...objBooking,
          typeR: e.target.value,
        });
      }
    } else if (e.target.name === "date check in") {
      setObjBooking({
        ...objBooking,
        checkIn: {
          time: objBooking.checkIn.time,
          date: e.target.value,
        },
      });
    } else if (e.target.name === "time check in") {
      setObjBooking({
        ...objBooking,
        checkIn: {
          time: e.target.value,
          date: objBooking.checkIn.date,
        },
      });
    } else if (e.target.name === "date check out") {
      setObjBooking({
        ...objBooking,
        checkOut: {
          time: objBooking.checkOut.time,
          date: e.target.value,
        },
      });
    } else if (e.target.name === "time check out") {
      setObjBooking({
        ...objBooking,
        checkOut: {
          time: e.target.value,
          date: objBooking.checkOut.date,
        },
      });
    } else if (e.target.name === "phone") {
      //* Create dateCreated + dateUpdated luôn tại đây
      var today = new Date();
      var day = String(today.getDate()).padStart(2, "0");
      var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var year = String(today.getFullYear());
      var hour = String(today.getHours()).padStart(2, "0");
      var minutes = String(today.getMinutes()).padStart(2, "0");
      today = `${hour}h${minutes} ${day}-${month}-${year}`;
      setObjBooking({
        ...objBooking,
        dateCreated: today,
        dateUpdated: today,
        phone: e.target.value,
      });
    }
  };

  //* II - Check Booking
  //* 1 - Check Text Empty ?
  var checkEmpty = true;
  const checkTextEmpty = () => {
    for (const key in objBooking) {
      if (objBooking[key] === "") {
        return (checkEmpty = false);
      } else {
        checkEmpty = true;
      }
    }
  };

  //* 2 - Check text chứa toàn khoảng trắng
  var checkSpace = true;
  const checkTextSpace = () => {
    for (const key in objBooking) {
      var check = String(objBooking[key]).replace(/\s/g, "").length;
      if (!check) {
        console.log("loi");
        return (checkSpace = false);
      } else {
        checkSpace = true;
      }
    }
  };

  // FIXME:
  //* 3 - check date invalid
  const checkDateInvalid = () => {
    return checkDate(objBooking.checkIn.date, objBooking.checkOut.date)
      ? true
      : false;
  };

  //* 4 - check Branch actived ?
  const checkBranch = () => {
    return roomData.some(
      (branch) =>
        branch.nameBranchVN === objBooking.nameBranchVN && branch.actived
    );
  };

  //* 5 - check RoomType actived ?
  const checkRoomType = () => {
    return roomData[indexSelected.branch].roomType.some(
      (item) => item.type === objBooking.roomType && item.actived
    );
  };

  //* 6 - check RoomKind actived ?
  const checkRoomKind = () => {
    return roomData[indexSelected.branch].roomType[
      indexSelected.type
    ].typeR.some((item) => item.name === objBooking.typeR && item.actived);
  };

  // TODO: check room amount ?
  //* Nếu đủ phòng trống thì add booking. Ngược lại, check tiếp date
  // TODO: check date in listBooking

  //* III - Add Booking
  const addBooking = () => {
    //* Run function check
    checkTextEmpty();
    checkTextSpace();

    console.log(checkBranch());
    // TODO: Check còn phòng không

    //* Check invalid CheckEmpty + CheckSpace + CheckEmail
    if (
      checkEmpty &&
      checkSpace &&
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(objBooking.email) &&
      checkDateInvalid() &&
      checkBranch() &&
      checkRoomType() &&
      checkRoomKind()
    ) {
      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjBooking({ ...objBooking, id: booking.length + 1 });

      //* Add objUser into User
      Api.post("/listBooking", objBooking)
        .then(() => {
          //* Get lại data
          getDataBooking();

          //* Close Modal
          setAddVisible(false);

          //* Reset objBooking
          setObjBooking({
            id: 0,
            fullName: "",
            date: "",
            sex: "",
            identityCard: "",
            nationality: "",
            phone: "",
            email: "",
            address: "",
            dateCreated: "",
            dateUpdated: "",
            nameBranchVN: "",
            roomType: "",
            typeR: "",
            numberRoom: 310,
            checkIn: {
              time: "",
              date: "",
            },
            checkOut: {
              time: "",
              date: "",
            },
            confirm: false,
            paied: false,
            cancel: false,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (!checkEmpty) {
      alert("input khônng được trống");
    } else if (!checkSpace) {
      alert("input chứa toàn khoảng trắng");
    } else if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(objBooking.email) ==
      false
    ) {
      alert(`Email: ${objBooking.email} invalid`);
    } else if (!checkDateInvalid()) {
      alert("date invalid");
    } else if (!checkBranch()) {
      alert(`Branch ${objBooking.nameBranchVN} not actived`);
    } else if (!checkRoomType()) {
      alert(`Room Type ${objBooking.roomType} not actived`);
    } else if (!checkRoomKind()) {
      alert(`Room Kind ${objBooking.typeR} not actived`);
    }
  };

  //* Completed: Edit Booking
  //* Update state
  const editBooking = () => {
    //* set item editted
    Api.put(`/listBooking/${objBooking.id}`, objBooking)
      .then(() => {
        //* Get lại data
        getDataBooking();

        //* Reset objBooking
        setObjBooking({
          id: 0,
          fullName: "",
          date: "",
          sex: "",
          identityCard: "",
          nationality: "",
          phone: "",
          email: "",
          address: "",
          dateCreated: "",
          dateUpdated: "",
          nameBranchVN: "",
          roomType: "",
          typeR: "",
          numberRoom: 310,
          checkIn: {
            time: "",
            date: "",
          },
          checkOut: {
            time: "",
            date: "",
          },
          confirm: false,
          paied: false,
          cancel: false,
        });

        //* Close Modal
        setAddVisible(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Reset ObjUser khi click Cancel (phòng khi user click change password nhưng lại đổi ý nhấn close)
  const cancelEdit = () => {
    //* Reset objBooking
    setObjBooking({
      id: 0,
      fullName: "",
      date: "",
      sex: "",
      identityCard: "",
      nationality: "",
      phone: "",
      email: "",
      address: "",
      dateCreated: "",
      dateUpdated: "",
      nameBranchVN: "",
      roomType: "",
      typeR: "",
      numberRoom: 310,
      checkIn: {
        time: "",
        date: "",
      },
      checkOut: {
        time: "",
        date: "",
      },
      confirm: false,
      paied: false,
      cancel: false,
    });

    //* Close Modal
    setAddVisible(false);
  };

  return (
    <React.Fragment>
      <CModal scrollable visible={addVisible} backdrop="static" size="xl">
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={4}>
              <CFormInput
                type="text"
                label="Full Name"
                name="fullName"
                value={objBooking.fullName}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="date"
                label="Birth"
                name="birth"
                value={objBooking.date}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Sex"
                aria-label="Default select example"
                name="sex"
                value={objBooking.sex}
                onChange={getInfo}
                options={[
                  "Choose",
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                label="Identity Card"
                name="identityCard"
                value={objBooking.identityCard}
                onChange={getInfo}
                onKeyDown={blockInvalidChar}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Nationality"
                aria-label="Default select example"
                name="nationality"
                value={objBooking.nationality}
                onChange={getInfo}
                options={[
                  "Choose",
                  { label: "Viet Nam", value: "Viet Nam" },
                  { label: "USA", value: "USA" },
                  { label: "France", value: "France" },
                  { label: "Italia", value: "Italia" },
                ]}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="email"
                label="Email"
                name="email"
                value={objBooking.email}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Address"
                name="address"
                value={objBooking.address}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                label="Phone Number"
                name="phone"
                value={objBooking.phone}
                onChange={getInfo}
                onKeyDown={blockInvalidChar}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Branch"
                aria-label="Default select example"
                name="branch"
                value={objBooking.nameBranchVN}
                onChange={getInfo}
                options={room.branch}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Type"
                aria-label="Default select example"
                name="type"
                disabled={lockSelectBook.type}
                value={objBooking.roomType}
                onChange={getInfo}
                options={room.type}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Kind"
                aria-label="Default select example"
                name="kind"
                disabled={lockSelectBook.kind}
                value={objBooking.typeR}
                onChange={getInfo}
                options={room.kind}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="date"
                label="Date Check in"
                name="date check in"
                value={objBooking.checkIn.date}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="time"
                label="Time Check In"
                name="time check in"
                value={objBooking.checkIn.time}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="date"
                label="Date Check out"
                name="date check out"
                value={objBooking.checkOut.date}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="time"
                label="Time Check out"
                name="time check out"
                value={objBooking.checkOut.time}
                onChange={getInfo}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton className="btnCancel" onClick={() => cancelEdit()}>
            Cancel
          </CButton>
          {objBooking.id == false ? (
            <CButton
              color="primary"
              className="btnAdd"
              onClick={() => addBooking()}
            >
              Aplly
            </CButton>
          ) : (
            <CButton className="btnEdit" onClick={() => editBooking()}>
              Edit
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
