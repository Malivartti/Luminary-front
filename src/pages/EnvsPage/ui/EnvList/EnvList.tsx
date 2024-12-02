

import envsStore from '@entities/envs/store';
import { AppRouteUrls } from '@shared/config/router';
import { Link } from 'react-router-dom';

import EnvCard from '../EnvCard';
import EnvCardSkeleton from '../EnvCardSkeleton';
import EnvCreate from '../EnvCreate';
import cls from './EnvList.module.scss';

const EnvList = () => {

  return (
    <div className={cls.EnvList}>
      <EnvCreate />
      {
        envsStore.isLoading
          ? Array.from(Array(16).keys()).map((key) => <EnvCardSkeleton key={key} />)
          : envsStore.envs.map((env) => (
            <Link to={AppRouteUrls.env.create(env.id)} key={env.id}>
              <EnvCard env={env} />
            </Link>
          ))
      }
    </div>
  );
};

export default EnvList;