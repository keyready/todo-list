import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useMemo, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { VStack } from 'shared/UI/Stack';
import { Button } from 'primereact/button';
import { Input } from 'shared/UI/Input';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserError, getUserIsLoading } from '../../../model/selectors/UserSelectors';
import classes from './RegisterUserForm.module.scss';
import { createUser } from '../../../model/services/createUser';

interface RegisterUserFormProps {
    className?: string;
    onRegister: () => void;
}

export const RegisterUserForm = memo((props: RegisterUserFormProps) => {
    const { className, onRegister } = props;

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();

    const isUserLoading = useSelector(getUserIsLoading);
    const userError = useSelector(getUserError);

    const isBtnDisabled = useMemo(
        () => !username || !password || isUserLoading,
        [isUserLoading, password, username],
    );

    const handleUserRegister = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const result = await dispatch(createUser({ username, password }));
            if (result.meta.requestStatus === 'fulfilled') {
                onRegister();
            }
        },
        [dispatch, onRegister, password, username],
    );

    return (
        <form
            onSubmit={handleUserRegister}
            className={classNames(classes.RegisterUserForm, {}, [className])}
        >
            <VStack maxW gap="32">
                <Text title="Регистрация пользователя" />

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
                    Зарегистрироваться
                </Button>

                {userError && <Text variant="error" title={userError} />}
            </VStack>
        </form>
    );
});
