import { useState } from 'react'

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    return userToken?.token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    let tk_TOKEN = {
      token: userToken.data.access_token,
    }
    localStorage.setItem('token', JSON.stringify(tk_TOKEN))
    setToken(tk_TOKEN.token)
  }

  return {
    setToken: saveToken,
    token,
  }
}
