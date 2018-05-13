import { Api } from 'api';

const loadRooms = async (date: number) =>
    await Api.load({
        url: 'https://challenges.1aim.com/roombooking/getrooms',
        method: 'POST',
        data: { date },
    });

export const RoomsApi = {
    loadRooms,
};
