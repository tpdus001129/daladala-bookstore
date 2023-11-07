import { SchemaNotFoundError, ValidationError } from "../../utils/errors.js";
import {
  SCHEMA_NOT_FOUND_ERROR,
  DATA_VALIDATION_ERROR,
} from "../../config/errorMessagesConstants.js";

const supportedMethods = ["post", "put", "patch", "delete"];

const validationOptions = {
  // 유효성 검사 중 에러가 발생했을 때 즉시 중단할지 판단
  // true: 첫번째 에러를 반환
  // false: 모든 에러를 반환
  abortEarly: false,
  // 스키마에 정의되지 않은 속성이 데이터에 포함되면 에러를 발생할지 판단
  // false: 정의되지 않은키가 요청 데이터에 포함되면 에러를 발생
  // true: 정의되지 않은 키를 무시하고 검증을 함
  allowUnknown: false,
};

const inputValidator = (schema) => (req, res, next) => {
  try {
    if (!schema) {
      throw new SchemaNotFoundError(SCHEMA_NOT_FOUND_ERROR);
    }
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.body.validate(req.body, validationOptions);

    if (error) {
      const opt = {
        original: error._original,
        details: error.details.map(({ message, context }) => ({
          key: context.key,
          message: message.replace(/['"]/g, ""),
          value: context.value,
        })),
      };

      throw new ValidationError(DATA_VALIDATION_ERROR, opt.details);
    }

    req.body = value;
    next();
  } catch (error) {
    next(error);
  }
};

export { inputValidator };
