// 권한
export const LOGIN_ERROR = "이메일 또는 비밀번호가 일치하지 않습니다.";
export const DUPLICATE_EMAIL = "이미 이메일이 존재합니다.";

// 필수 입력
// 유저 정보
export const USER_EMAIL_REQUIRED = "이메일을 입력해주세요.";
export const USER_NAME_REQUIRED = "이름을 입력해주세요.";
export const USER_PASSWORD_REQUIRED = "비밀번호를 입력해주세요.";
export const USER_PHONE_NUMBER_REQUIRED = "전화번호를 입력해주세요.";
export const USER_ADDRESS_ZIP_CODE_REQUIRED = "우편번호를 입력해주세요.";
export const USER_ADDRESS_DETAIL_REQUIRED = "주소를 입력해주세요.";
export const USER_ADDRESS_DETAIL2_REQUIRED = "상세주소를 입력해주세요.";

// 카테고리
export const CATEGORY_NAME_REQUIRED = "카테고리 이름을 입력해주세요";

// 도서 정보
export const CATEGORY_NOT_FOUND = "카테고리 정보를 찾을 수 없습니다.";
export const BOOK_NOT_FOUND = "도서 정보를 찾을 수 없습니다.";
export const BOOK_CATEGORY_REQUIRED = "카테고리를 선택해주세요.";
export const BOOK_ID_REQUIRED = "도서 정보를 입력해주세요.";
export const BOOK_PUBLISHER_REQUIRED = "출판사를 입력해주세요.";
export const BOOK_TITLE_REQUIRED = "도서제목를 입력해주세요.";
export const BOOK_AUTHOR_REQUIRED = "도서저자를 입력해주세요.";
export const BOOK_CONTENT_REQUIRED = "도서내용를 입력해주세요.";
export const BOOK_PAGES_REQUIRED = "전체 페이지 수를 입력해주세요.";
export const BOOK_PAGES_FORMAT = "전체 페이지 수는 숫자로 입력해주세요.";
export const BOOK_PUBLICATION_DATE_REQUIRED = "발행일자를 입력해주세요.";
export const BOOK_RELEASE_DATE_REQUIRED = "출시일자를 입력해주세요.";
export const BOOK_IMAGE_REQUIRED = "도서 사진을 선택해주세요.";
export const BOOK_PRICE_REQUIRED = "도서 가격을 입력해주세요.";
export const BOOK_PRICE_FORMAT = "도서 가격은 숫자로 입력해주세요.";
export const BOOK_INVENTORY_COUNT_REQUIRED = "도서 재고 수량을 입력해주세요.";
export const BOOK_INVENTORY_COUNT_FORMAT = "도서 재고 수량은 숫자로 입력해주세요.";
export const BOOK_SELLER_REQUIRED = "판매자 정보를 입력해주세요.";

// 주문 정보
export const ORDER_NOT_FOUND = "주문정보를 찾을 수 없습니다.";
export const ORDER_COUNT_REQUIRED = "수량을 입력해주세요.";
export const ORDER_DELIVERY_PRICE_REQUIRED = "배송비를 입력해주세요.";
export const ORDER_DELIVERY_PRICE_FORMAT = "배송비는 숫자로 입력해주세요.";
export const ORDER_TOTAL_PRICE_REQUIRED = "상품 총 가격을 입력해주세요.";
export const ORDER_DELIVERY_STATE_REQUIRED = "배송상태을 입력해주세요.";
export const ORDER_DELIVERY_STATE_INVALID = "유효하지 않은 배송상태 입니다.";
export const ORDER_DELIVERY_STATE_ERROR = "배송상태 수정에 실패했습니다.";
export const ORDER_TOTAL_PRICE_FORMAT = "상품 총 가격을 입력해주세요.";
export const ORDER_ERROR = "주문에 실패했습니다.";

// 배송 정보
export const DELIVERY_IN_PROGRESS_CANCELLATION_ERROR = "배송 시작된 상품은 취소 하실 수 없습니다.";

// 유저 정보
export const USER_NOT_FOUND = "유저 정보를 찾을 수 없습니다.";
export const USER_PASSWORD_MISMATCH = "비밀번호가 일치하지 않습니다.";
export const USER_EMAIL_FORMAT = "이메일 형식이 올바르지 않습니다.";
export const USER_PASSWORD_FORMAT = "비밀번호 형식이 올바르지 않습니다.";
export const USER_NAME_FORMAT = "이름은 10자 이하이어야 합니다.";
export const USER_PHONE_NUMBER_FORMAT =
  "전화번호 형식이 올바르지 않습니다. (예: 010-1234-1234)";
export const USER_ADDRESS_ZIP_CODE_FORMAT = "우편번호는 5자 이하이어야 합니다.";
export const USER_ADDRESS_DETAIL_FORMAT =
  "상세 주소는 100자 이하이어야 합니다.";

// 기타
export const UNAUTHORIZED_ERROR = "권한이 없습니다.";
export const SCHEMA_NOT_FOUND_ERROR = "스키마가 존재하지 않습니다.";
export const DATA_VALIDATION_ERROR =
  "요청받은 데이터의 유효성 검사에 실패했습니다.";
