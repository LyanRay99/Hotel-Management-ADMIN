//* Library
import React, { useState } from 'react'

//* CORE UI + React Bootstrap
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Table, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

//* Data
import branchData from '../../Data/list_room.json'

//* Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const Branch = () => {
  const [branch, setBranch] = useState(branchData)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List Branch</CCardHeader>
        <CCardBody>
          <CRow>
            <div className="control">
              <div className="select">
                <div className="btn">
                  <Button variant="info">
                    Add <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>

                {/* <div className="formSelect">
                  <Form.Select aria-label="Default select example" className="formSelect__form">
                    <option>Select All</option>
                    <option value="1">Admin</option>
                    <option value="2">Super Admin</option>
                  </Form.Select>
                </div> */}
              </div>

              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Branch"
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
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Manager</th>
                    <th>Total room</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {branch.map((branch, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{branch.nameBranchEN}</td>
                      <td>{branch.phone}</td>
                      <td>{branch.addressEN}</td>
                      <td>{branch.email}</td>
                      <td>{branch.manager}</td>
                      <td>{branch.roomTotal}</td>
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

export default Branch
