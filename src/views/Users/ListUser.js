//* Library
import React, { useEffect, useState } from 'react'

//* Data
import userData from '../../Data/list_users.json'
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
// import CIcon from '@coreui/icons-react'
// import { cilArrowTop } from '@coreui/icons'
import { Table, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

//* Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ListUser = () => {
  //* Get + binding data
  const [user, setUser] = useState(userData)

  //* Setup to binding data for Select Branch
  const [room, setRoom] = useState(roomData)
  const branchName = room.map((item, index) => ({
    label: item.nameBranchVN,
    value: item.nameBranchEN,
  }))
  branchName.unshift('choose')

  //* Open + Close Modal
  const [addVisible, setAddVisible] = useState(false)

  //* Completed: Add User
  //* 1 - Create Object empty to add
  const [objUser, setObjUser] = useState({
    id: '',
    fullName: '',
    date: '',
    sex: '',
    avatar: 'URL',
    identityCard: '',
    nationality: '',
    phone: '',
    email: '',
    address: '',
    dateCreated: '',
    dateUpdated: '',
    actived: true,
    userName: '',
    password: '',
    role: '',
    branch: '',
  })
  // var objUser = {
  //   id: '',
  //   fullName: '',
  //   date: '',
  //   sex: '',
  //   avatar: 'URL',
  //   identityCard: '',
  //   nationality: '',
  //   phone: '',
  //   email: '',
  //   address: '',
  //   dateCreated: '',
  //   dateUpdated: '',
  //   actived: true,
  //   userName: '',
  //   password: '',
  //   role: '',
  //   branch: '',
  // }

  //* 2 - Get info user
  const getInfo = (e) => {
    if (e.target.name === 'fullName') {
      objUser.fullName = e.target.value
    } else if (e.target.name === 'birth') {
      objUser.date = e.target.value
    } else if (e.target.name === 'sex') {
      objUser.sex = e.target.value
    } else if (e.target.name === 'identityCard') {
      objUser.identityCard = e.target.value
    } else if (e.target.name === 'nationality') {
      objUser.nationality = e.target.value
    } else if (e.target.name === 'email') {
      objUser.email = e.target.value
    } else if (e.target.name === 'address') {
      objUser.address = e.target.value
    } else if (e.target.name === 'role') {
      objUser.role = e.target.value
    } else if (e.target.name === 'branch') {
      objUser.branch = e.target.value
    } else if (e.target.name === 'userName') {
      objUser.userName = e.target.value
    } else if (e.target.name === 'password') {
      objUser.password = e.target.value
    } else if (e.target.name === 'phone') {
      objUser.phone = e.target.value
    }
    // console.log(objUser)
  }

  //* Check Text Empty ?
  var checkEmpty = true
  const checkTextEmpty = () => {
    console.log(objUser)
    for (const key in objUser) {
      if (objUser[key] === '') {
        // console.log(objUser[key])
        return (checkEmpty = false)
      } else {
        checkEmpty = true
      }
    }
  }

  //* Check text chứa toàn khoảng trắng
  var checkSpace = true
  const checkTextSpace = () => {
    for (const key in objUser) {
      var check = String(objUser[key]).replace(/\s/g, '').length
      if (!check) {
        console.log('loi')
        return (checkSpace = false)
      } else {
        checkSpace = true
      }
    }
  }

  //* 3 - Add User
  const addUser = () => {
    //* Hoàn thiện data của objUser
    var today = new Date()
    var day = String(today.getDate()).padStart(2, '0')
    var month = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var year = today.getFullYear()
    var hour = today.getHours()
    var minutes = today.getMinutes()
    today = `${hour}h${minutes} ${day}-${month}-${year}`

    objUser.dateCreated = today
    objUser.dateUpdated = today
    objUser.id = user.length + 1

    checkTextEmpty()
    checkTextSpace()

    //* Push into Array + Reset objUser
    if (checkEmpty && checkSpace) {
      setUser([...user, objUser])

      //* Close Modal
      setAddVisible(false)

      //* Reset objUser
      objUser = {
        id: '',
        fullName: '',
        date: '',
        sex: '',
        avatar: 'URL',
        identityCard: '',
        nationality: '',
        phone: '',
        email: '',
        address: '',
        dateCreated: '',
        dateUpdated: '',
        actived: true,
        userName: '',
        password: '',
        role: '',
        branch: '',
      }
    } else {
      console.log('error')
    }
  }

  //* Completed: Edit User

  //* Completed: Delete User
  const deleteUser = (indexS) => {
    setUser([
      ...user.filter((Users, index) => {
        return index !== indexS
      }),
    ])
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List User</CCardHeader>
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
                  <Form.Select aria-label="Default select example" className="formSelect__form">
                    <option>Select All</option>
                    <option value="1">Admin</option>
                    <option value="2">Super Admin</option>
                  </Form.Select>
                </div>
              </div>

              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
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
                    <th>
                      {/* <CIcon icon={cilArrowTop} style={{ marginRight: '10px' }}></CIcon> */}
                      Role
                    </th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.fullName}</td>
                      <td>{user.sex}</td>
                      <td>{user.date}</td>
                      <td>{user.address}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.branch}</td>
                      <td>{user.role}</td>
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
                        <span>
                          <FontAwesomeIcon icon={faPen} className="icon pen" />
                        </span>
                        <span
                          onClick={() => {
                            deleteUser(index)
                          }}
                        >
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

      {/* Completed: Modal to get info and Add User */}
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
                value={objUser.fullName}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput type="date" label="Birth" name="birth" onChange={getInfo} />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Sex"
                aria-label="Default select example"
                name="sex"
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
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Nationality"
                aria-label="Default select example"
                name="nationality"
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
              <CFormInput type="email" label="Email" name="email" onChange={getInfo} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" label="Address" name="address" onChange={getInfo} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="number" label="Phone Number" name="phone" onChange={getInfo} />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Role"
                aria-label="Default select example"
                name="role"
                onChange={getInfo}
                options={[
                  'Choose',
                  { label: 'Admin', value: 'Admin' },
                  { label: 'Super Admin', value: 'Super Admin' },
                ]}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Branch"
                aria-label="Default select example"
                name="branch"
                onChange={getInfo}
                options={branchName}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" label="Username" name="userName" onChange={getInfo} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="password" label="Password" name="password" onChange={getInfo} />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton className="btnCancel" onClick={() => setAddVisible(false)}>
            Cancel
          </CButton>
          <CButton
            color="primary"
            className="btnAdd"
            onClick={() => {
              addUser()
            }}
          >
            Aplly
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ListUser
