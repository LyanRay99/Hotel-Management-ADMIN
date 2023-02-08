//* Library
import React, { useEffect, useState } from 'react'

//* Data
import listNews from '../../Data/new&Event.json'

//* CORE UI + React Bootstrap
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Table, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

//* Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const News = () => {
  const [news, setNews] = useState(listNews.news_recent)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List News & Events</CCardHeader>
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
                    placeholder="News..."
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
                      <th>Time</th>
                      <th>Date</th>
                      <th>Author</th>
                      <th>Tags</th>
                      <th>Image</th>
                      <th>Content</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {news.map((news, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{news.name}</td>
                        <td>{news.time.slice(0, 8)}</td>
                        <td>
                          {news.date}/{news.monthNumber}/{news.year}
                        </td>
                        <td>{news.author}</td>
                        <td>{news.tags}</td>
                        <td>{news.image}</td>
                        <td>{news.content[0]}</td>
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

export default News
