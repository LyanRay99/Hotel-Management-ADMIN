import React from 'react'

export const ForgetPassword = () => {
  return (
    <div className="login__OverContainer">
      <div className="login">
        <h2 className="login__title">Forgot your password?</h2>

        <p>
          Please enter the email address or phone number you would like your password reset
          information sent to
        </p>

        <form>
          <label className="user">
            <input type="text" placeholder="Phone/Email" />
          </label>

          <div
            style={{
              display: 'flex',
            }}
          >
            <div
              className="sumnitLogin"
              style={{
                width: '290px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <button>Back to Login</button>
              <button>Continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
