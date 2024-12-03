import { useTheme } from '@app/providers/ThemeProvider';
import envPageStore from '@pages/EnvPage/store';
import JoditEditor from 'jodit-react';
import { FC, useMemo } from 'react';

type Props = {
  className?: string;
}

const Editor: FC<Props> = ({ className }) => {
  const { theme } = useTheme();

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Начните вводить...',
    theme,
    height: 500,
    allowResizeY: false,
  }),
  [theme]
  );

  return (
    <JoditEditor
      className={className}
      value={envPageStore.sheet}
      onBlur={newContent => envPageStore.setSheet(newContent)}
      config={config}
    />
  );
};

export default Editor;
