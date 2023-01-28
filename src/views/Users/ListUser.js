//* Library
import React, { useEffect, useState } from 'react'
import axios from 'axios'

//* Data
import listUserData from '../../Data/list_users.json'

//* CORE UI + React Bootstrap
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop } from '@coreui/icons'
import { Table, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

//* Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ListUser = () => {
  const [user, setUser] = useState(listUserData)

  // useEffect(() => {
  //   var myHeaders = new Headers()
  //   var token = JSON.parse(localStorage.getItem('token'))
  //   // console.log(token)
  //   myHeaders.append('Authorization', 'Bearer ' + token.token)

  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow',
  //   }

  //   fetch('/api/v1/users?page=1&per_page=10&keyword=&sortBy=&field=', requestOptions)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json()
  //       }
  //       throw new Error(response.status)
  //     })
  //     .then((result) => {
  //       setUser(result.data.users.data)
  //     })
  //     .catch((error) => {
  //       console.log('error', error)
  //       // logout()
  //     })
  // }, [])

  // const logout = () => {
  //   localStorage.removeItem('token')
  // }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List User</CCardHeader>
        <CCardBody>
          <CRow>
            <div className="control">
              <div className="select">
                <div className="btn">
                  <Button variant="info">
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
                    {/* <th>Nationality</th>
                    <th>Address</th> */}
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
                      <td>{user.fullname}</td>
                      <td>{user.sex}</td>
                      <td>{user.date}</td>
                      {/* <td>{user.identityCard}</td>
                      <td>{user.nationality}</td> */}
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
                        <span>
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
    </>
  )
}

export default ListUser
