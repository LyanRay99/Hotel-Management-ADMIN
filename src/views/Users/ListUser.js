//* Library
import React, { useEffect, useState } from 'react'

//* Data
import userData from '../../Data/list_users.json'
import roomData from '../../Data/list_room'

//* Component
import { Abc } from './Abc'

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
} from '@coreui/react'
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
    id: 0,
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

  //* 2 - Get info user
  const getInfo = (e) => {
    if (e.target.name === 'fullName') {
      setObjUser({ ...objUser, fullName: e.target.value })
    } else if (e.target.name === 'birth') {
      setObjUser({ ...objUser, date: e.target.value })
    } else if (e.target.name === 'sex') {
      setObjUser({ ...objUser, sex: e.target.value })
    } else if (e.target.name === 'identityCard') {
      setObjUser({ ...objUser, identityCard: e.target.value })
    } else if (e.target.name === 'nationality') {
      setObjUser({ ...objUser, nationality: e.target.value })
    } else if (e.target.name === 'email') {
      setObjUser({ ...objUser, email: e.target.value })
    } else if (e.target.name === 'address') {
      setObjUser({ ...objUser, address: e.target.value })
    } else if (e.target.name === 'role') {
      setObjUser({ ...objUser, role: e.target.value })
    } else if (e.target.name === 'branch') {
      setObjUser({ ...objUser, branch: e.target.value })
    } else if (e.target.name === 'userName') {
      setObjUser({ ...objUser, userName: e.target.value })
    } else if (e.target.name === 'password') {
      setObjUser({ ...objUser, password: e.target.value })
    } else if (e.target.name === 'phone') {
      //* Create dateCreated + dateUpdated luôn tại đây
      var today = new Date()
      var day = String(today.getDate()).padStart(2, '0')
      var month = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var year = today.getFullYear()
      var hour = today.getHours()
      var minutes = today.getMinutes()
      today = `${hour}h${minutes} ${day}-${month}-${year}`
      setObjUser({ ...objUser, dateCreated: today, dateUpdated: today, phone: e.target.value })
    }
  }

  //* Check Text Empty ?
  var checkEmpty = true
  const checkTextEmpty = () => {
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
    //* Run function check
    checkTextEmpty()
    checkTextSpace()

    //* Push into Array + Reset objUser
    if (checkEmpty && checkSpace) {
      //* Bây giờ mới set ID để thay đổi UI button trong Modal
      setObjUser({ ...objUser, id: user.length + 1 })

      //* Add objUser into User
      setUser([...user, objUser])

      //* Close Modal
      setAddVisible(false)

      //* Reset objUser
      setObjUser({
        id: 0,
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
    } else if (!checkEmpty) {
      alert('input khônng được trống')
    } else if (!checkSpace) {
      alert('input chứa toàn khoảng trắng')
    }
  }

  //* Completed: Open modal Edit User
  const getInfoEdit = (user) => {
    //* Open Modal
    setAddVisible(true)

    //* Binding data of user to edit
    setObjUser({
      id: user.id,
      fullName: user.fullName,
      date: user.date,
      sex: user.sex,
      avatar: user.avatar,
      identityCard: user.identityCard,
      nationality: user.nationality,
      phone: user.phone,
      email: user.email,
      address: user.address,
      dateCreated: user.dateCreated,
      dateUpdated: user.dateUpdated,
      actived: user.actived,
      userName: user.userName,
      password: user.password,
      role: user.role,
      branch: user.branch,
    })
  }

  //* Update state
  const editUser = () => {
    //* set item editted
    setUser(
      user.map((item) => {
        if (item.id === objUser.id) {
          item = objUser
        }
        return item
      }),
    )

    //* Reset objUser
    setObjUser({
      id: 0,
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

    //* Close Modal
    setAddVisible(false)
  }

  //* Reset ObjUser khi click Cancel
  const cancelEdit = () => {
    //* Reset objUser
    setObjUser({
      id: 0,
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

    //* Close Modal
    setAddVisible(false)
  }

  //* Completed: Delete User
  const deleteUser = (indexS) => {
    setUser([
      ...user.filter((Users, index) => {
        return index !== indexS
      }),
    ])
  }

  //* Completed: Sort Role
  const sortRole = (e) => {
    if (e.target.value !== 'Select All') {
      setUser(() => userData)
      setUser((users) => [
        ...users.filter((Users, index) => {
          return Users.role === e.target.value
        }),
      ])
    } else {
      setUser(userData)
    }
  }

  //* Completed: Search User Name
  const [searchFullName, setSearchFullName] = useState('')
  const getInfoFullName = (e) => {
    setSearchFullName(() => e.target.value)
    if (e.target.value == '') {
      setUser(userData)
    } else {
      var searchUser = user.filter((item) => {
        if (item.fullName.toLowerCase().includes(e.target.value.toLowerCase())) {
          // console.log(user[index].actived)
          return item
        }
      })
      console.log(searchUser)
      setUser(searchUser)
      console.log(e.target.value)
    }
  }

  //* Completed: Active User
  const activeUser = (USER, e) => {
    setUser(
      user.filter((item) => {
        if (item.id === USER.id) {
          // console.log(user[index].actived)
          item.actived = e.target.checked
          // console.log(item.id + ' ' + USER.id)
        }
        return item
      }),
    )
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
                  <Form.Select
                    aria-label="Default select example"
                    className="formSelect__form"
                    // name="role"
                    onChange={sortRole}
                  >
                    <option>Select All</option>
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
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
                  value={searchFullName}
                  onChange={getInfoFullName}
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
                        <CFormSwitch checked={user.actived} onChange={(e) => activeUser(user, e)} />
                        {/* <span className="tdAction__active">
                          <label className="container">
                            <input
                              type="checkbox"
                              id="check"
                              checked={!user.actived}
                              onChange={(e) => activeUser(user, e)}
                            />
                            <span></span>
                          </label>
                        </span> */}
                      </td>
                      <td className="tdAction">
                        <span>
                          <FontAwesomeIcon icon={faKey} className="icon key" />
                        </span>
                        <span onClick={() => getInfoEdit(user)}>
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

      {/* Completed: Modal to get info, Add and Edit User */}
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
              <CFormInput
                type="date"
                label="Birth"
                name="birth"
                value={objUser.date}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Sex"
                aria-label="Default select example"
                name="sex"
                value={objUser.sex}
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
                value={objUser.identityCard}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                label="Nationality"
                aria-label="Default select example"
                name="nationality"
                value={objUser.nationality}
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
                value={objUser.email}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Address"
                name="address"
                value={objUser.address}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                label="Phone Number"
                name="phone"
                value={objUser.phone}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Role"
                aria-label="Default select example"
                name="role"
                value={objUser.role}
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
                value={objUser.branch}
                onChange={getInfo}
                options={branchName}
                disabled={objUser.role === '' ? true : false}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Username"
                name="userName"
                value={objUser.userName}
                onChange={getInfo}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="password"
                label="Password"
                name="password"
                value={objUser.password}
                onChange={getInfo}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton className="btnCancel" onClick={() => cancelEdit()}>
            Cancel
          </CButton>
          {objUser.id == false ? (
            <CButton
              color="primary"
              className="btnAdd"
              onClick={() => {
                addUser()
              }}
            >
              Aplly
            </CButton>
          ) : (
            <CButton className="btnEdit" onClick={() => editUser()}>
              Edit
            </CButton>
          )}
        </CModalFooter>
      </CModal>

      <Abc>abc</Abc>
    </>
  )
}

export default ListUser
