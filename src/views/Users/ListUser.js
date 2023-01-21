import React, { useEffect, useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilArrowTop } from '@coreui/icons'
import { Table, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ListUser = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    var myHeaders = new Headers()
    var token = JSON.parse(localStorage.getItem('token'))
    // console.log(token)
    myHeaders.append('Authorization', 'Bearer ' + token.token)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch('/api/v1/users?page=1&per_page=10&keyword=&sortBy=&field=', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.status)
      })
      .then((result) => {
        setUser(result.data.users.data)
      })
      .catch((error) => {
        console.log('error', error)
        // logout()
      })
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
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
                  <Button variant="info">
                    Add <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>

                <div className="formSelect">
                  <Form.Select aria-label="Default select example" className="formSelect__form">
                    <option>Select All</option>
                    <option value="1">Chủ doanh nghiệp</option>
                    <option value="2">Quản lý doanh nghiệp</option>
                    <option value="3">Admin</option>
                    <option value="4">Super Admin</option>
                    <option value="5">Nhân viên doanh nghiệp</option>
                    <option value="6">User</option>
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
            <Table responsive="sm">
              <thead style={{ backgroundColor: 'rgba(60, 75, 100,0.5)' }}>
                <tr>
                  <th></th>
                  <th>No</th>
                  <th>Name</th>
                  <th>
                    <CIcon icon={cilArrowTop} style={{ marginRight: '10px' }}></CIcon>
                    Role
                  </th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user, index) => (
                  <tr key={user.id}>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <td>{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td className="tdRole">
                      {user.roles.map((role) => (
                        <span key={role.id} className="role">
                          {role.name}
                        </span>
                      ))}
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td className="tdAction">
                      <span className="tdAction__active">
                        <label className="container">
                          <input type="checkbox" id="check" />
                          <span></span>
                        </label>
                      </span>
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
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ListUser
