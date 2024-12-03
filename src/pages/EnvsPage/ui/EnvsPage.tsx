import EnvList from './EnvList';
import EnvModal from './EnvModal';
import cls from './EnvsPage.module.scss';

const EnvsPage = () => {
  return (
    <div className={cls.EnvsPage}>
      <EnvModal />
      <EnvList />
    </div>
  );
};

export default EnvsPage;
