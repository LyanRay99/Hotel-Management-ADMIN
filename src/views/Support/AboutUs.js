import React, { useEffect, useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import aboutUsData from '../../Data/about.json'

const AboutUs = (props) => {
  const [aboutUs, setAboutUs] = useState(aboutUsData)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          About Us
          <Button variant="info" style={{ color: 'white' }}>
            Edit
            <FontAwesomeIcon icon={faPen} style={{ margin: '0px 0px 0px 5px' }} />
          </Button>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <div dangerouslySetInnerHTML={{ __html: aboutUs.bodyEn }}></div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AboutUs
