import React, { useEffect, useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
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
            {/* <div dangerouslySetInnerHTML={{ __html: termsOfService.bodyEn }}></div> */}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TermsOfService
