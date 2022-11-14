// import { renderTrendingList } from './render_movie_list';
import { onClickUa, onClickEn } from './languageSwitcher';
import { darkTheme, lightTheme } from './theme_switcher';

localStorage.getItem('language') === 'uk-UA' ? onClickUa() : onClickEn();
localStorage.getItem('theme') === 'dark' ? darkTheme() : lightTheme();
