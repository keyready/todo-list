import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/UI/Text';
import { AppLink } from 'shared/UI/AppLink';
import { useLocation } from 'react-router-dom';
import classes from './NavbarLink.module.scss';

interface NavbarLinkProps {
    className?: string;
    to: string;
    text: string;
}

export const NavbarLink = memo((props: NavbarLinkProps) => {
    const { className, text, to } = props;

    const location = useLocation();

    return (
        <AppLink className={classNames(classes.NavbarLink, {}, [className])} to={to}>
            <Text
                textClassname={classNames(classes.linkText, {
                    [classes.activeLink]: location.pathname === to,
                })}
                text={text}
            />
        </AppLink>
    );
});
