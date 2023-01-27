import React, { useEffect, useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Accordion, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const TipsAndTrips = (props) => {
  const [helpCenter, setHelpCenter] = useState([])
  useEffect(() => {
    var myHeaders = new Headers()
    var token = JSON.parse(localStorage.getItem('token'))
    myHeaders.append('Authorization', 'Bearer ' + token.token)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch('/api/v1/help-centers?type=2&page=undefined', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.status)
      })
      .then((result) => {
        setHelpCenter(result.data.data)
        console.log(helpCenter)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Tips & Trips
          <Button variant="info" style={{ color: 'white' }}>
            Add
            <FontAwesomeIcon icon={faPlus} style={{ margin: '0px 0px 0px 5px' }} />
          </Button>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <Accordion defaultActiveKey="0">
              {helpCenter.map((content, index) => (
                <Accordion.Item eventKey={index} key={content.id}>
                  <Accordion.Header>
                    {content.questionEn}
                    <div>
                      <span>
                        <FontAwesomeIcon icon={faPen} className="icon pen" />
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faTrash} className="icon trash" />
                      </span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body
                    dangerouslySetInnerHTML={{ __html: content.answerEn }}
                  ></Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TipsAndTrips
