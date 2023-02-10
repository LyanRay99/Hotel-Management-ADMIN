//* Library
import React, { useState } from 'react'

//* Data
import aboutData from '../../Data/about.json'

//* CORE UI + React Bootstrap
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Table, Button } from 'react-bootstrap'
// import Form from 'react-bootstrap/Form'

//* Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const AboutUs = () => {
  const [about, setAbout] = useState(aboutData.aboutUs_Page)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List album request featured</CCardHeader>
        <CCardBody>
          <CRow>
            <CRow>
              <div className="control">
                <div className="select">
                  <div className="btn">
                    <Button variant="info">
                      Add <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </div>
                </div>

                <div className="input-group mb-3 search">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Content"
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
                      <th>Title</th>
                      <th>Content</th>
                      <th>Image</th>
                      <th>Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {about.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td>{item.image}</td>
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
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AboutUs
