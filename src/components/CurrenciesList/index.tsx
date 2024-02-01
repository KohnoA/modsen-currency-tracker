import { memo } from 'react';

import { CurrenciesItemType } from '@/types';

import { CurrencyCard } from '../CurrencyCard';

import styles from './styles.module.scss';

type CurrenciesListProps = {
  title: string;
  data: CurrenciesItemType[];
  onClickForItem?: (id: string) => void;
};

export const CurrenciesList = memo(({ title, data, onClickForItem }: CurrenciesListProps) => (
  <section data-testid="currencies-list">
    <h4 data-testid="currencies-list-title" className={`text-light-xl ${styles.title}`}>
      {title}
    </h4>

    <ul className={styles.list}>
      {data.map((cardProps) => (
        <CurrencyCard key={cardProps.code} onClick={onClickForItem} {...cardProps} />
      ))}
    </ul>
  </section>
));
