import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { alignsMapper, headerTagMapper, sizeMapper, variantsMapper } from '../types/TextMappers';
import { TextAlign, TextSize, TextVariant } from '../types/Text.types';
import classes from './Text.module.scss';

interface TextProps {
    className?: string;
    titleClassname?: string;
    textClassname?: string;
    title?: string;
    text?: string;
    align?: TextAlign;
    size?: TextSize;
    variant?: TextVariant;
    type?: 'textType' | 'titleType';
    onClick?: () => void;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        align = 'left',
        size = 'medium',
        variant = 'primary',
        textClassname,
        titleClassname,
        type = 'title',
        onClick,
    } = props;

    const variantsClasses = variantsMapper[variant];
    const alignsClasses = alignsMapper[align];
    const sizeClasses = sizeMapper[size];
    const HeaderTag = headerTagMapper[size];

    const add = [
        className,
        variantsClasses,
        alignsClasses,
        sizeClasses,
        type === 'textType' ? classes.textType : '',
    ];

    return (
        <div onClick={onClick} className={classNames(classes.Text, {}, add)}>
            {title && (
                <HeaderTag className={classNames(classes.title, {}, [titleClassname])}>
                    {title}
                </HeaderTag>
            )}
            {text && <p className={classNames(classes.text, {}, [textClassname])}>{text}</p>}
        </div>
    );
});
