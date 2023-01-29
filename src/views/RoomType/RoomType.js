//* Library
import React, { useEffect, useState } from 'react'

//* Data
import roomTypeData from '../../Data/list_room.json'

//* CORE UI + React Bootstrap
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Table, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

//* Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const RoomType = () => {
  const [roomType, setRoomType] = useState(roomTypeData[0].roomType)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List Room Type</CCardHeader>
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
                  placeholder="Room Type"
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
                    <th>Price</th>
                    <th>Max Person</th>
                    <th>Total Room</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomType.map((roomType, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{roomType.type}</td>
                      <td>{roomType.price}</td>
                      <td>{roomType.max_person}</td>
                      <td>{roomType.roomTotal}</td>
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

export default RoomType
