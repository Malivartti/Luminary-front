import { useTheme } from '@app/providers/ThemeProvider';
import envPageStore from '@pages/EnvPage/store';
import JoditEditor from 'jodit-react';
import { observer } from 'mobx-react-lite';
import { FC, useMemo } from 'react';

type Props = {
  className?: string;
}

const Editor: FC<Props> = observer(({ className }) => {
  const { theme } = useTheme();

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Начните вводить...',
    height: 'calc(100vh - var(--navbar-height))',
    theme,
    allowResizeY: false,
  }),
  [theme]
  );

  return (
    <div className={className}>
      <JoditEditor
      
        value={envPageStore.sheet}
        onBlur={newContent => envPageStore.setSheet(newContent)}
        config={config}
      />
    </div>
  );
});

export default Editor;
