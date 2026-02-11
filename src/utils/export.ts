import { saveAs } from 'file-saver'

export function exportCSV(rows: Record<string, any>[], filename = 'export.csv') {
  if (!rows || !rows.length) return
  const keys = Object.keys(rows[0])
  const header = keys.join(',')
  const lines = rows.map((r) => keys.map((k) => {
    const v = r[k]
    if (v === null || v === undefined) return ''
    // escape quotes
    const s = String(v).replace(/"/g, '""')
    return `"${s}"`
  }).join(','))
  const csv = [header, ...lines].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, filename)
}

export default exportCSV
