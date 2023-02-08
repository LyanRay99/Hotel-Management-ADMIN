//* Library
import React, { useEffect, useState } from 'react'

//* Data
import listBookData from '../../Data/list_booking.json'
import roomData from '../../Data/list_room'

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
  CFormCheck,
} from '@coreui/react'
import { Table, Button } from 'react-bootstrap'

//* Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ListBooking = () => {
  //* Get + binding data
  const [booking, setBooking] = useState(listBookData)

  //* Setup to binding data for Select Branch + roomType + roomKind
  const [room, setRoom] = useState(roomData)
  const branchName = room.map((item) => ({
    label: item.nameBranchVN,
    value: item.nameBranchVN,
  }))

  const roomTypes = room[0].roomType.map((item) => ({
    label: item.type,
    value: item.type,
  }))

  const roomKinds = room[0].roomType[0].typeR.map((item) => ({
    label: item.name,
    value: item.name,
  }))

  branchName.unshift('choose')
  roomTypes.unshift('choose')
  roomKinds.unshift('choose')

  //* Open + Close Modal
  const [addVisible, setAddVisible] = useState(false)

  //* Completed: Add User
  //* 1 - Create Object empty to add
  var [objBooking, setObjBooking] = useState({
    id: 0,
    fullName: '',
    date: '',
    sex: '',
    identityCard: '',
    nationality: '',
    phone: '',
    email: '',
    address: '',
    dateCreated: '',
    dateUpdated: '',
    nameBranchVN: '',
    roomType: '',
    typeR: '',
    numberRoom: 310,
    checkIn: '',
    checkOut: '',
    confirm: true,
    paied: true,
    cancel: false,
  })

  //* Custom data checkin + checkout
  var [checkIn, setCheckIn] = useState({
    date: objBooking.checkIn.slice(6, 16),
    time: `${objBooking.checkIn.slice(0, 2)}:${objBooking.checkIn.slice(3, 5)}`,
  })

  var [checkOut, setCheckOut] = useState({
    date: objBooking.checkOut.slice(6, 16),
    time: `${objBooking.checkOut.slice(0, 2)}:${objBooking.checkOut.slice(3, 5)}`,
  })

  //* 2 - Get info user
  const getInfo = (e) => {
    if (e.target.name === 'fullName') {
      setObjBooking({ ...objBooking, fullName: e.target.value })
    } else if (e.target.name === 'birth') {
      setObjBooking({ ...objBooking, date: e.target.value })
    } else if (e.target.name === 'sex') {
      setObjBooking({ ...objBooking, sex: e.target.value })
    } else if (e.target.name === 'identityCard') {
      setObjBooking({ ...objBooking, identityCard: e.target.value })
    } else if (e.target.name === 'nationality') {
      setObjBooking({ ...objBooking, nationality: e.target.value })
    } else if (e.target.name === 'email') {
      setObjBooking({ ...objBooking, email: e.target.value })
    } else if (e.target.name === 'address') {
      setObjBooking({ ...objBooking, address: e.target.value })
    } else if (e.target.name === 'phone') {
      setObjBooking({ ...objBooking, phone: e.target.value })
    } else if (e.target.name === 'branch') {
      setObjBooking({ ...objBooking, nameBranchVN: e.target.value })
    } else if (e.target.name === 'type') {
      setObjBooking({ ...objBooking, roomType: e.target.value })
    } else if (e.target.name === 'kind') {
      setObjBooking({ ...objBooking, typeR: e.target.value })
    } else if (e.target.name === 'date check in') {
      setCheckIn({ ...checkIn, date: e.target.value })
    } else if (e.target.name === 'time check in') {
      setCheckIn({ ...checkIn, time: e.target.value })
    } else if (e.target.name === 'date check out') {
      setCheckOut({ ...checkOut, date: e.target.value })
    } else if (e.target.name === 'time check out') {
      setCheckOut({ ...checkOut, time: e.target.value })
    }

    // console.log(objBooking)
  }

  //* Check Text Empty ?
  var checkEmpty = true
  const checkTextEmpty = () => {
    for (const key in objBooking) {
      if (objBooking[key] === '') {
        return (checkEmpty = false)
      } else {
        checkEmpty = true
      }
    }
  }

  //* Check text chứa toàn khoảng trắng
  var checkSpace = true
  const checkTextSpace = () => {
    for (const key in objBooking) {
      var check = String(objBooking[key]).replace(/\s/g, '').length
      if (!check) {
        console.log('loi')
        return (checkSpace = false)
      } else {
        checkSpace = true
      }
    }
  }

  //* 3 - Add User
  const addBooking = () => {
    //* Hoàn thiện data của objUser
    var today = new Date()
    var day = String(today.getDate()).padStart(2, '0')
    var month = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var year = today.getFullYear()
    var hour = today.getHours()
    var minutes = today.getMinutes()
    today = `${hour}h${minutes} ${day}-${month}-${year}`

    setObjBooking({
      ...objBooking,
      dateCreated: today,
      dateUpdated: today,
      checkIn: `${checkIn.time.slice(0, 2)}h${checkIn.time.slice(3, 5)} ${checkIn.date}`,
      checkOut: `${checkOut.time.slice(0, 2)}h${checkOut.time.slice(3, 5)} ${checkOut.date}`,
    })

    // console.log(objBooking)
    checkTextEmpty()
    checkTextSpace()

    //* Push into Array + Reset objUser
    if (checkEmpty && checkSpace) {
      // //* Custom date checkin + checkout
      // var [yearIN, monthIN, dayIN] = objBooking.checkIn.split('-')
      // var [yearOUT, monthOUT, dayOUT] = objBooking.checkIn.split('-')
      // setObjBooking({
      //   ...objBooking,
      //   checkIn: `${hour}h${minutes} ${yearIN}-${monthIN}-${dayIN}`,
      //   checkOut: `${hour}h${minutes} ${yearOUT}-${monthOUT}-${dayOUT}`,
      // })

      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjBooking({ ...objBooking, id: booking.length + 1 })

      //* Add objUser into User
      setBooking([...booking, objBooking])

      //* Close Modal
      setAddVisible(false)

      //* Reset objUser
      setObjBooking({
        id: 0,
        fullName: '',
        date: '',
        sex: '',
        identityCard: '',
        nationality: '',
        phone: '',
        email: '',
        address: '',
        dateCreated: '',
        dateUpdated: '',
        nameBranchVN: '',
        roomType: '',
        typeR: '',
        numberRoom: 310,
        checkIn: '',
        checkOut: '',
        confirm: true,
        paied: true,
        cancel: false,
      })
    } else {
      console.log('error')
    }
  }

  //* Completed: Edit User
  const getInfoEdit = (booking) => {
    //* Open Modal
    setAddVisible(true)

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
      numberRoom: 310,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      confirm: booking.confirm,
      paied: booking.paied,
      cancel: booking.cancel,
    })

    setCheckIn({
      date: booking.checkIn.slice(6, 16),
      time: `${booking.checkIn.slice(0, 2)}:${booking.checkIn.slice(3, 5)}`,
    })

    setCheckOut({
      date: booking.checkOut.slice(6, 16),
      time: `${booking.checkOut.slice(0, 2)}:${booking.checkOut.slice(3, 5)}`,
    })
  }

  const editBooking = () => {
    //* set lại checkin + checkout
    setObjBooking({
      ...objBooking,
      checkIn: `${checkIn.time.slice(0, 2)}h${checkIn.time.slice(3, 5)} ${checkIn.date}`,
      checkOut: `${checkOut.time.slice(0, 2)}h${checkOut.time.slice(3, 5)} ${checkOut.date}`,
    })

    console.log(objBooking.checkIn)

    //* set item sau khi editted
    setBooking(
      booking.map((item) => {
        if (item.id === objBooking.id) {
          console.log(item)
          item = objBooking
        }
        return item
      }),
    )

    //* Reset objUser
    setObjBooking({
      id: 0,
      fullName: '',
      date: '',
      sex: '',
      identityCard: '',
      nationality: '',
      phone: '',
      email: '',
      address: '',
      dateCreated: '',
      dateUpdated: '',
      nameBranchVN: '',
      roomType: '',
      typeR: '',
      numberRoom: 310,
      checkIn: '',
      checkOut: '',
      confirm: true,
      paied: true,
      cancel: false,
    })

    //* Close Modal
    setAddVisible(false)
  }

  const resetCheckIn_Out = () => {
    console.log(objBooking.checkIn)
    //* Reset state Checkin + checkout
    setCheckIn({
      date: objBooking.checkIn.slice(6, 16),
      time: `${objBooking.checkIn.slice(0, 2)}:${objBooking.checkIn.slice(3, 5)}`,
    })

    setCheckOut({
      date: objBooking.checkOut.slice(6, 16),
      time: `${objBooking.checkOut.slice(0, 2)}:${objBooking.checkOut.slice(3, 5)}`,
    })
    console.log(objBooking.checkIn)
  }

  //* Reset Modal khi click Cancel
  const cancelEdit = () => {
    //* Reset objUser
    setObjBooking({
      id: 0,
      fullName: '',
      date: '',
      sex: '',
      identityCard: '',
      nationality: '',
      phone: '',
      email: '',
      address: '',
      dateCreated: '',
      dateUpdated: '',
      nameBranchVN: '',
      roomType: '',
      typeR: '',
      numberRoom: 310,
      checkIn: '',
      checkOut: '',
      confirm: true,
      paied: true,
      cancel: false,
    })

    //* Close Modal
    setAddVisible(false)
  }

  //* Completed: Delete User
  const deleteBooking = (indexS) => {
    setBooking([
      ...booking.filter((booking, index) => {
        return index !== indexS
      }),
    ])
  }

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
              </div>

              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Booking"
                  aria-label="Type String..."
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <div className="tableParent">
              <Table responsive="sm">
                <thead style={{ backgroundColor: 'rgba(60, 75, 100,0.5)' }}>
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
                      <td>{booking.checkIn}</td>
                      <td>{booking.checkOut}</td>
                      <td>
                        <span className="tdAction__active">
                          <label className="container">
                            <input type="checkbox" id="check" />
                            <span></span>
                          </label>
                        </span>
                      </td>
                      <td>
                        <span className="tdAction__active">
                          <label className="container">
                            <input type="checkbox" id="check" />
                            <span></span>
                          </label>
                        </span>
                      </td>
                      <td className="tdAction">
                        <span>
                          <FontAwesomeIcon icon={faKey} className="icon key" />
                        </span>
                        <span onClick={() => getInfoEdit(booking)}>
                          <FontAwesomeIcon icon={faPen} className="icon pen" />
                        </span>
                        <span onClick={() => deleteBooking(index)}>
                          <FontAwesomeIcon icon={faTrash} className="icon trash" />
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

      {/* Completed: Modal to get info and Add Booking */}
      <CModal
        scrollable
        visible={addVisible}
        backdrop="static"
        size="xl"
        onClose={() => setAddVisible(false)}
      >
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
                  'Choose',
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
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
                  'Choose',
                  { label: 'Viet Nam', value: 'Viet Nam' },
                  { label: 'USA', value: 'USA' },
                  { label: 'France', value: 'France' },
                  { label: 'Italia', value: 'Italia' },
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
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Branch"
                aria-label="Default select example"
                name="branch"
                value={objBooking.nameBranchVN}
                onChange={getInfo}
                options={branchName}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Type"
                aria-label="Default select example"
                name="type"
                value={objBooking.roomType}
                onChange={getInfo}
                options={roomTypes}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Kind"
                aria-label="Default select example"
                name="kind"
                value={objBooking.typeR}
                onChange={getInfo}
                options={roomKinds}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="date"
                label="Date Check in"
                name="date check in"
                value={checkIn.date}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="time"
                label="Time Check In"
                name="time check in"
                value={checkIn.time}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="date"
                label="Date Check out"
                name="date check out"
                value={checkOut.date}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="time"
                label="Time Check out"
                name="time check out"
                value={checkOut.time}
                onChange={getInfo}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            className="btnCancel"
            onClick={() => {
              cancelEdit()
              resetCheckIn_Out()
            }}
          >
            Cancel
          </CButton>
          {objBooking.id == false ? (
            <CButton
              color="primary"
              className="btnAdd"
              onClick={() => {
                addBooking()
              }}
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
    </>
  )
}

export default ListBooking
