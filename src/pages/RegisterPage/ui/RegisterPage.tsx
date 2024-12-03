import userStore from '@entities/user';
import { AppRouteUrls } from '@shared/config/router';
import { useTrackMetaAndToast } from '@shared/hooks/useTrackMetaAndToast';
import Button, { ButtonTheme } from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import registerPageStore from '../store';
import cls from './RegisterPage.module.scss';

const RegisterPage = observer(() => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(AppRouteUrls.root);
  }, [navigate]);

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    registerPageStore.register();
  }, []);

  const toLogin = useCallback(() => {
    navigate(AppRouteUrls.login.create());
  }, [navigate]);

  useTrackMetaAndToast({ network: userStore.network, onSuccess });

  return (
    <div className={cls.RegisterPage}>
      <form className={cls.RegisterPage__form} onSubmit={onSubmit} noValidate>
        <Text
          className={cls.RegisterPage__title}
          tag='h1'
          view='title'
        >
          Регистрация
        </Text>
        <div
          className={cls.RegisterPage__avatar}
          style={{ backgroundImage: `url(${registerPageStore.avatar})` }}
        ></div>
        <Input 
          className={cls.RegisterPage__input}
          type='text' 
          value={registerPageStore.avatar} 
          onChange={registerPageStore.setAvatar}
          error={registerPageStore.avatarError}
          placeholder='Ссылка на изображение'
        />
        <Input 
          className={cls.RegisterPage__input}
          type="text" 
          value={registerPageStore.name} 
          onChange={registerPageStore.setName}
          error={registerPageStore.nameError}
          placeholder='Имя'
        />
        <Input 
          className={cls.RegisterPage__input}
          type="email" 
          value={registerPageStore.email} 
          onChange={registerPageStore.setEmail}
          error={registerPageStore.emailError}
          placeholder='Почта'
        />
        <Input 
          className={cls.RegisterPage__input}
          type='password' 
          value={registerPageStore.password} 
          onChange={registerPageStore.setPassword}
          error={registerPageStore.passwordError}
          placeholder='Пароль'
        />
        <Input 
          className={cls.RegisterPage__input}
          type='password' 
          value={registerPageStore.passwordRepeat} 
          onChange={registerPageStore.setPasswordRepeat}
          error={registerPageStore.passwordRepeatError}
          placeholder='Повторите пароль'
        />
        <Button
          className={cls['RegisterPage__sign-in']}
          theme={ButtonTheme.CLEAR}
          onClick={toLogin}
          type='button'
        >
          Войти
        </Button>
        <Button 
          className={cls.RegisterPage__btn}
          type='submit'
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
});

export default RegisterPage;
