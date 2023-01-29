import React, { useEffect, useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Accordion, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import careersData from '../../Data/careers.json'

const Careers = (props) => {
  const [careers, setCareers] = useState(careersData)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Help Center
          <Button variant="info" style={{ color: 'white' }}>
            Add
            <FontAwesomeIcon icon={faPlus} style={{ margin: '0px 0px 0px 5px' }} />
          </Button>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <Accordion defaultActiveKey="0">
              {/* {helpCenter.map((content, index) => (
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
              ))} */}
            </Accordion>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Careers
