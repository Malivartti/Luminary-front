import Editor from './EnvEditor';
import cls from './EnvPage.module.scss';
import Files from './Files';
import Generate from './Generate';
import Prompt from './Prompt/Prompt';

const EnvPage = () => {
  return (
    <div className={cls.EnvPage}>
      <div className={cls.EnvPage__main}>
        <Generate className={cls.EnvPage__generate}/>
        <Editor className={cls.EnvPage__editor} />
        <Prompt />
      </div>
      <div className={cls.EnvPage__side}>
        {/* <Files /> */}
      </div>
    </div>
  );
};

export default EnvPage;
