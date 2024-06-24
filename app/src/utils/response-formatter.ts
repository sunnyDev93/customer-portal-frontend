import { BaseDataResponse, BaseResponse } from 'types/request';

/**
 * It formats a Json API response for Vuex ORM with relationships
 *
 * @returns {Array|Object} The formatted response
 */
export function formattedResponse<T>(data: BaseResponse<T>) {
  if (Array.isArray(data.data)) {
    return data.data.map(object => formatObject(object));
  }

  return formatObject(data.data as unknown as BaseDataResponse<T>);
}

/**
 * Format Object from Json API syntax to Vuex ORM
 *
 * @param {Object} object Object to format
 * @returns {Object} Formatted object
 */
export function formatObject<T>(object: BaseDataResponse<T>): T {
  return {
    id: tryParsingToInteger(object.id?.toString()),
    ...object.attributes,
  };
}

/**
 * Tries parsing value to Integer; returns untouched value if it fails
 *
 * @returns {String|Number} The parsed value
 */
export function tryParsingToInteger(originalValue: string) {
  const integer = parseInt(originalValue);

  if (integer.toString() === originalValue) {
    return integer;
  }

  return originalValue;
}
