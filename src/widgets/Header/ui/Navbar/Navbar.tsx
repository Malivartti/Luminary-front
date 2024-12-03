import { AppRoutes } from '@shared/config/router';
import Text from '@shared/ui/Text';
import { Link, useLocation } from 'react-router-dom';

import cls from './Navbar.module.scss';

const Navbar = () => {
  const { pathname } = useLocation();
  const currentHref = '/' + pathname.split('/').at(-1);

  return (
    <div>
      <Link to={AppRoutes.ENVS} className={cls.Navbar__link}>
        <Text view='p-18' color={currentHref === AppRoutes.ENVS ? 'accent' : 'primary'}>Окружения</Text>
      </Link>
    </div>
  );
};

export default Navbar;
