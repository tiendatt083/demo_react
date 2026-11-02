import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import { bookingSchema, BookingFormValues } from '../schemas/bookingSchema';
import { formatRoomPrice, formatCheckinDate } from '../utils/formatters';
import '../styles/BookingForm.css';

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
    <div className="form-card">
      {/* Huy hiệu đếm Re-render */}
      <div className="render-counter-badge">
        <span className="render-counter-label">
          {t('renderCountBadge')}: <strong className="render-counter-number">{renderCount.current}</strong>
        </span>
        <span className="render-counter-note">
          (RHF Uncontrolled Form giảm thiểu re-render tối đa)
        </span>
      </div>

      {/* Thông báo Thành công hoặc Lỗi Async */}
      {successMessage && (
        <div role="status" className="alert-box alert-box-success">
          {successMessage}
        </div>
      )}

      {apiError && (
        <div role="alert" className="alert-box alert-box-error">
          <strong>{apiError}</strong>
          <div className="alert-hint">
            {t('apiErrorHint')}
          </div>
        </div>
      )}

      {/* Form chính */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Hàng 1: Họ và tên & Email */}
        <div className="form-grid-row">
          <div className="form-group">
            <label htmlFor="guestName" className="form-label">
              {t('labels.guestName')} <span className="required-star">*</span>
            </label>
            <input
              id="guestName"
              type="text"
              placeholder={t('placeholders.guestName')}
              aria-invalid={errors.guestName ? 'true' : 'false'}
              aria-describedby={errors.guestName ? 'guestName-error' : undefined}
              {...register('guestName')}
              className={`form-control ${errors.guestName ? 'form-control-error' : ''}`}
            />
            {errors.guestName && (
              <p id="guestName-error" role="alert" className="field-error-text">
                {t(errors.guestName.message as string)}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t('labels.email')} <span className="required-star">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('placeholders.email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
              className={`form-control ${errors.email ? 'form-control-error' : ''}`}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="field-error-text">
                {t(errors.email.message as string)}
              </p>
            )}
          </div>
        </div>

        {/* Hàng 2: Số đêm & Hạng phòng (Controller) */}
        <div className="form-grid-row">
          <div className="form-group">
            <label htmlFor="nights" className="form-label">
              {t('labels.nights')} <span className="required-star">*</span>
            </label>
            <input
              id="nights"
              type="number"
              min={1}
              placeholder={t('placeholders.nights')}
              {...register('nights', { valueAsNumber: true })}
              className={`form-control ${errors.nights ? 'form-control-error' : ''}`}
            />
            {errors.nights ? (
              <p className="field-error-text">
                {t(errors.nights.message as string)}
              </p>
            ) : (
              <p className="field-hint-text">
                {t('apiErrorHint')}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="roomType" className="form-label">
              {t('labels.roomType')} <span className="required-star">*</span>
            </label>
            <Controller
              name="roomType"
              control={control}
              render={({ field }) => (
                <select
                  id="roomType"
                  {...field}
                  className={`form-control form-select ${errors.roomType ? 'form-control-error' : ''}`}
                >
                  <option value="standard_room">{t('rooms.standard_room')}</option>
                  <option value="vip_studio">{t('rooms.vip_studio')}</option>
                </select>
              )}
            />
            {errors.roomType && (
              <p className="field-error-text">
                {t(errors.roomType.message as string)}
              </p>
            )}
          </div>
        </div>

        {/* Khối Hiển thị Ước tính Tổng tiền theo thời gian thực */}
        <div className="price-card">
          <div>
            <div className="price-date-info">
              {t('checkinDate')}: <strong>{checkinDateFormatted}</strong>
            </div>
            <div className="price-label-text">
              {t('priceEstimate')}:
            </div>
          </div>
          <div className="price-total-amount">
            {estimatedPrice}
          </div>
        </div>

        {/* Hàng 3: Upload Ảnh CCCD/Hộ chiếu */}
        <div className="form-group">
          <label htmlFor="passportPhoto" className="form-label">
            {t('labels.passportPhoto')} <span className="required-star">*</span>
          </label>
          <input
            id="passportPhoto"
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
            className={`file-input ${errors.passportPhoto ? 'form-control-error' : ''}`}
          />
          <p className="field-hint-text">
            {t('passportUploadHint')}
          </p>
          {errors.passportPhoto && (
            <p className="field-error-text">
              {t(errors.passportPhoto.message as string)}
            </p>
          )}

          {/* Vùng Preview ảnh */}
          {previewUrl && (
            <div className="preview-container">
              <span className="preview-title">
                {t('passportPreview')}:
              </span>
              <img
                src={previewUrl}
                alt="Passport/ID Preview"
                className="preview-image"
              />
              <button
                type="button"
                onClick={handleClearPhoto}
                className="preview-delete-btn"
              >
                Xóa ảnh đã chọn
              </button>
            </div>
          )}
        </div>

        {/* Ô đối chứng Re-render: Dùng useState thuần */}
        <div className="re-render-test-card">
          <label htmlFor="specialNotes" className="re-render-test-label">
            {t('labels.specialNotes')}
          </label>
          <input
            id="specialNotes"
            type="text"
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder={t('placeholders.specialNotes')}
            className="form-control re-render-test-input"
          />
          <p className="field-hint-text">
            Quan sát: Mỗi ký tự gõ ở ô này kích hoạt React State Re-render (bộ đếm phía trên nhảy số liên tục).
          </p>
        </div>

        {/* Nút bấm Submit với trạng thái chống Double Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? (
            <>
              <span className="spinner-icon" />
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
