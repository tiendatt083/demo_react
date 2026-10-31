import React from 'react';

export interface FaultyRoomDetailsProps {
  /** Cờ kích hoạt lỗi cố tình để kiểm thử Error Boundary */
  triggerCrash: boolean;
}

/**
 * Component hiển thị thông tin tiện ích phòng nghỉ
 * Giao diện tối giản, thanh lịch, không dùng icon emoji.
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
    <div
      style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1rem',
        margin: '0.75rem 0',
      }}
    >
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '0.9rem', fontWeight: 600 }}>
        Tiện ích phòng tiêu chuẩn (Đang hoạt động ổn định)
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
        {standardAmenities.map((amenity) => (
          <div
            key={amenity.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: '0.45rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              fontSize: '0.85rem',
              color: '#334155',
            }}
          >
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', marginInlineEnd: '0.5rem' }} />
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaultyRoomDetails;
