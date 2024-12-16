import envPageStore from '@pages/EnvPage/store';
import DownloadIon from '@shared/assets/icons/export.svg';
import LoadIcon from '@shared/assets/icons/import.svg';
import Button, { ButtonTheme } from '@shared/ui/Button';
import { default as cn } from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useCallback, useRef } from 'react';

import FileItem from './FileItem';
import cls from './Files.module.scss';

type Props = {
  className?: string
}

const Files: FC<Props> = observer(({ className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLoadClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    envPageStore.loadFile(target.files[0]);
  }, []);

  const handleGenerateClick = useCallback(() => {
    envPageStore.generate();
  }, []);

  return (
    <div className={cn(cls.Files, className)}>
      <input
        type="file"
        accept='.doc,.docx,.txt,.rtf'
        style={{ display: 'none' }}
        onChange={handleInput}
        ref={inputRef}
      />

      <div className={cls.Files__btns}>
        <Button type='button' theme={ButtonTheme.CLEAR}>
          <DownloadIon /> Скачать
        </Button>
        <Button type='button' theme={ButtonTheme.CLEAR} onClick={handleLoadClick}>
          <LoadIcon /> Загрузить
        </Button>
      </div>
      <div className={cls.Files__list}>
        {envPageStore.files?.map(file => (
          <FileItem key={file.name} name={file.name} />
        ))}
      </div>
      <Button onClick={handleGenerateClick}>Сгенерировать</Button>
    </div>
  );
});

export default Files;
