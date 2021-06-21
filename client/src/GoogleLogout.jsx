import React, { useState } from 'react';
import { useGoogleLogout } from 'react-google-login';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const clientId = '836968365888-6tdvb8sji32an3pf99uds3v88p1g47sm.apps.googleusercontent.com';

function GoogleLogout({ checkLogin, userImage }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const onSuccess = () => {
    axios.delete('/api/googlelogout')
      .then(checkLogin())
      .catch(err => console.log(err));
  };
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess: onSuccess,
  });

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        <img className='profileImg' src={userImage} alt="User Avatar" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={signOut}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default GoogleLogout;