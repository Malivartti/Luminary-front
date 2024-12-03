import envsStore from '@entities/envs';
import envsPageStore from '@pages/EnvsPage/store';
import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Modal from '@widgets/Modal';
import { observer } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';

import cls from './EnvModal.module.scss';

const EnvModal = observer(() => {

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    envsPageStore.createEnv();
  }, []);

  return (
    <Modal
      isShow={envsPageStore.isOpenModal}
      setIsShow={envsPageStore.setIsOpenModal}
    >
      <form
        className={cls.EnvModal__form}
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          className={cls.EnvModal__input}
          type="text" 
          value={envsPageStore.title} 
          onChange={envsPageStore.setTitle}
          error={envsPageStore.titleError}
          placeholder='Заголовок'
        />
        <Input
          className={cls.EnvModal__input}
          type="text" 
          value={envsPageStore.description} 
          onChange={envsPageStore.setDescription}
          placeholder='Описание'
        />
        <Button
          className={cls.EnvModal__btn}
          type='submit'
          loading={envsStore.network.isLoading}
        >
          Создать
        </Button>
      </form>
    </Modal>
  );
});

export default EnvModal;
