import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'

const Banner = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Banner</CCardHeader>
        <CCardBody>
          <CRow>
            <h3>this is content</h3>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Banner
