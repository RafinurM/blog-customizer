import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useRef, useState } from 'react';

type callbackFunction = {
	callback: (configuration: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: callbackFunction) => {
	const [asideState, setasideState] = useState(false);
	const [configuration, setConfiguration] =
		useState<ArticleStateType>(defaultArticleState);
	const aside = useRef<HTMLElement | null>(null);
	return (
		<>
			<ArrowButton
				isOpen={asideState}
				onClick={() => {
					asideState ? setasideState(false) : setasideState(true);
					aside.current?.classList.toggle(styles.container_open);
				}}
			/>
			<aside
				ref={aside}
				className={styles.container}
				onSubmit={(e) => e.preventDefault()}>
				<form className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase dynamic={false}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						placeholder=''
						selected={configuration.fontFamilyOption}
						onChange={(font) =>
							setConfiguration({ ...configuration, fontFamilyOption: font })
						}
						onClose={() => console.log(2)}
						title='Шрифт'
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						name='fontSize'
						selected={configuration.fontSizeOption}
						onChange={(fontSize) =>
							setConfiguration({ ...configuration, fontSizeOption: fontSize })
						}
					/>
					<Select
						options={fontColors}
						placeholder='Цвет шрифта'
						selected={configuration.fontColor}
						onChange={(fontColor) =>
							setConfiguration({ ...configuration, fontColor: fontColor })
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						placeholder='Цвет фона'
						selected={configuration.backgroundColor}
						onChange={(bgColor) =>
							setConfiguration({ ...configuration, backgroundColor: bgColor })
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder='Ширина контента'
						selected={configuration.contentWidth}
						onChange={(contentW) =>
							setConfiguration({ ...configuration, contentWidth: contentW })
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setConfiguration(defaultArticleState);
								props.callback(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => props.callback(configuration)}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
