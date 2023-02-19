//* Library
import React, { useEffect, useState } from "react";
import Api from "src/Api/axiosConfig";
import Select from "react-select";
import { customStyles } from "src/components/Others/others";

//* Components
import { AddAndEditBooking } from "./Modal/Add&Edit_Booking";
import { DeleteBooking } from "./Modal/delete_booking";

//* CORE UI + React Bootstrap
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
  CFormSwitch,
} from "@coreui/react";
import { Table, Button } from "react-bootstrap";

//* Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListBooking = () => {
  const [booking, setBooking] = useState([]);

  //* Call Api to binding data
  useEffect(() => {
    Api.get("/listBooking")
      .then((response) => response.data)
      .then((data) => {
        setBooking(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //* Function GET data Users
  const getDataBooking = () => {
    Api.get("/listBooking")
      .then((response) => response.data)
      .then((data) => {
        setBooking(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Open + Close Modal
  const [addVisible, setAddVisible] = useState(false);

  //* Completed: Add User
  //* 1 - Create Object empty to add
  var [objBooking, setObjBooking] = useState({
    // id: 0,
    // fullName: "",
    // date: "",
    // sex: "",
    // identityCard: "",
    // nationality: "",
    // phone: "",
    // email: "",
    // address: "",
    // dateCreated: "",
    // dateUpdated: "",
    // nameBranchVN: "",
    // roomType: "",
    // typeR: "",
    // numberRoom: 310,
    // checkIn: {
    //   time: "",
    //   date: "",
    // },
    // checkOut: {
    //   time: "",
    //   date: "",
    // },
    // confirm: false,
    // paied: false,
    // cancel: false,

    id: 0,
    fullName: "Nguyen Van A",
    date: "1991-10-01",
    sex: "male",
    identityCard: "201793356",
    nationality: "Viet Nam",
    phone: "0905234234",
    email: "nva@gmail.com",
    address: "abc strees",
    dateCreated: "13h30 23-02-2022",
    dateUpdated: "13h30 23-02-2022",
    nameBranchVN: "Panorama Phú Quốc",
    roomType: "Vip",
    typeR: "double bed room",
    numberRoom: 110,
    checkIn: {
      time: "13:04",
      date: "2023-02-01",
    },
    checkOut: {
      time: "01:04",
      date: "2023-02-06",
    },
    confirm: true,
    paied: true,
    cancel: false,
  });

  //* Completed: Get info to Edit User
  const [lockSelectBook, setLockSelectBook] = useState({
    type: true,
    kind: true,
  });

  const getInfoEdit = (booking) => {
    //* Open Modal
    setAddVisible(true);

    setLockSelectBook({
      type: false,
      kind: false,
    });

    //* Binding data of user to edit
    setObjBooking({
      id: booking.id,
      fullName: booking.fullName,
      date: booking.date,
      sex: booking.sex,
      identityCard: booking.identityCard,
      nationality: booking.nationality,
      phone: booking.phone,
      email: booking.email,
      address: booking.address,
      dateCreated: booking.dateCreated,
      dateUpdated: booking.dateUpdated,
      nameBranchVN: booking.nameBranchVN,
      roomType: booking.roomType,
      typeR: booking.typeR,
      numberRoom: booking.numberRoom,
      checkIn: {
        time: booking.checkIn.time,
        date: booking.checkIn.date,
      },
      checkOut: {
        time: booking.checkOut.time,
        date: booking.checkOut.date,
      },
      confirm: booking.confirm,
      paied: booking.paied,
      cancel: booking.cancel,
    });
  };

  //* Completed: Get info to Delete User
  const [showDlt, setShowDlt] = useState(false);
  const [idBooking, setIdBooking] = useState(0);
  const getInfoDelete = (bookingID) => {
    setIdBooking(bookingID);
    setShowDlt(true);
  };

  //* Completed: Sort Branch (Select)
  //* 1 - Create State
  const options = [
    {
      value: "Select All",
      label: "Select All",
    },
  ];

  const [selectBranch, setSelectBranch] = useState(options[0]);
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    Api.get("/listRooms")
      .then((response) => response.data)
      .then((data) => {
        setBranch(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //* 2 - Get data Branch to binding in select
  branch.map((item, index) => {
    options.push({
      value: item.nameBranchVN,
      label: item.nameBranchVN,
    });
  });

  //* Filter to setState booking (by Name Branch)
  const SelectBranchs = (selectedOption) => {
    setSelectBranch(selectedOption);
    if (selectedOption.value !== "Select All") {
      Api.get("/listBooking")
        .then((response) => {
          response.data;
          setBooking([
            ...response.data.filter((item) => {
              return item.nameBranchVN === selectedOption.label;
            }),
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      getDataBooking();
    }
  };

  //* Completed: Search User Name
  const [searchFullName, setSearchFullName] = useState("");
  const getInfoFullName = (e) => {
    setSearchFullName(() => e.target.value);

    if (e.target.value == "") {
      getDataBooking();
    } else {
      Api.get("/listBooking")
        .then((response) => response.data)
        .then((user) => {
          setBooking([
            ...user.filter((item) => {
              if (
                item.fullName
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              ) {
                return item;
              }
            }),
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    //* Reset Select (Select All)
    // setSelectRole(options[0]);
  };

  //* Completed: Active Confirm
  const activeConfirm = (BOOKING, e) => {
    if (!BOOKING.paied) {
      BOOKING.confirm = e.target.checked;
      Api.put(`/listBooking/${BOOKING.id}`, BOOKING)
        .then(() => {
          getDataBooking();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert(`User ${BOOKING.fullName} Paied`);
    }
  };

  //* Completed: Active Pay
  const activePay = (BOOKING, e) => {
    if (BOOKING.confirm) {
      BOOKING.paied = e.target.checked;
      Api.put(`/listBooking/${BOOKING.id}`, BOOKING)
        .then(() => {
          getDataBooking();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert(`User ${BOOKING.fullName} not confirm`);
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List Booking</CCardHeader>
        <CCardBody>
          <CRow>
            <div className="control">
              <div className="select">
                <div className="btn">
                  <Button variant="info" onClick={() => setAddVisible(true)}>
                    Add <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>

                <div className="formSelect">
                  <Select
                    value={selectBranch}
                    onChange={SelectBranchs}
                    options={options}
                    styles={customStyles}
                  />
                </div>
              </div>

              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Booking"
                  aria-label="Type String..."
                  aria-describedby="basic-addon1"
                  value={searchFullName}
                  onChange={getInfoFullName}
                />
              </div>
            </div>

            <div className="tableParent">
              <Table responsive="sm">
                <thead style={{ backgroundColor: "rgba(60, 75, 100,0.5)" }}>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Date of birth</th>
                    <th>Identity Card</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Branch</th>
                    <th>Room Type</th>
                    <th>Room Kind</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Confirm</th>
                    <th>Pay</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.map((booking, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{booking.fullName}</td>
                      <td>{booking.sex}</td>
                      <td>{booking.date}</td>
                      <td>{booking.identityCard}</td>
                      <td>{booking.phone}</td>
                      <td>{booking.email}</td>
                      <td>{booking.nameBranchVN}</td>
                      <td>{booking.roomType}</td>
                      <td>{booking.typeR}</td>
                      <td>
                        {booking.checkIn.time} {booking.checkIn.date}
                      </td>
                      <td>
                        {booking.checkOut.time} {booking.checkOut.date}
                      </td>
                      <td>
                        <CFormSwitch
                          checked={booking.confirm}
                          onChange={(e) => activeConfirm(booking, e)}
                        />
                      </td>
                      <td>
                        <CFormSwitch
                          checked={booking.paied}
                          onChange={(e) => activePay(booking, e)}
                        />
                      </td>
                      <td className="tdAction">
                        <span onClick={() => getInfoEdit(booking)}>
                          <FontAwesomeIcon icon={faPen} className="icon pen" />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="icon trash"
                            onClick={() => getInfoDelete(booking.id)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Completed: Modal Add + Edit User*/}
      <AddAndEditBooking
        addVisible={addVisible}
        setAddVisible={setAddVisible}
        booking={booking}
        setBooking={setBooking}
        objBooking={objBooking}
        setObjBooking={setObjBooking}
        idBooking={idBooking}
        getDataBooking={getDataBooking}
        lockSelectBook={lockSelectBook}
        setLockSelectBook={setLockSelectBook}
      />

      {/* Completed: Modal Confirm Delete */}
      <DeleteBooking
        showDlt={showDlt}
        setShowDlt={setShowDlt}
        idBooking={idBooking}
        booking={booking}
        setBooking={setBooking}
        getDataBooking={getDataBooking}
      />
    </>
  );
};

export default ListBooking;
