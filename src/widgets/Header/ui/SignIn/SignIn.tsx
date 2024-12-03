import userStore from '@entities/user';
import { AppRouteUrls } from '@shared/config/router';
import Text from '@shared/ui/Text';
import Popup from '@widgets/Popup';
import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

import cls from './SignIn.module.scss';

interface SignInProps {
    className?: string;
}

const SignIn: FC<SignInProps> = observer(({ className }) => {

  const onSignOut = useCallback(() => {
    userStore.logoutUser();
  }, []);
  
  return (
    <div className={className}>
      {
        userStore.isLogin
          ? (
            <Popup button={<Text tag='div' view='p-18'>{userStore.user?.name}</Text>}>
              <Link to={AppRouteUrls.profile.create()}>
                <Text tag='div' view='p-18'>Профиль</Text>
              </Link>
              <button className={cls.SignIn__btn} type='button' onClick={onSignOut}>
                <Text tag='div' view='p-18' >Выйти</Text>
              </button>
            </Popup>
          )
          : (
            <Link to={AppRouteUrls.login.create()}>
              <Text tag='div' view='p-18'>
                Войти
              </Text>
            </Link>
          )
      }
    </div>
  );
});

export default SignIn;
