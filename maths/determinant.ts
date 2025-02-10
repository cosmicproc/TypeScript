/**
 * @function det
 * @description
 * Computes the determinant of the given matrix using elimination.
 * - Rounding errors may occur for some matrices.
 * - Only handles 6 decimal places. Rounds thereafter.
 * @Complexity_Analysis
 * Time complexity: O(n^3)
 * Space Complexity: O(n^2)
 * @param {number[][]} m - A square matrix (2D array)
 * @return {number} - The determinant
 * @example det([[1,1],[1,1]]) = 0
 */

export function det(m: number[][]): number {
  if (m.some((r) => r.length != m.length)) {
    throw new Error('only square matrices can have determinants')
  }

  const decPlaces = 6

  // track the number of applied interchange operations
  let appliedICs = 0
  for (let i = 0; i < m[0].length; i++) {
    // partial pivotting
    let idealPivot = -1
    let maxValue = 0
    for (let j = i; j < m.length; j++) {
      if (Math.abs(m[j][i]) > maxValue) {
        maxValue = Math.abs(m[j][i])
        idealPivot = j
      }
    }
    if (idealPivot === -1) {
      return 0
    }
    if (idealPivot != i) {
      appliedICs++
      ;[m[i], m[idealPivot]] = [m[idealPivot], m[i]]
    }
    // eliminate entries under the pivot
    for (let j = i + 1; j < m.length; j++) {
      if (Math.abs(m[j][i]) > 1 / 10 ** decPlaces) {
        m[j] = m[j].map((e, k) => e + (-m[j][i] / m[i][i]) * m[i][k])
      }
    }
  }
  let diagProduct = 1
  for (let i = 0; i < m.length; i++) {
    diagProduct *= m[i][i]
  }
  let result = diagProduct * (-1) ** appliedICs
  return parseFloat(result.toFixed(decPlaces))
}
