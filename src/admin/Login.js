import React, { useState } from 'react'
import PropTypes from 'prop-types'

async function loginUser(credentials) {
  return fetch('https://photo.azurecloud.vn/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

export const Login = ({ setToken }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await loginUser({
      email,
      password,
    })
    setToken(token)
  }

  return (
    <div className="login__OverContainer">
      <div className="login">
        <h2 className="login__title">LOGIN</h2>

        <form onSubmit={handleSubmit}>
          <label className="user">
            <p>Username</p>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="password">
            <p>Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </label>

          <label className="rememberMe">
            <input type="checkbox" />
            Remember me?
          </label>

          <div
            style={{
              display: 'flex',
            }}
          >
            <div className="sumnitLogin">
              <button type="submit">Login</button>
              {/* <Link to="/forgetPassword"> */}
              <p>Forget your password?</p>
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}
