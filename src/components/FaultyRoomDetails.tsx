import React from 'react';
import '../styles/FaultyRoomDetails.css';

export interface FaultyRoomDetailsProps {
  /** Cờ kích hoạt lỗi cố tình để kiểm thử Error Boundary */
  triggerCrash: boolean;
}

/**
 * Component hiển thị thông tin tiện ích phòng nghỉ
 * Giao diện tối giản, thanh lịch, tuân thủ kiến trúc phân tách View CSS riêng biệt.
 */
export const FaultyRoomDetails: React.FC<FaultyRoomDetailsProps> = ({ triggerCrash }) => {
  // [FAULT INJECTION]: Khi triggerCrash = true, cố tình truy cập thuộc tính của null
  if (triggerCrash) {
    return (
      <div>
        {(null as any).amenities.map((item: any) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    );
  }

  // Khi hoạt động bình thường
  const standardAmenities = [
    { id: 'wifi', name: 'Wifi tốc độ cao (Fiber 300 Mbps)' },
    { id: 'ac', name: 'Điều hòa 2 chiều Inverter' },
    { id: 'kitchen', name: 'Bếp tiện nghi & Tủ lạnh riêng' },
    { id: 'bath', name: 'Bình nóng lạnh & Phòng tắm khép kín' },
  ];

  return (
    <div className="room-details-card">
      <h4 className="room-details-title">
        Tiện ích phòng tiêu chuẩn (Đang hoạt động ổn định)
      </h4>

      <div className="amenities-grid">
        {standardAmenities.map((amenity) => (
          <div key={amenity.id} className="amenity-item">
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                marginInlineEnd: '0.5rem',
              }}
            />
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaultyRoomDetails;
