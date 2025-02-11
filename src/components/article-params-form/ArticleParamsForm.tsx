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
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	setArticleConfig: (formState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleConfig,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLFormElement | null>(null);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleConfig(formState);
	};
	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleConfig(defaultArticleState);
	};
	const onChange = () => {
		if (isOpen) {
			setIsOpen((prev) => !prev);
		}
	};
	useOutsideClickClose({ isOpen, rootRef, onChange });
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					ref={rootRef}
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase dynamic={false}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						placeholder=''
						selected={formState.fontFamilyOption}
						onChange={(font) =>
							setFormState({ ...formState, fontFamilyOption: font })
						}
						title='Шрифт'
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						name='fontSize'
						selected={formState.fontSizeOption}
						onChange={(fontSize) =>
							setFormState({ ...formState, fontSizeOption: fontSize })
						}
					/>
					<Select
						options={fontColors}
						placeholder=''
						selected={formState.fontColor}
						onChange={(fontColor) =>
							setFormState({ ...formState, fontColor: fontColor })
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						placeholder=''
						selected={formState.backgroundColor}
						onChange={(bgColor) =>
							setFormState({ ...formState, backgroundColor: bgColor })
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder=''
						selected={formState.contentWidth}
						onChange={(contentW) =>
							setFormState({ ...formState, contentWidth: contentW })
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
