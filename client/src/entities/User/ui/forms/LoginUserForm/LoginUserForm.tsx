import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback } from 'react';
import { Text } from 'shared/UI/Text';
import classes from './LoginUserForm.module.scss';

interface LoginUserFormProps {
    className?: string;
    onLogin: () => void;
}

export const LoginUserForm = memo((props: LoginUserFormProps) => {
    const { className, onLogin } = props;

    const handleUserLogin = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onLogin();
        },
        [onLogin],
    );

    return (
        <form
            onSubmit={handleUserLogin}
            className={classNames(classes.LoginUserForm, {}, [className])}
        >
            <Text title="Авторизация пользователя" />
        </form>
    );
});
