import { ValidationSchema } from "../types/index";

function validate(data: any, schema: ValidationSchema) {
  for (const key in schema) {
    const rule = schema[key];
    const value = data[key];

    if (value === undefined || value === null || value === "") {
      if (rule.required) {
        if (rule.default !== undefined) {
          data[key] = rule.default;
        } else {
          throw new Error(`${key} is required`);
        }
      } else if (rule.default !== undefined) {
        data[key] = rule.default;
      }
    }

    const finalValue = data[key];

    if (rule.type === "string") {
      if (typeof finalValue !== "string") {
        throw new Error(`${key} must be a string`);
      }
      if (rule.min !== undefined && finalValue.length < rule.min) {
        throw new Error(`${key} must be at least ${rule.min} characters`);
      }
      if (rule.max !== undefined && finalValue.length > rule.max) {
        throw new Error(`${key} must be at most ${rule.max} characters`);
      }
    }

    if (rule.type === "number") {
      if (typeof finalValue !== "number") {
        throw new Error(`${key} must be a number`);
      }
      if (rule.min !== undefined && finalValue < rule.min) {
        throw new Error(`${key} must be at least ${rule.min}`);
      }
      if (rule.max !== undefined && finalValue > rule.max) {
        throw new Error(`${key} must be at most ${rule.max}`);
      }
    }
  }
}

export default validate;
