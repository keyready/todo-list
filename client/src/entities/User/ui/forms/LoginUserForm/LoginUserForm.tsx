import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useMemo, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { Button } from 'primereact/button';
import { VStack } from 'shared/UI/Stack';
import { Input } from 'shared/UI/Input';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginUser } from 'entities/User/model/services/loginUser';
import { getUserError, getUserIsLoading } from '../../../model/selectors/UserSelectors';
import classes from './LoginUserForm.module.scss';

interface LoginUserFormProps {
    className?: string;
    onLogin: () => void;
}

export const LoginUserForm = memo((props: LoginUserFormProps) => {
    const { className, onLogin } = props;

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();

    const isUserLoading = useSelector(getUserIsLoading);
    const userError = useSelector(getUserError);

    const isBtnDisabled = useMemo(
        () => !username || !password || isUserLoading,
        [isUserLoading, password, username],
    );

    const handleUserLogin = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const result = await dispatch(loginUser({ username, password }));
            if (result.meta.requestStatus === 'fulfilled') {
                onLogin();
            }
        },
        [dispatch, onLogin, password, username],
    );

    return (
        <form
            onSubmit={handleUserLogin}
            className={classNames(classes.LoginUserForm, {}, [className])}
        >
            <VStack maxW gap="32">
                <Text title="Авторизация пользователя" />

                <VStack maxW>
                    <Input value={username} onChange={setUsername} placeholder="Логин" />
                    <Input
                        value={password}
                        onChange={setPassword}
                        type="password"
                        placeholder="Пароль"
                    />
                </VStack>

                <Button loading={isUserLoading} disabled={isBtnDisabled} type="submit">
                    Войти
                </Button>

                {userError && <Text variant="error" title={userError} />}
            </VStack>
        </form>
    );
});
