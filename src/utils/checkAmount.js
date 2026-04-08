/**
 *
 * @param {Number} number Value to check
 * @param {Number} min Minimum allowed value
 * @param {Number} max Maximum allowed value
 * @returns {min|max|number} min if number is lower than allowed minimum value, max if number is greater than allowed maximum or number in other cases
 */
function checkAmount (number, min, max) {
  if (number < min) {
    return min
  } else if (number > max) {
    return max
  } else {
    return number
  }
}
export default checkAmount
