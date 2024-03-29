import { KeyboardEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Switch } from '@/components/UI';
import { AppRoutes, AppTheme, ICONS, PAGE_LIST } from '@/constants';
import { useTheme } from '@/hooks';

import styles from './styles.module.scss';

const { LogoSmallIcon, CrossIcon } = ICONS;

export const Navigation = () => {
  const [showBurder, setShowBurger] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  const toggleBurger = () => setShowBurger((prev) => !prev);

  const hanldeKeyDownBurger = (event: KeyboardEvent) => {
    if (event.code === 'Enter') toggleBurger();
  };

  return (
    <nav className={`container ${styles.navigation}`}>
      <Link to={AppRoutes.HOME} className={styles.logo} aria-label="Go to home page">
        <LogoSmallIcon width={40} height={40} />
      </Link>

      <ul className={`${styles.pagesList} ${showBurder ? styles.pagesList_active : ''}`}>
        {PAGE_LIST.map(({ page, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`text-light-s ${styles.pagesList__link}`}
              {...(showBurder ? { onClick: toggleBurger } : {})}
            >
              {page}
            </Link>
          </li>
        ))}

        <li className={styles.pagesList__close}>
          <button onClick={toggleBurger} type="button" aria-label="Close navigation">
            <CrossIcon width={50} height={50} />
          </button>
        </li>
      </ul>

      <Switch
        data-testid="switch-theme"
        isToggled={theme === AppTheme.LIGHT}
        className={styles.toggler}
        onChange={toggleTheme}
      />

      <div
        data-testid="burger-menu"
        onClick={toggleBurger}
        onKeyDown={hanldeKeyDownBurger}
        className={styles.burger}
        aria-label="Show navigation"
        role="button"
        tabIndex={0}
      >
        <span className={styles.burger__line} />
        <span className={styles.burger__line} />
        <span className={styles.burger__line} />
      </div>
    </nav>
  );
};
