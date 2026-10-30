import { RoomOption } from '../types/booking';

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: 'standard_room',
    titleKey: 'room_standard_title',
    descriptionKey: 'room_standard_desc',
    pricePerNightUSD: 35,
    badgeKey: 'room_standard_badge',
  },
  {
    id: 'vip_studio',
    titleKey: 'room_vip_title',
    descriptionKey: 'room_vip_desc',
    pricePerNightUSD: 75,
    badgeKey: 'room_vip_badge',
  },
];

