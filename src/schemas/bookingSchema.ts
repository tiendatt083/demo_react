import { z } from 'zod';

/** Dung lượng file tối đa cho phép: 2MB (2 * 1024 * 1024 bytes) */
export const MAX_FILE_SIZE = 2 * 1024 * 1024;

/** Danh sách định dạng ảnh CCCD / Hộ chiếu được chấp nhận */
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'] as const;

/** Danh sách loại phòng hợp lệ */
export const ROOM_TYPES = ['standard_room', 'vip_studio'] as const;

/**
 * Trích xuất đối tượng File thực tế từ FileList hoặc File đơn lẻ
 */
function extractFile(value: unknown): File | null {
  if (!value) return null;
  if (typeof FileList !== 'undefined' && value instanceof FileList) {
    return value.length > 0 ? value[0] : null;
  }
  if (typeof File !== 'undefined' && value instanceof File) {
    return value;
  }
  return null;
}

/**
 * Zod Schema xác thực dữ liệu cho Form Đặt Phòng Quốc Tế
 * Các thông báo lỗi sử dụng translation keys (val_*) để tương thích hoàn hảo với i18n
 */
export const bookingSchema = z.object({
  // Tên khách thuê: Bắt buộc, tối thiểu 2 ký tự
  guestName: z
    .string({ required_error: 'val_guest_name_required' })
    .trim()
    .min(1, 'val_guest_name_required')
    .min(2, 'val_guest_name_min'),

  // Email nhận thông tin: Chuỗi email hợp lệ
  email: z
    .string({ required_error: 'val_email_required' })
    .trim()
    .min(1, 'val_email_required')
    .email('val_email_invalid'),

  // Số đêm ở: Sử dụng z.coerce.number().min(1, "val_nights_min") để ép kiểu text input sang number
  nights: z.coerce
    .number({ invalid_type_error: 'val_nights_invalid' })
    .min(1, 'val_nights_min'),

  // Loại phòng: Bắt buộc chọn 1 trong 2 loại phòng chuẩn ('standard_room' hoặc 'vip_studio')
  roomType: z.enum(ROOM_TYPES, {
    errorMap: () => ({ message: 'val_room_type_required' }),
  }),

  // Ảnh CCCD/Hộ chiếu: Kiểm tra bắt buộc có file, dung lượng <= 2MB, chỉ nhận file ảnh (image/jpeg, image/png)
  passportPhoto: z
    .custom<FileList | File>((value) => {
      const file = extractFile(value);
      return file !== null;
    }, { message: 'val_passport_required' })
    .refine((value) => {
      const file = extractFile(value);
      if (!file) return false;
      return file.size <= MAX_FILE_SIZE;
    }, { message: 'val_passport_max_size' })
    .refine((value) => {
      const file = extractFile(value);
      if (!file) return false;
      return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type);
    }, { message: 'val_passport_invalid_type' }),
});

/**
 * Type suy diễn từ Zod schema, đảm bảo tính đồng bộ tuyệt đối giữa Schema và TypeScript Types
 */
export type BookingFormValues = z.infer<typeof bookingSchema>;

