import { AppRoutes } from '@shared/config/router';
import Text from '@shared/ui/Text';
import { Link } from 'react-router-dom';


const Logo = () => {
  return (
    <Link to={AppRoutes.MAIN} >
      <Text view='p-20' weight='bold'>AI System</Text>
    </Link>
  );
};

export default Logo;
