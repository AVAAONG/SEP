
import { Column } from "react-table";

/**
 * Converts an array to a string.
 *
 * @param  value - The array to convert. The elements of the array are joined into a string with ', ' as the separator for all elements except the last two, which are joined with ' y '.
 *
 * @returns  - The array converted to a string. If the array has more than one element, the returned string is in the format 'element1, element2, ... y lastElement'. If the array has only one element, the returned string is the single element.
 */
const handleArrayValue = (value: any[]) => {
    const last = value.slice(-1)[0];
    const initial = value.slice(0, -1);
    return initial.length ? `${initial.join(', ')} y ${last}` : last;
};

/**
 * Processes a value based on whether it should be treated as a date.
 *
 * @param  value - The value to process. If it can be converted to a number, it's returned as is.
 * If it can't be converted to a number, it's treated as a date string or a time string, depending on `isDate`.
 *
 * @param isDate - A boolean indicating whether `value` should be treated as a date.
 * If `isDate` is `true` and `value` can be converted to a date, `value` is converted to a date string.
 * If `isDate` is `false` and `value` can be converted to a date, `value` is converted to a time string.
 *
 * @returns  The processed value. It's a number if `value` can be converted to a number,
 * a date string if `value` can be converted to a date and `isDate` is `true`,
 * a time string if `value` can be converted to a date and `isDate` is `false`,
 * and `value` as is if `value` can't be converted to a date.
 */
const handleValue = (value: any, isDate: boolean) => {
    if (!isNaN(+value)) {
        return value;
    }
    const dateValue = new Date(value);
    return isNaN(dateValue.getTime())
        ? value
        : isDate
            ? dateValue.toLocaleDateString()
            : dateValue.toLocaleTimeString('es-VE', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                hourCycle: 'h12',
            });
};


/**
 * Processes a row of data based on the provided columns.
 *
 * @template T - The type of the row, which should be an object with string keys.
 *
 * @param - The row of data to process.
 * @param  - The columns to use for processing the row.
 *
 * Each column should have an `accessor` property that corresponds to a key in `row`,
 * and an `isDate` property that indicates whether the value should be treated as a date.
 *
 * If a value in `row` is an array, it's converted to a string with `handleArrayValue`.
 * If a value in `row` is not a number and `column.isDate` is `true`, it's converted to a date string.
 * If a value in `row` is not a number and `column.isDate` is `false`, it's converted to a time string.
 *
 * @returns - An object with the processed row data.
 * The keys are the column headers and the values are the processed values from `row`.
 */
export const processRow = <T extends Record<string, unknown>>(row: T, columns: Column<T>[]) => {
    return columns.reduce((rowData: any, column: any) => {
        const value = (row as Record<string, unknown>)[column.accessor];
        rowData[column.Header] = Array.isArray(value)
            ? handleArrayValue(value)
            : handleValue(value, column.isDate);
        return rowData;
    }, {});
};


export default processRow;