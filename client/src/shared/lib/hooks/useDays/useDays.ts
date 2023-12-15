import { useMemo } from 'react';

interface Options {
    isLower?: boolean;
}

export const useDays = (date: Date, options?: Options) => {
    const days = useMemo(
        () => ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        [],
    );

    return options?.isLower ? days[date.getDay()].toLowerCase() : days[date.getDay()];
};
