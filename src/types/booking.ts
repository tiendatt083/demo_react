/**
 * Định nghĩa các loại phòng hỗ trợ tại Cổng Đặt Phòng Trọ & Homestay Quốc Tế
 */
export type RoomType = 'standard_room' | 'vip_studio';

/**
 * Interface đại diện cho dữ liệu đầu vào của Form đặt phòng
 */
export interface BookingFormInput {
  /** Tên khách thuê phòng (tối thiểu 2 ký tự) */
  guestName: string;

  /** Email nhận vé phòng và hóa đơn điện tử */
  email: string;

  /** Số đêm lưu trú (tối thiểu 1 đêm) */
  nights: number;

  /** Loại phòng đặt ('standard_room' hoặc 'vip_studio') */
  roomType: RoomType;

  /** Ảnh chụp CCCD hoặc Hộ chiếu để làm thủ tục nhận phòng quốc tế */
  passportPhoto: FileList | File;
}
