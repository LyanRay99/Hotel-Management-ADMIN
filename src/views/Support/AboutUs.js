import React, { useEffect, useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const AboutUs = (props) => {
  const [aboutUs, setAboutUs] = useState({})
  useEffect(() => {
    var myHeaders = new Headers()
    var token = JSON.parse(localStorage.getItem('token'))
    myHeaders.append('Authorization', 'Bearer ' + token.token)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch('/api/v1/terms-policies/3', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.status)
      })
      .then((result) => {
        setAboutUs(result.data)
        console.log(aboutUs)
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
