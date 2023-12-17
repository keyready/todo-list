import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/UI/Text';
import classes from './RegisterUserForm.module.scss';

interface RegisterUserFormProps {
    className?: string;
    onRegister: () => void;
}

export const RegisterUserForm = memo((props: RegisterUserFormProps) => {
    const { className, onRegister } = props;

    return (
        <div className={classNames(classes.RegisterUserForm, {}, [className])}>
            <Text title="Создание пользователя" />
        </div>
    );
});
