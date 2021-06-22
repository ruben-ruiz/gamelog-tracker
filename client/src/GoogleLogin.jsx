import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

const clientId = '742413594674-i998hv5n1t54g1m1pi2n3brc6cpuhpdh.apps.googleusercontent.com';

function Login( { checkLogin }) {
  const responseSuccessGoogle = (res) => {
    axios({
      method: 'POST',
      url: '/api/googlelogin',
      data: { tokenId: res.tokenId },
    })
    .then(response => checkLogin(response.data.user.picture))
    .catch((err) => {
      console.log(err);
    });
  };

  const responseFailureGoogle = (res) => {
    axios({
      method: 'POST',
      url: '/api/googlelogin',
      data: { tokenId: res.tokenId },
    })
    .then(response => console.log(response))
    .catch((err) => {
      console.log(err);
    });
  };

  const inStyle = {
    width: '4rem',
    outline: 'none',
    color: 'white',
    background: 'none',
    fontSize: '1.5rem',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={responseSuccessGoogle}
      onFailure={responseFailureGoogle}
      cookiePolicy={'single_host_origin'}
      render={renderProps => (
        <button className="login-btn" onClick={renderProps.onClick} style={inStyle}>Login</button>
      )}
      isSignedIn={true}
      />
  );
}

export default Login;