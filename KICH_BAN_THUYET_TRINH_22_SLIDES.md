# KỊCH BẢN THUYẾT TRÌNH BÁO CÁO CHUYÊN ĐỀ (22 SLIDES)
**Học phần:** Phát triển Ứng dụng Web Nâng cao / Chuyên đề React.js  
**Đề tài:** React Form Handling, Error Handling & Internationalization (i18n)  
**Dự án Minh chứng:** Global Checkout & Profile Portal (`global-stay-portal`)  
**Thời lượng báo cáo:** 40 – 45 phút  
**Nhóm thực hiện:**  
- **Speaker 1 (S1):** Phụ trách Module 1 - React Form Handling & Quản lý bộ nhớ.  
- **Speaker 2 (S2):** Phụ trách Module 2 - Error Handling & Module 3 - Internationalization (i18n).  

---

## BẢNG PHÂN BỔ THỜI GIAN & CẤU TRÚC BÀI BÁO CÁO

| STT | Khối Nội Dung | Slide | Người Trình Bày | Thời Lượng | Trọng Tâm Kỹ Thuật |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **I** | **Phần Mở Đầu & Đặt Vấn Đề** | Slide 1 – 3 | Cả 2 thành viên | 3 – 4 phút | Giới thiệu thành viên, vị trí đề tài trong hệ sinh thái React, kiến trúc 3 tầng của dự án demo. |
| **II** | **Module 1: React Form Handling** | Slide 4 – 11 | **Speaker 1** | 15 – 17 phút | Form State, Controlled vs Uncontrolled, A11y, RHF v7+ & Zod Schema, File Upload & Thu hồi RAM (**3 Demo**). |
| **III** | **Module 2: Error Handling** | Slide 12 – 14 | **Speaker 2** | 8 – 9 phút | Phân loại 3 tầng lỗi, Async State Machine, Class Error Boundary & 4 giới hạn kỹ thuật (**1 Demo**). |
| **IV** | **Module 3: Internationalization** | Slide 15 – 18 | **Speaker 2** | 8 – 9 phút | i18n vs l10n, JSON Namespaces, Native Web Intl API (0 KB bundle), CSS Logical Properties & RTL 180° (**1 Demo**). |
| **V** | **Tổng Kết, Mini-Game & Q&A** | Slide 19 – 22 | Cả 2 thành viên | 6 – 8 phút | 3 Quy tắc vàng, Phát động Mini-game vinh danh Top 3, Phiên phản biện với Giảng viên & Lời cảm ơn. |

---

# PHẦN I: MỞ ĐẦU & ĐẶT VẤN ĐỀ (SLIDE 1 – 3)

---

### 📍 SLIDE 1: TIÊU ĐỀ BÀI BÁO CÁO (TITLE SLIDE)
- **Thời lượng:** ~1.5 phút
- **Người trình bày:** Speaker 1 mở đầu $\rightarrow$ Speaker 2 tiếp nối.
- **Mục tiêu:** Chào hỏi trang trọng, giới thiệu tên đề tài, tính ứng dụng thực tế và phân định rõ trách nhiệm của từng thành viên.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Kính thưa Thầy/Cô trong Hội đồng chấm báo cáo và chào toàn thể các bạn sinh viên!  
> Hôm nay, nhóm chúng em xin đại diện nhóm 4 trình bày báo cáo chuyên đề học phần React nâng cao với đề tài: **React Form Handling, Error Handling và Internationalization (i18n)**, hướng tới mục tiêu xây dựng ứng dụng sẵn sàng cho môi trường Production thực tế.  
> Em là [Tên Speaker 1], em sẽ chịu trách nhiệm trình bày Module 1: Xử lý biểu mẫu hiệu năng cao và quản lý tài nguyên bộ nhớ."*  
>  
> **Speaker 2:**  
> *"Và em là [Tên Speaker 2], em sẽ đồng hành cùng Thầy/Cô và các bạn trong Module 2 về Xử lý lỗi, bảo vệ ứng dụng, và Module 3 về Bản địa hóa, quốc tế hóa giao diện người dùng.  
> Bài báo cáo của nhóm được thiết kế trong thời lượng khoảng 40 đến 45 phút, bao gồm phần lý thuyết đi kèm 5 phần thực nghiệm code trực tiếp trên dự án mẫu. Sau đây, em xin mời Speaker 1 bắt đầu với phần đặt vấn đề."*

---

### 📍 SLIDE 2: VỊ TRÍ CHUYÊN ĐỀ TRONG HỆ SINH THÁI REACT
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Mục tiêu:** Làm rõ tính liên kết chặt chẽ của chuyên đề với các kiến thức đã học ở các tuần trước.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Kính thưa Thầy/Cô, để hiểu được lý do vì sao nhóm lựa chọn đề tài này, chúng ta cần nhìn lại tiến trình 4 giai đoạn phát triển một ứng dụng React:  
> - **Giai đoạn 1 (Nhóm 1):** Chúng ta đã nắm vững **TypeScript & React Core**. Đây là nền tảng về cú pháp JSX, cách chia nhỏ Component, luồng truyền Props và quản lý State cục bộ.  
> - **Giai đoạn 2 (Nhóm 2):** Đi sâu vào **Hooks & Lifecycle**, làm chủ cơ chế Virtual DOM, thuật toán Reconciliation của React Fiber và cách đồng bộ dữ liệu với `useEffect`.  
> - **Giai đoạn 3 (Nhóm 3):** Tối ưu hóa giao diện và hiệu năng với **Styling & Performance**, sử dụng Tailwind CSS kết hợp với `React.memo`, `useMemo` và `useCallback`.  
>   
> Tuy nhiên, một ứng dụng có giao diện đẹp và thuật toán tối ưu vẫn chưa thể đưa vào vận hành thực tế nếu thiếu đi 3 yếu tố then chốt ở **Giai đoạn 4**:  
> 1. **Form Handling:** Là nơi tiếp nhận dữ liệu tương tác hai chiều từ người dùng – khu vực tiềm ẩn nhiều nguy cơ gây giảm sút hiệu năng nhất do hiện tượng re-render liên tục.  
> 2. **Error Handling:** Là cơ chế tự bảo vệ của hệ thống, đảm bảo khi xảy ra sự cố mạng hoặc lỗi logic, ứng dụng không bị sập hoàn toàn thành một màn hình trắng.  
> 3. **Internationalization (i18n):** Là điều kiện bắt buộc để sản phẩm có thể mở rộng thị trường, phục vụ người dùng đa quốc gia với các ngôn ngữ và văn hóa hiển thị khác nhau.  
> Ba thành phần này chính là mảnh ghép hoàn thiện để đưa một dự án từ môi trường học tập lên môi trường doanh nghiệp."*

---

### 📍 SLIDE 3: DỰ ÁN DEMO: "GLOBAL CHECKOUT & PROFILE PORTAL"
- **Thời lượng:** ~1.5 phút
- **Người trình bày:** Speaker 2
- **Mục tiêu:** Giới thiệu tổng quan cấu trúc kiến trúc 3 tầng của dự án mẫu để làm cơ sở cho toàn bộ các phần demo sau đó.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 2:**  
> *"Kính thưa Thầy/Cô, nhằm chứng minh tính đúng đắn của các luận điểm kỹ thuật, nhóm chúng em đã xây dựng một dự án thực nghiệm mang tên: **Global Checkout & Profile Portal** – Cổng đặt phòng và hồ sơ khách hàng quốc tế.  
> Hệ thống được phân tách thành 3 tầng kiến trúc độc lập:  
> - **Tầng 1 - Form Layer:** Quản lý biểu mẫu đặt phòng bằng React Hook Form, kiểm tra tính hợp lệ của dữ liệu bằng Zod Schema, xử lý tải ảnh giấy tờ tùy thân và kiểm soát việc thu hồi tài nguyên RAM.  
> - **Tầng 2 - Error Protection Layer:** Quản lý trạng thái gọi API bằng mô hình Async State Machine, xử lý các mã lỗi HTTP như 402 hoặc 409; đồng thời triển khai Class Error Boundary để cô lập lỗi render trong cây Virtual DOM.  
> - **Tầng 3 - Localization Layer:** Tích hợp react-i18next để chuyển đổi ngôn ngữ thời gian thực, chuẩn hóa tiền tệ và ngày tháng qua Native Web Intl API, và tự động đảo chiều giao diện 180° theo chuẩn Right-to-Left (RTL) bằng CSS Logical Properties.  
> Sau đây, xin kính mời Thầy/Cô và các bạn cùng bước vào Module 1 do Speaker 1 trình bày."*

---

# PHẦN II: MODULE 1 – REACT FORM HANDLING (SLIDE 4 – 11)
*Người trình bày & Thao tác Demo: Speaker 1*

---

### 📍 SLIDE 4: BẢN CHẤT FORMS TRONG REACT & FORM STATE
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Luận điểm:** Xử lý biểu mẫu trong React phức tạp hơn HTML truyền thống do nguyên tắc Single Source of Truth, đòi hỏi một cấu trúc Form State toàn diện gồm 6 thuộc tính.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Kính thưa Thầy/Cô, trong HTML thuần, thẻ `<input>` có khả năng tự lưu giữ giá trị của chính nó bên trong DOM tree. Nhưng trong React, nguyên tắc **Single Source of Truth (Nguồn chân lý duy nhất)** yêu cầu mọi dữ liệu hiển thị phải bắt nguồn từ React State. DOM chỉ đóng vai trò là tầng phản chiếu.  
>   
> Khi xây dựng một biểu mẫu nghiệp vụ, Form State không đơn thuần chỉ là một chuỗi string lưu giá trị nhập vào, mà nó là một tập hợp gồm **6 thuộc tính quản lý chặt chẽ**:  
> 1. `values`: Đối tượng lưu trữ toàn bộ giá trị hiện tại của các trường trong form.  
> 2. `errors`: Tập hợp danh sách các lỗi kiểm tra dữ liệu tương ứng với từng trường.  
> 3. `touched`: Cờ boolean xác định người dùng đã từng focus vào ô input rồi blur (rời chuột) ra ngoài hay chưa. Thuộc tính này có ý nghĩa UX quan trọng: Nó ngăn không cho hệ thống hiển thị cảnh báo đỏ khi người dùng mới mở trang và chưa kịp nhập dữ liệu.  
> 4. `dirty / pristine`: Cờ `dirty` cho biết dữ liệu hiện tại đã bị chỉnh sửa so với giá trị mặc định ban đầu (`defaultValues`) hay chưa. Thuộc tính này thường dùng để vô hiệu hóa nút 'Lưu thay đổi' khi người dùng chưa thao tác gì, tránh gửi request rác lên server.  
> 5. `isSubmitting`: Đánh dấu tiến trình gửi dữ liệu bất đồng bộ đang diễn ra, dùng để vô hiệu hóa nút bấm và hiển thị trạng thái chờ.  
> 6. `isValid`: Cờ tổng thể xác nhận toàn bộ các trường trong biểu mẫu đã thỏa mãn mọi quy tắc nghiệp vụ."*

---

### 📍 SLIDE 5: CONTROLLED VS. UNCONTROLLED COMPONENTS
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Luận điểm:** Bản chất của việc lựa chọn giữa Controlled và Uncontrolled nằm ở sự đánh đổi giữa mức độ kiểm soát state và chi phí Re-render của CPU.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Từ nguyên tắc Single Source of Truth, React hình thành hai trường phái thiết kế biểu mẫu:  
> - **Thứ nhất là Controlled Component:** Dữ liệu được lưu trong React State (`useState`). Mỗi khi người dùng gõ một phím, sự kiện `onChange` phát ra, gọi `setState`, và ép toàn bộ Component cha phải re-render để cập nhật `value` mới.  
>   *Hạn chế lớn nhất:* Nếu form có quy mô lớn (30 đến 50 trường) cùng nhiều component lồng nhau, việc gõ phím sẽ kích hoạt re-render liên tục trên từng ký tự, dẫn đến hiện tượng trễ khung hình (input lag).  
> - **Thứ hai là Uncontrolled Component:** Chúng ta để DOM tự lưu giữ giá trị. React không can thiệp vào từng phím gõ mà chỉ truy xuất giá trị khi cần (lúc submit hoặc blur) thông qua `useRef` hoặc `new FormData()`.  
>   *Ưu điểm:* Đạt mức **Zero Re-render khi gõ phím**, giải phóng hoàn toàn tải xử lý cho CPU.  
>   
> **Một lỗi kỹ thuật rất phổ biến liên quan đến vấn đề này:**  
> Đó là cảnh báo: *'A component is changing an uncontrolled input to be controlled'*.  
> *Nguyên nhân:* Do lập trình viên khai báo `useState()` mà không truyền giá trị mặc định, khiến state ban đầu mang giá trị `undefined`. Ở frame render đầu tiên, do `value` là `undefined`, React xếp ô input này vào dạng Uncontrolled. Nhưng ngay khi người dùng gõ ký tự đầu tiên, state chuyển thành chuỗi string có giá trị, ép input biến thành Controlled. React phát hiện sự mâu thuẫn kiến trúc này trong vòng đời của component và đưa ra cảnh báo.  
> *Giải pháp chuẩn mực:* Luôn luôn cung cấp giá trị mặc định ban đầu bằng một chuỗi rỗng: `useState('')`."*

---

### 📍 SLIDE 6: [DEMO 1] CONTROLLED VS. UNCONTROLLED & PROFILER
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Mục tiêu:** Thực nghiệm đo lường số lần re-render thực tế trên ứng dụng chạy tại `localhost:5173`.

#### 🎙️ LỜI THOẠI & THAO TÁC DEMO:
> **Speaker 1:**  
> *(Chuyển màn hình sang trình duyệt đang mở `http://localhost:5173`)*  
> *"Để minh chứng cho luận điểm vừa nêu, em xin thực hiện một thí nghiệm đối chứng trên chính ứng dụng portal của nhóm:  
>   
> [Thao tác 1]: Trên góc trái của form đặt phòng, nhóm có đặt một huy hiệu **Re-render Counter** để đếm số lần component `BookingForm` bị render lại. Hiện tại số đếm là 1.  
> Ô nhập liệu 'Ghi chú đặc biệt' được nhóm cài đặt có chủ đích theo trường phái **Controlled** dùng `useState`. Bây giờ em tiến hành gõ một chuỗi văn bản:  
> *(Speaker 1 gõ phím vào ô Ghi chú)*  
> Như Thầy/Cô và các bạn thấy, mỗi một ký tự được gõ vào, con số counter tăng dần: 2, 3, 4, 5... đến 15 lần render. Component cha bị ép vẽ lại liên tục.  
>   
> [Thao tác 2]: Tiếp theo, em chuyển con trỏ chuột sang ô 'Họ và tên khách hàng' – ô này được quản lý theo trường phái **Uncontrolled** bằng React Hook Form. Em tiến hành gõ họ tên:  
> *(Speaker 1 gõ vào ô Họ tên)*  
> Quan sát lại bộ đếm: **Con số counter hoàn toàn không thay đổi!**  
> Dữ liệu vẫn được thu nhận vào DOM, nhưng component cha không phải tốn chu kỳ tính toán để render lại. Điều này chứng minh Uncontrolled Component mang lại lợi thế vượt trội về mặt hiệu năng."*

---

### 📍 SLIDE 7: FORM VALIDATION, ACCESSIBILITY (A11Y) & SUBMIT HANDLING
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Luận điểm:** Chiến lược bắt lỗi cần cân bằng giữa trải nghiệm người dùng và chuẩn tiếp cận A11y, đồng thời phải phòng chống rủi ro Double Submit trong xử lý bất đồng bộ.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Tiếp theo, chúng ta xét đến chiến lược kiểm tra dữ liệu (Validation) và xử lý sự kiện gửi form.  
> Về thời điểm kích hoạt bắt lỗi:  
> - `onChange`: Bắt lỗi ngay trên từng ký tự. Phương pháp này chỉ nên dùng cho các trường cần phản hồi trực tiếp như độ mạnh của mật khẩu; nếu lạm dụng cho toàn bộ form, người dùng sẽ cảm thấy bị làm phiền khi vừa gõ ký tự đầu tiên đã bị báo lỗi.  
> - `onBlur`: **Được xem là chuẩn vàng về mặt UX**. Hệ thống chỉ kiểm tra khi người dùng đã kết thúc thao tác trên ô đó và chuyển sang vị trí khác.  
> - `onSubmit`: Kiểm tra tổng thể toàn bộ biểu mẫu trước khi gửi đi.  
>   
> **Về chuẩn tiếp cận Accessibility (A11y):**  
> Đối với người dùng khiếm thị sử dụng trình đọc màn hình (Screen Reader), họ không thể nhận biết lỗi qua màu sắc hay viền đỏ. Do đó, các ô input bị lỗi bắt buộc phải có thuộc tính `aria-invalid="true"` và được liên kết bằng `aria-describedby` tới thông báo lỗi có thuộc tính `role="alert"`. Khi đó, trình đọc màn hình sẽ thông báo nội dung lỗi bằng giọng nói cho người dùng.  
>   
> **Về xử lý sự kiện Submit:**  
> Bên cạnh việc gọi `e.preventDefault()` để ngăn reload trang, một yêu cầu bắt buộc là **phải vô hiệu hóa nút submit với `disabled={isSubmitting}`**.  
> Nếu không khóa nút, khi đường truyền mạng bị chậm 1-2 giây, người dùng có xu hướng bấm liên tục nhiều lần. Hậu quả là ứng dụng sẽ gửi nhiều HTTP request trùng lặp lên máy chủ, dẫn đến việc xử lý trùng lặp giao dịch – đây là lỗi nghiêm trọng trong các hệ thống thương mại điện tử và thanh toán."*

---

### 📍 SLIDE 8: CHUẨN CÔNG NGHIỆP: REACT HOOK FORM + ZOD SCHEMA
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Luận điểm:** Sự kết hợp giữa RHF và Zod tạo nên một giải pháp hoàn chỉnh: RHF tối ưu hiệu năng render qua uncontrolled ref, còn Zod đảm nhận tính toàn vẹn và ép kiểu dữ liệu độc lập với UI.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Để giải quyết đồng thời bài toán hiệu năng và tính validation, giải pháp chuẩn công nghiệp hiện nay là kết hợp **React Hook Form (RHF)** với **Zod Resolver**.  
> Cú pháp hiện đại của RHF phiên bản v7+ sử dụng cơ chế destructuring:  
> `<input {...register('guestName')} />`.  
> Lệnh này tự động cung cấp `name`, `ref`, sự kiện `onChange` và `onBlur` cho thẻ input mà vẫn giữ nguyên bản chất uncontrolled.  
>   
> Điểm cốt lõi là toàn bộ quy tắc nghiệp vụ được tách biệt độc lập sang **Zod Schema**:  
> 1. **Khả năng tự động ép kiểu (`z.coerce`):** Thẻ HTML `<input type="number">` theo chuẩn web luôn trả về chuỗi string. Zod giải quyết vấn đề này bằng `z.coerce.number()`, tự động chuyển đổi chuỗi sang kiểu number trước khi kiểm tra điều kiện.  
> 2. **Kiểm tra logic phụ thuộc (`.refine`):** Cho phép so sánh dữ liệu giữa nhiều trường, ví dụ xác thực mật khẩu nhập lại phải trùng khớp với mật khẩu ban đầu.  
> 3. **Thành phần cầu nối `<Controller />`:** Đóng vai trò là adapter kết nối RHF với các thư viện UI tùy biến (như Material UI, React-Select) vốn không hỗ trợ native DOM ref."*

---

### 📍 SLIDE 9: [DEMO 2] FORM VALIDATION VỚI RHF + ZOD
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Mục tiêu:** Minh chứng hoạt động của Zod schema, cơ chế bắt lỗi A11y và tính toán tự động qua `watch()`.

#### 🎙️ LỜI THOẠI & THAO TÁC DEMO:
> **Speaker 1:**  
> *(Chuyển sang màn hình ứng dụng)*  
> *"Bây giờ, em xin minh họa quy trình xác thực dữ liệu trên cổng đặt phòng:  
>   
> [Thao tác 1]: Khi các trường đang để trống, em nhấn nút **'Xác nhận đặt phòng'**:  
> *(Nhấn nút submit)* Hệ thống lập tức kích hoạt validation và hiển thị thông báo lỗi bằng tiếng Việt chuẩn A11y bên dưới từng trường.  
>   
> [Thao tác 2]: Em nhập tên 'Nguyễn Văn An' và click chuột ra ngoài. Lập tức thông báo lỗi biến mất nhờ cơ chế `mode: 'onBlur'`.  
>   
> [Thao tác 3]: Tại ô 'Số đêm ở', em nhập giá trị là 3. Hàm `watch()` kết hợp với `z.coerce.number()` lập tức ép chuỗi '3' thành số 3, nhân với đơn giá phòng và cập nhật Tổng tiền ước tính ở cột bên phải theo thời gian thực mà không làm giật lag giao diện."*

---

### 📍 SLIDE 10: XỬ LÝ TẢI FILE & QUẢN LÝ BỘ NHỚ (MEMORY LEAK)
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Luận điểm:** Tải file cần kiểm tra định dạng và kích thước ở client, đồng thời phải chủ động giải phóng tài nguyên RAM được cấp phát bởi `URL.createObjectURL`.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Đối với tính năng tải file (ảnh căn cước công dân hoặc ảnh đại diện), dữ liệu được đọc qua mảng `e.target.files[0]`. Trước khi gửi lên server, ứng dụng cần kiểm tra dung lượng (`file.size`) và định dạng MIME (`file.type`).  
> Để hiển thị ảnh xem trước ngay lập tức, phương pháp thông dụng là dùng hàm `URL.createObjectURL(file)`.  
>   
> **Tuy nhiên, đây là điểm tiềm ẩn nguy cơ Rò rỉ bộ nhớ (Memory Leak) nếu không nắm vững bản chất:**  
> Mỗi lần hàm `createObjectURL` được gọi, trình duyệt sẽ tạo ra một liên kết tham chiếu trực tiếp vào bộ nhớ RAM. Bộ thu gom rác (Garbage Collector) của trình duyệt **không thể tự động thu hồi** vùng nhớ này chừng nào trang web chưa bị đóng. Nếu người dùng chọn và thay đổi ảnh nhiều lần, các blob URL cũ sẽ tiếp tục tồn đọng trong RAM, gây lãng phí tài nguyên và có thể làm trình duyệt trên điện thoại bị tràn bộ nhớ (crash).  
>   
> **Giải pháp bắt buộc:**  
> Chúng ta phải chủ động gọi lệnh thu hồi `URL.revokeObjectURL(previewUrl)` trong hàm cleanup của `useEffect` khi component unmount, hoặc ngay trước khi tạo một URL ảnh mới.  
> Khi gửi dữ liệu lên server, ta đóng gói file vào đối tượng `FormData` với định dạng `multipart/form-data`."*

---

### 📍 SLIDE 11: [DEMO 3] UPLOAD AVATAR & MEMORY CLEANUP
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 1
- **Mục tiêu:** Thực nghiệm kiểm tra kích thước file tại client và kiểm tra hàm cleanup giải phóng bộ nhớ RAM.

#### 🎙️ LỜI THOẠI & THAO TÁC DEMO:
> **Speaker 1:**  
> *(Chuyển sang màn hình ứng dụng)*  
> *"Em xin thực hiện thao tác kiểm tra việc xử lý file:  
>   
> [Thao tác 1]: Đầu tiên, em chọn một file ảnh có dung lượng lớn hơn 2MB:  
> *(Chọn file lớn)* Zod Schema lập tức kích hoạt điều kiện chặn ngay tại client và thông báo: 'Dung lượng file tối đa là 2MB'. Thao tác này giúp tiết kiệm băng thông và giảm tải cho server.  
>   
> [Thao tác 2]: Em chọn một file ảnh chân dung hợp lệ:  
> Ảnh xem trước hình tròn lập tức được dựng lên trên giao diện thông qua `URL.createObjectURL`.  
>   
> [Thao tác 3]: Khi em nhấn nút 'Xóa ảnh' hoặc đổi sang ảnh khác, hàm dọn dẹp trong `useEffect` sẽ gọi lệnh `URL.revokeObjectURL(previewUrl)`. Vùng nhớ RAM tạm thời được giải phóng ngay lập tức.  
>   
> Kính thưa Thầy/Cô, đó là toàn bộ nội dung của Module 1 về Quản lý Biểu mẫu. Tiếp theo, em xin kính mời Speaker 2 trình bày Module 2 về Xử lý Lỗi trong React."*

---

# PHẦN III: MODULE 2 – ERROR HANDLING IN REACT (SLIDE 12 – 14)
*Người trình bày & Thao tác Demo: Speaker 2*

---

### 📍 SLIDE 12: PHÂN LOẠI LỖI & ASYNC STATE MACHINE
- **Thời lượng:** ~2.5 phút
- **Người trình bày:** Speaker 2
- **Luận điểm:** Một kiến trúc React hoàn chỉnh cần phân định rõ 3 tầng lỗi với phương pháp xử lý tương ứng, và chuẩn hóa trạng thái API bằng mô hình máy trạng thái hữu hạn.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 2:**  
> *"Kính thưa Thầy/Cô và các bạn, bước sang Module 2, chúng ta cùng phân tích các giải pháp bảo vệ ứng dụng khi xảy ra sự cố. Trong môi trường thực tế, lỗi trong React được chia thành **3 tầng hoàn toàn riêng biệt**:  
>   
> 1. **Tầng 1 - Validation Errors (Lỗi dữ liệu đầu vào):** Xuất phát từ người dùng, được xử lý nhẹ nhàng bằng cách hiển thị thông báo inline màu đỏ dưới ô input thông qua Zod.  
> 2. **Tầng 2 - API / Network Errors (Lỗi mạng và máy chủ):** Xuất hiện khi gọi HTTP request (mã lỗi 400, 401, 402 hết tiền, 409 xung đột dữ liệu, 500 lỗi máy chủ hoặc mất kết nối). Tầng này bắt buộc phải được bao bọc trong khối `try...catch` của các hàm bất đồng bộ.  
> 3. **Tầng 3 - Runtime / Rendering Errors (Lỗi sụp đổ Virtual DOM):** Là lỗi logic JavaScript xảy ra ngay trong tiến trình render của React (ví dụ cố gắng truy xuất thuộc tính của `undefined`). Nếu không có cơ chế khoanh vùng, lỗi này sẽ khiến toàn bộ giao diện bị phá vỡ.  
>   
> **Đối với Tầng 2 (Lỗi API):**  
> Việc sử dụng nhiều biến boolean riêng lẻ như `isLoading`, `isError` dễ tạo ra các trạng thái mâu thuẫn (vừa loading vừa có error). Nhóm áp dụng mô hình **Async State Machine** với Union Type duy nhất:  
> `type AsyncStatus = 'idle' | 'loading' | 'error' | 'success'`.  
> Thiết kế này đảm bảo tại một thời điểm hệ thống chỉ ở một trạng thái xác định, đồng thời cho phép cung cấp phản hồi mang tính hành động (Actionable Feedback) tương ứng với từng mã lỗi HTTP thay vì hiển thị câu thông báo chung chung."*

---

### 📍 SLIDE 13: ERROR BOUNDARY & LÁ CHẮN CHỐNG SẬP ỨNG DỤNG
- **Thời lượng:** ~2.5 phút
- **Người trình bày:** Speaker 2
- **Luận điểm:** Phân tích cơ chế unmount của React khi gặp lỗi render, cấu trúc Class Error Boundary và làm rõ 4 trường hợp Error Boundary không thể can thiệp.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 2:**  
> *"Đối với các lỗi xảy ra trong quá trình render (Tầng 3), cơ chế mặc định của React là: Nếu một lỗi render không được bắt, React sẽ **tháo dỡ (unmount) toàn bộ cây component**. Kết quả là người dùng chỉ nhìn thấy một màn hình trắng xóa (**White Screen of Death**).  
> Để giải quyết vấn đề này, React cung cấp thành phần **Error Boundary** đóng vai trò như một cầu dao điện, khoanh vùng khu vực xảy ra sự cố để phần còn lại của ứng dụng vẫn hoạt động.  
>   
> **Về mặt kỹ thuật:**  
> Đến thời điểm hiện tại, Error Boundary **bắt buộc phải được viết dưới dạng Class Component** vì React chưa cung cấp Hook tương đương cho 2 phương thức:  
> 1. `static getDerivedStateFromError(error)`: Phương thức tĩnh thuần túy, nhận vào lỗi và cập nhật state (`hasError: true`) để kích hoạt render giao diện dự phòng (Fallback UI).  
> 2. `componentDidCatch(error, errorInfo)`: Dùng để thực hiện các side-effects như gửi log lỗi lên các hệ thống giám sát (Sentry, LogRocket).  
>   
> **Bốn trường hợp Error Boundary KHÔNG THỂ bắt được:**  
> Đây là điểm mấu chốt cần lưu ý:  
> 1. *Lỗi bên trong Event Handlers (như `onClick`, `onSubmit`):* Vì các sự kiện này diễn ra ngoài tiến trình render của React. Lỗi ở đây bắt buộc phải dùng `try...catch`.  
> 2. *Mã bất đồng bộ:* Các hàm trong `setTimeout`, `requestAnimationFrame` hoặc các promise.  
> 3. *Tiến trình Server-Side Rendering (SSR).*  
> 4. *Lỗi phát sinh ngay trong chính hàm render của Error Boundary.*  
> Do đó, kiến trúc hoàn chỉnh đòi hỏi phải kết hợp song song cả `try...catch` cho các sự kiện và Error Boundary cho các component render."*

---

### 📍 SLIDE 14: [DEMO 4] BẮT LỖI API & MÔ PHỎNG SẬP TRANG (FAULT INJECTION)
- **Thời lượng:** ~2.5 phút
- **Người trình bày:** Speaker 2
- **Mục tiêu:** Thực nghiệm xử lý lỗi API bất đồng bộ và kỹ thuật Fault Injection làm sập component để minh chứng khả năng khoanh vùng của Error Boundary.

#### 🎙️ LỜI THOẠI & THAO TÁC DEMO:
> **Speaker 2:**  
> *(Chuyển sang màn hình ứng dụng)*  
> *"Em xin minh họa hai trường hợp xử lý lỗi trên dự án:  
>   
> [Thao tác 1 - Bắt lỗi API Tầng 2]:  
> Tại ô số đêm ở, em nhập giá trị là 12 đêm. Nghiệp vụ quy định không nhận đặt trực tuyến quá 10 đêm liên tục. Em nhấn nút submit:  
> *(Nhấn submit)* Trạng thái chuyển sang Loading trong 1.2 giây, sau đó API giả lập trả về mã lỗi 409.  
> Nhờ khối `try...catch` và Async State Machine, một **Banner cảnh báo màu đỏ** xuất hiện ngay đầu form giải thích rõ lý do. Giao diện người dùng không bị gián đoạn.  
>   
> [Thao tác 2 - Fault Injection kiểm thử Error Boundary Tầng 3]:  
> Tại component `FaultyRoomDetails` hiển thị chi tiết phòng bên tay phải, nhóm có đặt một nút bấm thử nghiệm mang tên: **'[Mô phỏng sập UI phòng]'**. Khi bấm nút này, code sẽ cố tình đọc thuộc tính của một biến `undefined`.  
> *(Speaker 2 nhấn nút sập UI)*  
> Thầy/Cô và các bạn có thể quan sát:  
> Cả trang web hoàn toàn không bị trắng màn hình.  
> Error Boundary bọc quanh component phòng đã khoanh vùng sự cố và hiển thị **Fallback UI màu đỏ** tại đúng vị trí đó, kèm thông báo lỗi và nút 'Thử khôi phục'.  
> Điều quan trọng là: Thanh điều hướng phía trên và toàn bộ Form đặt phòng bên dưới **vẫn hoạt động hoàn toàn bình thường**, cho phép người dùng tiếp tục thao tác mà không mất dữ liệu đã nhập."*

---

# PHẦN IV: MODULE 3 – INTERNATIONALIZATION & LOCALIZATION (SLIDE 15 – 18)
*Người trình bày & Thao tác Demo: Speaker 2*

---

### 📍 SLIDE 15: KHÁI NIỆM i18n/l10n & HỆ SINH THÁI REACT-I18NEXT
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 2
- **Luận điểm:** Đa ngôn ngữ đòi hỏi phân tách giữa kiến trúc quốc tế hóa (i18n) và nội dung bản địa hóa (l10n), tổ chức file JSON theo namespaces và áp dụng cơ chế dịch động.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 2:**  
> *"Bước sang Module 3, chúng ta tiếp cận bài toán đưa ứng dụng ra môi trường toàn cầu:  
> - **Internationalization (i18n):** Là việc thiết kế kiến trúc mã nguồn để hệ thống có khả năng hỗ trợ nhiều ngôn ngữ và định dạng khu vực mà không cần thay đổi logic ứng dụng.  
> - **Localization (l10n):** Là quá trình dịch thuật nội dung và điều chỉnh văn hóa hiển thị cho từng địa phương cụ thể.  
>   
> **Nguyên tắc kỹ thuật:** Không bao giờ hardcode văn bản trực tiếp trong thẻ JSX. Toàn bộ chuỗi hiển thị được đưa vào các file JSON độc lập lưu tại thư mục `src/i18n/locales/` (`en.json`, `vi.json`, `ar.json`).  
>   
> Thông qua thư viện **`react-i18next`**, chúng em áp dụng 3 kỹ thuật cốt lõi:  
> 1. **Interpolation (Nội suy biến):** Chèn biến động vào câu dịch bằng cú pháp `{{name}}`.  
> 2. **Pluralization (Xử lý số ít / số nhiều):** Tự động lựa chọn hậu tố `_one` hoặc `_other` dựa trên giá trị biến `count` truyền vào.  
> 3. **Chuyển đổi thời gian thực:** Hàm `i18n.changeLanguage(lng)` cập nhật ngôn ngữ toàn bộ giao diện ngay lập tức mà không cần reload trang, đồng thời lưu trạng thái vào `localStorage`."*

---

### 📍 SLIDE 16: ĐỊNH DẠNG BẢN ĐỊA HÓA VỚI NATIVE WEB INTL API
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 2
- **Luận điểm:** Định dạng tiền tệ và ngày tháng cần tuân thủ quy chuẩn pháp lý của từng quốc gia; sử dụng Native Web Intl API mang lại hiệu năng cao với 0 KB bundle size.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 2:**  
> *"Bên cạnh dịch văn bản, việc định dạng số tiền và ngày tháng là bài toán phức tạp trong các hệ thống thanh toán quốc tế:  
> Nhiều lập trình viên tự viết hàm chia chuỗi bằng Regular Expression để thêm dấu phẩy. Cách làm này rất dễ gây sai sót nghiêm trọng:  
> - Tại Mỹ (`en-US`): Dấu phẩy là ngăn cách hàng nghìn, dấu chấm là thập phân: `$1,500.00`.  
> - Nhưng tại Việt Nam (`vi-VN`) hay Đức (`de-DE`): Dấu chấm mới là ngăn cách hàng nghìn: `1.500.000 ₫` hoặc `1.500,00 €`.  
> Định dạng sai chuẩn có thể dẫn đến tranh chấp pháp lý và hiểu lầm về mặt tài chính.  
>   
> Thay vì cài thêm các thư viện bên ngoài làm tăng kích thước bundle, giải pháp tối ưu là sử dụng **Native Web Intl API** có sẵn trong trình duyệt hiện đại với **0 KB dung lượng phụ trội**:  
> - `Intl.NumberFormat(locale, { style: 'currency', currency })`: Tự động format tiền tệ theo chuẩn của từng quốc gia.  
> - `Intl.DateTimeFormat(locale, { dateStyle: 'full' })`: Hiển thị ngày tháng theo đúng cấu trúc ngữ pháp bản địa.  
> Nhóm đã đóng gói các xử lý này trong module `src/utils/formatters.ts`."*

---

### 📍 SLIDE 17: GIAO DIỆN ĐẢO CHIỀU (RIGHT-TO-LEFT - RTL)
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 2
- **Luận điểm:** Phục vụ ngôn ngữ đọc từ phải sang trái (như tiếng Ả Rập) đòi hỏi phải chuyển dịch tư duy từ CSS Physical Properties sang CSS Logical Properties.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 2:**  
> *"Một thách thức lớn khi mở rộng sản phẩm sang thị trường Trung Đông là hỗ trợ ngôn ngữ viết từ phải sang trái (RTL) như tiếng Ả Rập hay tiếng Do Thái. Khi chuyển sang ngôn ngữ này, toàn bộ bố cục trang web bắt buộc phải đảo ngược 180 độ.  
> Về thao tác DOM, ta chỉ cần gán thuộc tính: `document.documentElement.dir = 'rtl'`.  
>   
> **Tuy nhiên, nếu stylesheet sử dụng các thuộc tính vật lý (CSS Physical Properties), giao diện sẽ bị vỡ:**  
> Các thuộc tính như `margin-left` hay `padding-right` cố định vị trí vật lý. Khi tài liệu đổi sang RTL, các khoảng cách này không tự đảo chiều, khiến giao diện dính sát vào mép trái.  
>   
> **Giải pháp là chuyển đổi toàn bộ sang CSS Logical Properties:**  
> - `margin-left` $\rightarrow$ chuyển thành `margin-inline-start`.  
> - `padding-right` $\rightarrow$ chuyển thành `padding-inline-end`.  
> - `left: 0` $\rightarrow$ chuyển thành `inset-inline-start: 0`.  
> Khi ở chế độ LTR, 'start' tương ứng với bên trái; nhưng khi `dir="rtl"`, trình duyệt sẽ tự động đảo 'start' thành bên phải.  
> Nhờ đó, chúng ta **chỉ cần duy nhất một file CSS**, không cần viết thêm stylesheet phụ mà giao diện vẫn tự động lật 180° chính xác."*

---

### 📍 SLIDE 18: [DEMO 5] ĐỔI NGÔN NGỮ, INTL & GIAO DIỆN RTL
- **Thời lượng:** ~2 phút
- **Người trình bày:** Speaker 2
- **Mục tiêu:** Thực nghiệm chuyển đổi ngôn ngữ, kiểm tra định dạng tiền tệ và quan sát sự tự thích ứng của layout khi sang tiếng Ả Rập.

#### 🎙️ LỜI THOẠI & THAO TÁC DEMO:
> **Speaker 2:**  
> *(Chuyển sang màn hình ứng dụng)*  
> *"Em xin minh họa tính năng bản địa hóa trên portal:  
>   
> [Thao tác 1 - Chuyển sang English]:  
> Hiện tại giao diện đang ở tiếng Việt. Em nhấn nút chọn **'English'** trên thanh ngôn ngữ:  
> Toàn bộ tiêu đề, nhãn form và thông báo lỗi Zod đổi sang tiếng Anh. Giá tiền phòng lập tức được định dạng lại theo chuẩn USD (`$1,250.00`) thông qua `Intl.NumberFormat`.  
>   
> [Thao tác 2 - Chuyển sang Tiếng Ả Rập RTL]:  
> Tiếp tục, em nhấn chọn **'العربية (Arabic)'**:  
> Toàn bộ layout ứng dụng thực hiện đảo chiều 180 độ: Widget phòng chuyển sang bên trái, Form đặt phòng chuyển sang bên phải; căn lề văn bản, con trỏ và icon đều tự động đảo hướng theo chuẩn Right-to-Left nhờ CSS Logical Properties mà cấu trúc trang web không hề bị biến dạng.  
>   
> Sau đây, em xin mời Speaker 1 cùng trở lại bục báo cáo để bước vào phần Tổng kết chuyên đề."*

---

# PHẦN V: TỔNG KẾT, MINI-GAME & PHẢN BIỆN (SLIDE 19 – 22)
*Người trình bày: Cả 2 thành viên phối hợp*

---

### 📍 SLIDE 19: BA QUY TẮC VÀNG CẦN GHI NHỚ (KEY TAKEAWAYS)
- **Thời lượng:** ~1.5 phút
- **Người trình bày:** Speaker 1 tóm lược Quy tắc 1 $\rightarrow$ Speaker 2 tóm lược Quy tắc 2 & 3.
- **Mục tiêu:** Đúc kết lại 3 bài học kỹ thuật cốt lõi của bài báo cáo một cách ngắn gọn, súc tích.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Kính thưa Thầy/Cô và các bạn, đúc kết lại toàn bộ nội dung chuyên đề hôm nay, nhóm xin tóm lược 3 quy tắc kỹ thuật cốt lõi:  
> 1. **Về Form Handling:** Hạn chế dùng `useState` cho các biểu mẫu quy mô vừa và lớn. Chuẩn công nghiệp hiện đại là sử dụng **React Hook Form (Uncontrolled ref để đạt Zero Re-render)** kết hợp **Zod Schema** để phân tách nghiệp vụ validation. Luôn thu hồi RAM ảnh bằng `URL.revokeObjectURL`."*  
>   
> **Speaker 2:**  
> *"2. **Về Error Handling:** Không phụ thuộc hoàn toàn vào một Error Boundary duy nhất. Cần xây dựng lá chắn đa tầng: Sử dụng `try...catch` và **Async State Machine** cho các sự kiện API, đồng thời triển khai **Class Error Boundary dạng khoanh vùng nhỏ (Granular)** để loại trừ nguy cơ màn hình trắng.  
> 3. **Về Internationalization:** Không hardcode chuỗi hiển thị và regex định dạng tiền tệ. Tận dụng **react-i18next** kết hợp **Native Web Intl API** có sẵn trong trình duyệt (0 KB bundle size). Luôn thiết kế giao diện bằng **CSS Logical Properties** để sẵn sàng hỗ trợ các ngôn ngữ RTL."*

---

### 📍 SLIDE 20: THỬ THÁCH KIẾN THỨC: MINI-GAME QUIZZ & VINH DANH
- **Thời lượng:** ~2 phút
- **Người trình bày:** Cả 2 Speaker
- **Mục tiêu:** Chuyển tiếp sang hoạt động tương tác, khích lệ sự tham gia của các bạn sinh viên trong lớp qua cơ cấu giải thưởng.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Để củng cố lại các nội dung lý thuyết và các bẫy kỹ thuật vừa được phân tích, nhóm chúng em đã chuẩn bị một phần Mini-Game trắc nghiệm tương tác ngắn để cùng Thầy/Cô và các bạn ôn tập lại các kiến thức này."*  
>   
> **Speaker 2:**  
> *"Nhằm khích lệ tinh thần tham gia của các bạn, nhóm có chuẩn bị những phần quà lưu niệm để gửi tặng trực tiếp cho **Top 3 bạn có điểm số cao nhất và thời gian hoàn thành nhanh nhất**:  
> - 🥇 **Giải Nhất:** Phần quà đặc biệt dành cho Top 1.  
> - 🥈 **Giải Nhì:** Phần quà lưu niệm dành cho Top 2.  
> - 🥉 **Giải Ba:** Phần quà lưu niệm dành cho Top 3.  
> Kính mời Thầy/Cô và các bạn chuẩn bị thiết bị để tham gia thử thách!"*

---

### 📍 SLIDE 21: PHIÊN HỎI ĐÁP & PHẢN BIỆN (Q&A SESSION)
- **Thời lượng:** ~5 – 7 phút
- **Người trình bày:** Cả 2 Speaker
- **Mục tiêu:** Mời gọi câu hỏi từ Hội đồng và lớp học, phân định rõ phạm vi phản biện của từng thành viên.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1:**  
> *"Và sau đây, nhóm chúng em xin bước vào **Phiên Hỏi Đáp & Phản Biện (Q&A Session)**.  
> Nhóm đã mở sẵn mã nguồn của dự án trên IDE cũng như các công cụ DevTools trên trình duyệt, rất mong nhận được những câu hỏi, đóng góp và nhận xét từ Thầy/Cô trong Hội đồng cũng như các bạn sinh viên.  
> Về phân công phản biện:  
> - Em [Speaker 1] sẽ chịu trách nhiệm chính về mảng Biểu mẫu, React Hook Form, Zod Schema, File Upload và quản lý bộ nhớ.  
> - Bạn [Speaker 2] sẽ chịu trách nhiệm chính về mảng Xử lý lỗi, Error Boundary, đa ngôn ngữ i18next và giao diện RTL.  
> Nhóm chúng em xin kính mời Thầy/Cô và các bạn đặt câu hỏi ạ!"*

---

### 📍 SLIDE 22: LỜI KẾT & CẢM ƠN (THANK YOU SLIDE)
- **Thời lượng:** ~30 giây
- **Người trình bày:** Cả 2 Speaker
- **Mục tiêu:** Kết thúc bài báo cáo một cách lịch sự, chuyên nghiệp và chia sẻ tài liệu tham khảo.

#### 🎙️ LỜI THOẠI BÁO CÁO:
> **Speaker 1 & Speaker 2:**  
> *"Bài báo cáo chuyên đề của nhóm chúng em đến đây xin được khép lại.  
> Toàn bộ slide trình chiếu HTML và mã nguồn của dự án Global Checkout & Profile Portal đã được nhóm đăng tải công khai trên GitHub tại địa chỉ hiển thị trên màn hình.  
> Nhóm chúng em xin chân thành cảm ơn Thầy/Cô đã dành thời gian theo dõi và hướng dẫn, cảm ơn các bạn sinh viên đã chú ý lắng nghe.  
> Kính chúc Thầy/Cô nhiều sức khỏe, chúc các bạn học tập tốt và hoàn thành xuất sắc đồ án của mình!  
> Chúng em xin chân thành cảm ơn!"*

---

## PHẦN VI: SỔ TAY PHẢN BIỆN – 6 CÂU HỎI TRỌNG TÂM CỦA GIẢNG VIÊN & ĐÁP ÁN CHUẨN MỰC

Dưới đây là 6 câu hỏi học thuật mà Giảng viên thường đặt ra cho sinh viên trong các buổi bảo vệ đồ án React, cùng câu trả lời theo đúng phong cách phân tích luận điểm - luận cứ:

### ❓ Câu 1 (Dành cho Speaker 1):
*"Em nói React Hook Form đạt Zero Re-render nhờ Uncontrolled Component. Vậy tại sao khi em sử dụng hàm `watch()` trong code, component vẫn bị render lại?"*
> **Đáp án chuẩn mực của Speaker 1:**  
> *"Thưa Thầy/Cô, bản chất RHF sử dụng Uncontrolled Inputs bằng cách gắn `ref`, do đó việc gõ phím thông thường hoàn toàn không gây re-render.  
> Tuy nhiên, hàm `watch()` hoạt động theo mô hình **Subscriber Pattern cục bộ**. Khi ta khai báo `watch(['nights'])`, ta đang chủ động yêu cầu RHF đăng ký lắng nghe sự thay đổi của trường `nights` để tính toán lại tổng tiền. Do đó, việc component render lại trong trường hợp này là hành vi có chủ đích theo thiết kế của lập trình viên, chứ không phải re-render thừa.  
> Trong các bài toán tối ưu cao hơn, chúng em có thể sử dụng hook `useWatch()` bọc riêng trong một component con để cô lập phạm vi render, giúp component cha hoàn toàn không bị ảnh hưởng ạ."*

---

### ❓ Câu 2 (Dành cho Speaker 1):
*"Tại sao nhóm lại chọn Zod Schema thay vì dùng thư viện Yup hoặc tự viết hàm kiểm tra dữ liệu bằng regex?"*
> **Đáp án chuẩn mực của Speaker 1:**  
> *"Thưa Thầy/Cô, Zod có 3 ưu thế vượt trội:  
> 1. **Static Type Inference:** Zod cho phép tự động suy diễn kiểu dữ liệu TypeScript thông qua cú pháp `z.infer<typeof schema>`. Điều này loại bỏ hoàn toàn rủi ro sai lệch giữa Type định nghĩa và Schema kiểm tra dữ liệu.  
> 2. **Data Coercion:** Zod tích hợp sẵn cơ chế ép kiểu an toàn như `z.coerce.number()`, giải quyết triệt để vấn đề thẻ `<input>` của HTML luôn trả về chuỗi string.  
> 3. **Phân tách nghiệp vụ:** Tách biệt 100% logic xác thực ra khỏi tầng giao diện JSX, giúp mã nguồn dễ đọc và thuận tiện cho việc viết Unit Test độc lập ạ."*

---

### ❓ Câu 3 (Dành cho Speaker 1):
*"Nếu component bị unmount mà lập trình viên quên gọi `URL.revokeObjectURL` thì trình duyệt có tự giải phóng bộ nhớ RAM khi người dùng chuyển sang trang khác trong ứng dụng SPA không?"*
> **Đáp án chuẩn mực của Speaker 1:**  
> *"Thưa Thầy/Cô là **KHÔNG** ạ. Trong kiến trúc Single Page Application, việc chuyển trang qua React Router không làm tải lại tiến trình trình duyệt. Các blob URL được neo giữ ở cấp tiến trình (process) của tab. Trình duyệt không thể tự giải phóng nếu lập trình viên không chủ động gọi lệnh thu hồi, cho đến khi người dùng tắt hẳn tab hoặc bấm reload lại toàn bộ trang web. Vì vậy, việc đặt `URL.revokeObjectURL` trong cleanup của `useEffect` là quy tắc bắt buộc để ngăn ngừa rò rỉ bộ nhớ ạ."*

---

### ❓ Câu 4 (Dành cho Speaker 2):
*"Tại sao React 18 / 19 đã chuyển đổi gần như hoàn toàn sang Functional Component & Hooks mà Error Boundary vẫn bắt buộc phải viết bằng Class Component?"*
> **Đáp án chuẩn mực của Speaker 2:**  
> *"Thưa Thầy/Cô, Error Boundary can thiệp trực tiếp vào giai đoạn Reconciliation và thuật toán bắt lỗi bên trong React Fiber.  
> Phương thức `static getDerivedStateFromError` đòi hỏi cập nhật state một cách đồng bộ tức thời ngay trong chu kỳ render để hoán đổi cây Virtual DOM sang Fallback UI. Hiện tại, cơ chế Functional Hooks hoạt động theo thứ tự tuần tự trong quá trình render, nên đội ngũ phát triển React chưa tìm được giải pháp an toàn để gói gọn hành vi ngắt nhịp render này vào một Hook mà không phá vỡ quy tắc của Hooks ạ."*

---

### ❓ Câu 5 (Dành cho Speaker 2):
*"Error Boundary không bắt được lỗi trong Event Handlers (như `onClick`) và Promise bất đồng bộ. Vậy giải pháp chuẩn trong môi trường doanh nghiệp là gì?"*
> **Đáp án chuẩn mực của Speaker 2:**  
> *"Thưa Thầy/Cô, vì Event Handlers và Promise chạy ngoài Render Phase của React, nên khi phát sinh lỗi, bản thân giao diện React không bị unmount sập màn hình trắng.  
> Do đó, giải pháp chuẩn trong thực tế là:  
> - Bắt buộc sử dụng khối `try...catch` bên trong các hàm xử lý sự kiện và async fetch.  
> - Trong khối `catch`, cập nhật thông tin lỗi vào Async State Machine (ví dụ `status: 'error'`) để hiển thị thông báo lỗi cục bộ nhẹ nhàng cho người dùng.  
> - Nếu muốn đẩy lỗi bất đồng bộ vào Error Boundary để hiển thị Fallback UI toàn trang, ta có thể dùng kỹ thuật lưu lỗi vào một state render để kích hoạt Error Boundary ở lần render tiếp theo ạ."*

---

### ❓ Câu 6 (Dành cho Speaker 2):
*"Tại sao không viết hai file CSS riêng biệt cho tiếng Anh (LTR) và tiếng Ả Rập (RTL) mà lại phải sử dụng CSS Logical Properties?"*
> **Đáp án chuẩn mực của Speaker 2:**  
> *"Thưa Thầy/Cô, việc duy trì hai file CSS riêng làm tăng gấp đôi chi phí bảo trì và dung lượng tải qua mạng. Nếu sau này ta điều chỉnh màu sắc hoặc kích thước ở file LTR, ta rất dễ quên cập nhật file RTL dẫn đến giao diện không đồng nhất.  
> Trong khi đó, **CSS Logical Properties** là chuẩn chính thức của W3C được mọi trình duyệt hiện đại hỗ trợ 100%. Ta chỉ cần duy nhất một file CSS, trình duyệt sẽ tự động suy diễn hướng dựa vào thuộc tính `dir="rtl"` trên thẻ HTML gốc, giúp mã nguồn gọn gàng và loại trừ hoàn toàn nguy cơ lệch giao diện ạ."*

