import { useContext } from 'react';
import avatarImg from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

import Avatar from '@mui/material/Avatar';

function AvatarWithImagePicker() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Avatar alt="Foto do usuario" src={user.avatarUrl === null ? avatarImg : user.avatarUrl} />
    </div>
  );
};

export default AvatarWithImagePicker;
