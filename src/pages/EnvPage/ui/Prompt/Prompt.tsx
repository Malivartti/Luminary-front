import envPageStore from '@pages/EnvPage/store';
import Input from '@shared/ui/Input';
import { FormEvent, useCallback } from 'react';

import cls from './Prompt.module.scss';

const Prompt = () => {
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={envPageStore.prompt}
        onChange={envPageStore.setPrompt}
        placeholder='Запрос на генерацию'
      />
    </form>
  );
};

export default Prompt;
