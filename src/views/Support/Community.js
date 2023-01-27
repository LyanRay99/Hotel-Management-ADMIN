import React, { useEffect, useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const Community = (props) => {
  const [Community, setCommunity] = useState({})
  useEffect(() => {
    var myHeaders = new Headers()
    var token = JSON.parse(localStorage.getItem('token'))
    myHeaders.append('Authorization', 'Bearer ' + token.token)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch('/api/v1/terms-policies/2', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.status)
      })
      .then((result) => {
        setCommunity(result.data)
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
          Terms Of Service
          <Button variant="info" style={{ color: 'white' }}>
            Edit
            <FontAwesomeIcon icon={faPen} style={{ margin: '0px 0px 0px 5px' }} />
          </Button>
        </CCardHeader>
        <CCardBody>
          <CRow className="termOfService">
            <div dangerouslySetInnerHTML={{ __html: Community.bodyEn }}></div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Community
