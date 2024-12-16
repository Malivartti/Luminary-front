import envPageStore from '@pages/EnvPage/store';
import SendIcon from '@shared/assets/icons/send.svg';
import Input from '@shared/ui/Input';
import { observer } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';

import cls from './Chat.module.scss';
import Message from './Message';

const Chat = observer(() => {

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    envPageStore.sendPromptInChat();
  }, []);

  return (
    <div className={cls.Chat}>
      <div className={cls.Chat__wrapper}>
        <div className={cls.Chat__messages}>
          {/* {Array.from(Array(3).keys()).map((key) => <Message key={key} text="hahd hfhf hfh " sendedAt={new Date()}/>)} */}
        </div>
      </div>
      <form className={cls.Chat__form} onSubmit={handleSubmit}>
        <Input
          className=''
          value={envPageStore.prompt}
          onChange={envPageStore.setPrompt}
          afterSlot={<SendIcon />}
        />
      </form>
    </div>
  );
});

export default Chat;
