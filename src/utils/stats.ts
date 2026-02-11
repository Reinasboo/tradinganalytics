export function mean(nums: number[]) {
  if (!nums.length) return 0
  return nums.reduce((s, n) => s + n, 0) / nums.length
}

export function std(nums: number[]) {
  if (!nums.length) return 0
  const m = mean(nums)
  const variance = nums.reduce((s, n) => s + Math.pow(n - m, 2), 0) / nums.length
  return Math.sqrt(variance)
}
