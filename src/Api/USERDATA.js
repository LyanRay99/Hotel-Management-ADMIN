import React, { useEffect, useState } from 'react'

export const USERDATA = () => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    var myHeaders = new Headers()
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch('https://photo.azurecloud.vn/api/v1/roles/1,6', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.status)
      })
      .then((result) => {
        setUserData(result)
      })
      .catch((error) => {
        console.log('error', error)
        logout()
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
  }

  return <h1>abc</h1>
}
