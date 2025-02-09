import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [config, setConfig] = useState(defaultArticleState);
	const changeTheme = (configuration: ArticleStateType) => {
		setConfig(configuration);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': config.fontFamilyOption.value,
					'--font-size': config.fontSizeOption.value,
					'--font-color': config.fontColor.value,
					'--container-width': config.contentWidth.value,
					'--bg-color': config.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm callback={changeTheme} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
