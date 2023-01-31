import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import termData from '../../Data/term.json'

const TermsOfService = (props) => {
  const [termsOfService, setTermsOfService] = useState(termData)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Terms Of Service
          <Button variant="info" style={{ color: 'white' }}>
            Edit
            <FontAwesomeIcon icon={faPen} style={{ margin: '0px 0px 0px 5px' }} />
          </Button>
        </CCardHeader>
        <CCardBody>
          <CRow className="termOfService">
            <CAccordion activeItemKey={0}>
              {termsOfService.map((item, index) => (
                <CAccordionItem itemKey={index + 1} key={index}>
                  <div className="termOfService__header">
                    <CAccordionHeader className="termOfService__header__title">
                      <strong>{item.title}</strong>
                    </CAccordionHeader>

                    <div className="termOfService__header__custom">
                      <Button className="btnEdit">
                        Edit Title <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>{' '}
                      <Button className="btnDelete">
                        Delete Title <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>

                  {item.content.map((content, index) => (
                    <CAccordionBody key={index}>
                      <p>
                        <strong>
                          {index + 1}) {content.content_LV1}
                        </strong>
                      </p>
                      {content.content_LV2?.map((contentLV2, index) => (
                        <p key={index}>- {contentLV2}</p>
                      ))}
                    </CAccordionBody>
                  ))}
                </CAccordionItem>
              ))}
            </CAccordion>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TermsOfService
