import { RoomType } from '../types/booking';

/**
 * Bảng đơn giá phòng theo đêm:
 * - standard: 300,000 VND / $15 USD / ¥100 CNY
 * - vip: 800,000 VND / $40 USD / ¥280 CNY
 */
export const ROOM_RATES = {
  standard_room: {
    VND: 300_000,
    USD: 15,
    CNY: 100,
  },
  vip_studio: {
    VND: 800_000,
    USD: 40,
    CNY: 280,
  },
} as const;

/**
 * Định dạng tổng tiền phòng dựa theo số đêm, hạng phòng và ngôn ngữ hiện tại.
 * Sử dụng thuần API Native Intl.NumberFormat:
 * - lang === 'vi' => Đơn vị tiền tệ VND (vi-VN)
 * - lang === 'zh' => Đơn vị tiền tệ CNY (zh-CN)
 * - lang === 'en' => Đơn vị tiền tệ USD (en-US)
 */
export function formatRoomPrice(totalNights: number | string, roomType: RoomType | string, lang: string): string {
  const numNights = Number(totalNights);
  const safeNights = Number.isFinite(numNights) && numNights > 0 ? numNights : 0;
  const rateKey = roomType === 'vip_studio' ? 'vip_studio' : 'standard_room';

  let currency = 'USD';
  let targetLocale = 'en-US';
  let unitPrice: number = ROOM_RATES[rateKey].USD;
  let fractionDigits = 2;

  if (lang === 'vi') {
    currency = 'VND';
    targetLocale = 'vi-VN';
    unitPrice = ROOM_RATES[rateKey].VND;
    fractionDigits = 0;
  } else if (lang === 'zh') {
    currency = 'CNY';
    targetLocale = 'zh-CN';
    unitPrice = ROOM_RATES[rateKey].CNY;
    fractionDigits = 2;
  }

  const totalAmount = safeNights * unitPrice;

  const formatter = new Intl.NumberFormat(targetLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  return formatter.format(totalAmount);
}

/**
 * Định dạng ngày nhận phòng check-in theo chuẩn bản địa hóa (Intl.DateTimeFormat).
 */
export function formatCheckinDate(date: Date, lang: string): string {
  const localeMap: Record<string, string> = {
    vi: 'vi-VN',
    en: 'en-US',
    zh: 'zh-CN',
  };

  const targetLocale = localeMap[lang] || 'vi-VN';

  const formatter = new Intl.DateTimeFormat(targetLocale, {
    dateStyle: 'full',
  });

  return formatter.format(date);
}
