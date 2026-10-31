import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import { bookingSchema, BookingFormValues } from '../schemas/bookingSchema';
import { formatRoomPrice, formatCheckinDate } from '../utils/formatters';

export const BookingForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'vi';

  // 1. Đối chứng Re-render
  const renderCount = useRef(0);
  renderCount.current += 1;

  const [specialNotes, setSpecialNotes] = useState<string>('');

  // 2. Trạng thái phản hồi từ API giả lập & Preview ảnh
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 3. Khởi tạo React Hook Form với Zod Schema
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
    defaultValues: {
      guestName: '',
      email: '',
      nights: 1,
      roomType: 'standard_room',
      passportPhoto: undefined as unknown as FileList,
    },
  });

  // 4. Theo dõi giá trị thời gian thực để tính tiền
  const [watchedNights, watchedRoomType] = watch(['nights', 'roomType']);
  const estimatedPrice = formatRoomPrice(watchedNights ?? 1, watchedRoomType || 'standard_room', currentLang);
  const checkinDateFormatted = formatCheckinDate(new Date(), currentLang);

  // 5. Xử lý Preview ảnh & Cleanup tránh Memory Leak
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const newUrl = URL.createObjectURL(file);
      setPreviewUrl(newUrl);
    } else {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Xóa ảnh đã chọn và đồng bộ lại với React Hook Form
  const handleClearPhoto = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setValue('passportPhoto', undefined as unknown as FileList, { shouldValidate: true });
  };

  // 6. Xử lý Submit form
  const onSubmit = async (data: BookingFormValues) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Number(data.nights) > 10) {
            reject(new Error('ROOM_OCCUPIED_409'));
          } else {
            resolve();
          }
        }, 1200);
      });

      setSuccessMessage(t('messages.success'));
      reset();
      handleClearPhoto();
    } catch {
      setApiError(t('messages.apiError'));
    }
  };

  const { ref: fileRegisterRef, onChange: onRHFFileChange, ...restFileRegister } = register('passportPhoto');

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.75rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        textAlign: 'start', // Hỗ trợ đảo chiều chuẩn khi chuyển LTR <-> RTL
      }}
    >
      {/* Huy hiệu đếm Re-render tối giản */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '0.6rem 0.9rem',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
        }}
      >
        <span style={{ color: '#334155', fontWeight: 600 }}>
          {t('renderCountBadge')}: <strong style={{ color: '#2563eb' }}>{renderCount.current}</strong>
        </span>
        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
          (RHF Uncontrolled Form giảm thiểu re-render tối đa)
        </span>
      </div>

      {/* Thông báo Thành công hoặc Lỗi Async */}
      {successMessage && (
        <div
          role="status"
          style={{
            padding: '0.9rem 1rem',
            backgroundColor: '#ecfdf5',
            border: '1px solid #6ee7b7',
            borderRadius: '6px',
            color: '#065f46',
            marginBottom: '1.25rem',
            fontSize: '0.9rem',
          }}
        >
          {successMessage}
        </div>
      )}

      {apiError && (
        <div
          role="alert"
          style={{
            padding: '0.9rem 1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #f87171',
            borderRadius: '6px',
            color: '#991b1b',
            marginBottom: '1.25rem',
            fontSize: '0.9rem',
          }}
        >
          <strong>{apiError}</strong>
          <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: '#b91c1c' }}>
            {t('apiErrorHint')}
          </div>
        </div>
      )}

      {/* Form chính */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Hàng 1: Họ và tên & Email */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.875rem', color: '#374151' }}>
              {t('labels.guestName')} <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="text"
              placeholder={t('placeholders.guestName')}
              {...register('guestName')}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: '6px',
                border: errors.guestName ? '1px solid #dc2626' : '1px solid #d1d5db',
                boxSizing: 'border-box',
                outline: 'none',
                fontSize: '0.9rem',
              }}
            />
            {errors.guestName && (
              <p style={{ margin: '0.35rem 0 0 0', color: '#dc2626', fontSize: '0.8rem' }}>
                {t(errors.guestName.message as string)}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.875rem', color: '#374151' }}>
              {t('labels.email')} <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="email"
              placeholder={t('placeholders.email')}
              {...register('email')}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: '6px',
                border: errors.email ? '1px solid #dc2626' : '1px solid #d1d5db',
                boxSizing: 'border-box',
                outline: 'none',
                fontSize: '0.9rem',
              }}
            />
            {errors.email && (
              <p style={{ margin: '0.35rem 0 0 0', color: '#dc2626', fontSize: '0.8rem' }}>
                {t(errors.email.message as string)}
              </p>
            )}
          </div>
        </div>

        {/* Hàng 2: Số đêm & Hạng phòng (Controller) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.875rem', color: '#374151' }}>
              {t('labels.nights')} <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="number"
              min={1}
              placeholder={t('placeholders.nights')}
              {...register('nights', { valueAsNumber: true })}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: '6px',
                border: errors.nights ? '1px solid #dc2626' : '1px solid #d1d5db',
                boxSizing: 'border-box',
                outline: 'none',
                fontSize: '0.9rem',
              }}
            />
            {errors.nights ? (
              <p style={{ margin: '0.35rem 0 0 0', color: '#dc2626', fontSize: '0.8rem' }}>
                {t(errors.nights.message as string)}
              </p>
            ) : (
              <p style={{ margin: '0.35rem 0 0 0', color: '#64748b', fontSize: '0.75rem' }}>
                {t('apiErrorHint')}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.875rem', color: '#374151' }}>
              {t('labels.roomType')} <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <Controller
              name="roomType"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '6px',
                    border: errors.roomType ? '1px solid #dc2626' : '1px solid #d1d5db',
                    boxSizing: 'border-box',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  <option value="standard_room">{t('rooms.standard_room')}</option>
                  <option value="vip_studio">{t('rooms.vip_studio')}</option>
                </select>
              )}
            />
            {errors.roomType && (
              <p style={{ margin: '0.35rem 0 0 0', color: '#dc2626', fontSize: '0.8rem' }}>
                {t(errors.roomType.message as string)}
              </p>
            )}
          </div>
        </div>

        {/* Khối Hiển thị Ước tính Tổng tiền theo thời gian thực */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              {t('checkinDate')}: <strong>{checkinDateFormatted}</strong>
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155', marginTop: '0.2rem' }}>
              {t('priceEstimate')}:
            </div>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#059669' }}>
            {estimatedPrice}
          </div>
        </div>

        {/* Hàng 3: Upload Ảnh CCCD/Hộ chiếu */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.875rem', color: '#374151' }}>
            {t('labels.passportPhoto')} <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            ref={(node) => {
              fileRegisterRef(node);
              fileInputRef.current = node;
            }}
            onChange={(e) => {
              onRHFFileChange(e);
              handleFileChange(e);
            }}
            {...restFileRegister}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.45rem',
              borderRadius: '6px',
              border: errors.passportPhoto ? '1px solid #dc2626' : '1px solid #d1d5db',
              boxSizing: 'border-box',
              fontSize: '0.85rem',
            }}
          />
          <p style={{ margin: '0.35rem 0 0 0', color: '#64748b', fontSize: '0.75rem' }}>
            {t('passportUploadHint')}
          </p>
          {errors.passportPhoto && (
            <p style={{ margin: '0.35rem 0 0 0', color: '#dc2626', fontSize: '0.8rem' }}>
              {t(errors.passportPhoto.message as string)}
            </p>
          )}

          {/* Vùng Preview ảnh */}
          {previewUrl && (
            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>
                {t('passportPreview')}:
              </span>
              <img
                src={previewUrl}
                alt="Passport/ID Preview"
                style={{
                  maxWidth: '220px',
                  maxHeight: '140px',
                  borderRadius: '4px',
                  objectFit: 'cover',
                  border: '1px solid #cbd5e1',
                }}
              />
              <button
                type="button"
                onClick={handleClearPhoto}
                style={{
                  fontSize: '0.75rem',
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                Xóa ảnh đã chọn
              </button>
            </div>
          )}
        </div>

        {/* Ô đối chứng Re-render: Dùng useState thuần */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '0.85rem',
            marginBottom: '1.5rem',
          }}
        >
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.8rem', color: '#475569' }}>
            {t('labels.specialNotes')}
          </label>
          <input
            type="text"
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder={t('placeholders.specialNotes')}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              boxSizing: 'border-box',
              fontSize: '0.85rem',
              backgroundColor: '#ffffff',
            }}
          />
          <p style={{ margin: '0.35rem 0 0 0', color: '#64748b', fontSize: '0.75rem' }}>
            Quan sát: Mỗi ký tự gõ ở ô này kích hoạt React State Re-render (bộ đếm phía trên nhảy số liên tục).
          </p>
        </div>

        {/* Nút bấm Submit với trạng thái chống Double Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem 1.5rem',
            backgroundColor: isSubmitting ? '#94a3b8' : '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.15s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {isSubmitting ? (
            <>
              <span
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  border: '2px solid #ffffff',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <span>{t('buttons.processing')}</span>
            </>
          ) : (
            <span>{t('buttons.submit')}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
