import * as React from 'react';
import { Room } from 'modules/roomsModule';
import { Slider } from 'components/slider/slider';
import * as css from './roomPreview.css';
import { Timebar } from 'components/timebar/timebar';
import { EquipmentList } from '../equipmentList/equipmentList';

interface Props {
    room: Room;
}

export const RoomPreview = ({ room }: Props) => (
    <div className={css.root}>
        <div className={css.sliderWrapper}>
            <Slider theme="roomPreview">
                {room.images.map((imageUrl, index) => (
                    <div key={index}>
                        <div
                            className={css.sliderImage}
                            style={{
                                backgroundImage: `url(https://challenges.1aim.com/roombooking/${imageUrl})`,
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
        <div className={css.bodyWrapper}>
            <h2 className={css.title}>Room {room.name}</h2>
            <div className={css.subTitle}>{room.location}</div>
            <div className={css.meta}>{room.size} · capacity {room.capacity} people</div>
            <EquipmentList className={css.equipment} equipment={room.equipment} />
            <Timebar className={css.timebar} freeIntervals={room.avail} />
        </div>
    </div>
);
