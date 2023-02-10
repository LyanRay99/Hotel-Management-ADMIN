import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="" target="_blank" rel="">
          Hotel Management
        </a>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="" target="_blank" rel="">
          Mai Tan Tai
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
