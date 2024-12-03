import { EnvModel } from '@entities/envs/model';
import { formatDDMMYYYYHHMM } from '@shared/lib/date';
import Text from '@shared/ui/Text';
import { FC } from 'react';

import cls from './EnvCard.module.scss';

type Props = {
  env: EnvModel
}

const EnvCard: FC<Props> = ({ env }) => {
  return (
    <div className={cls.EnvCard}>
      <Text tag='div' view='p-20' color='primary' maxLines={1} className={cls.EnvCard__title}>
        {env.title}
      </Text>
      <Text tag='div' view='p-16' color='secondary' maxLines={4} className={cls.EnvCard__description}>
        {env.description}
      </Text>
      <Text tag='div' view='p-14' color='secondary' className={cls.EnvCard__date}> 
        {formatDDMMYYYYHHMM(env.updatedAt)}
      </Text>
    </div>
  );
};

export default EnvCard;