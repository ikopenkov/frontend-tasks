import * as React from 'react';
import * as css from './timebar.css';
import * as classnames from 'classnames';

const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const MINUTES = [0, 15, 30, 45];
const HOURS_STEP = 1;
const MINUTES_STEP = 15;

const calcFreeIntervalsMap = (freeIntervals: string[]) =>
    freeIntervals.reduce((result, interval) => {
        const [[hourFrom, minuteFrom], [hourTo, minuteTo]] = interval
            .split(' - ')
            .map(time => time.split(':').map(number => +number));
        let currentHour = hourFrom;
        let currentMinute = minuteFrom;
        while (currentHour <= hourTo) {
            const isLastHour = currentHour === hourTo;
            while (
                isLastHour
                    ? currentMinute <= minuteTo
                    : currentMinute <= MINUTES[MINUTES.length - 1]
            ) {
                result.push(`${currentHour}:${currentMinute}`);
                currentMinute += MINUTES_STEP;
            }
            currentMinute = 0;
            currentHour += HOURS_STEP;
        }
        return result;
    }, []);

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
    freeIntervals: string[];
}

export const Timebar = ({ freeIntervals, className, ...props }: Props) => {
    const freeIntervalsMap = calcFreeIntervalsMap(freeIntervals);

    return (
        <div className={classnames(css.root, className)} {...props}>
            <div className={css.wrapper}>
                {HOURS.map((hour, index) => {
                    return (
                        <div key={index} className={css.hour}>
                            <div className={css.hourText}>
                                {hour < 10 ? `0${hour}` : hour}
                                <span className={css.hourTextMinutes}>:00</span>
                            </div>
                            <div className={css.hourBar}>
                                {MINUTES.map((minute, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={classnames(
                                                css.minute,
                                                freeIntervalsMap.includes(
                                                    `${hour}:${minute}`,
                                                )
                                                    ? css.free
                                                    : css.occupied,
                                            )}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
