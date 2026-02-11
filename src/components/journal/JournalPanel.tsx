"use client"
import React, { useEffect, useState } from 'react'
import useTradingStore from '../../store/tradingStore'

export default function JournalPanel() {
  const selected = useTradingStore((s) => s.selectedTrade)
  const setSelected = useTradingStore((s) => s.setSelectedTrade)
  const setNoteForTrade = useTradingStore((s) => s.setNoteForTrade)
  const addTagToTrade = useTradingStore((s) => s.addTagToTrade)
  const removeTagFromTrade = useTradingStore((s) => s.removeTagFromTrade)
  const addScreenshotForTrade = useTradingStore((s) => s.addScreenshotForTrade)
  const notesMap = useTradingStore((s) => s.tradeNotes)
  const tagsMap = useTradingStore((s) => s.tradeTags)
  const screenshotsMap = useTradingStore((s) => s.tradeScreenshots)

  const [notes, setNotes] = useState('')
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (selected) setNotes(notesMap[selected.id] || '')
  }, [selected, notesMap])

  if (!selected) return null

  function saveNotes() {
    if (!selected) return
    setNoteForTrade(selected.id, notes)
  }

  function addTag() {
    if (!selected) return
    const tag = newTag.trim()
    if (!tag) return
    addTagToTrade(selected.id, tag)
    setNewTag('')
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!selected) return
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result)
      addScreenshotForTrade(selected.id, dataUrl)
    }
    reader.readAsDataURL(f)
  }

  const tags = tagsMap[selected.id] || []
  const screenshots = screenshotsMap[selected.id] || []

  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900/95 backdrop-blur-lg shadow-xl p-4 z-50 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Trade Details</h3>
        <button onClick={() => setSelected(null)} className="btn btn-ghost">Close</button>
      </div>
      <div className="space-y-3 text-sm">
        <div><strong>Symbol:</strong> {selected.symbol}</div>
        <div><strong>PnL:</strong> <span className={selected.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>${selected.pnl}</span></div>
        <div><strong>Size:</strong> {selected.size}</div>
        <div><strong>Side:</strong> {selected.side}</div>
        <div><strong>Date:</strong> {new Date(selected.date).toLocaleString()}</div>

        <div>
          <strong>Tags:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((t) => (
              <span key={t} className="px-2 py-1 bg-zinc-800 rounded text-xs flex items-center">
                {t}
                <button className="ml-2 text-red-400" onClick={() => removeTagFromTrade(selected.id, t)}>x</button>
              </span>
            ))}
            <div className="flex items-center gap-2">
              <input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add tag" className="input input-sm" />
              <button onClick={addTag} className="btn btn-sm">Add</button>
            </div>
          </div>
        </div>

        <div>
          <strong>Notes</strong>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={saveNotes} className="w-full h-28 mt-2 p-2 bg-zinc-800 rounded" placeholder="Add notes about this trade" />
        </div>

        <div>
          <strong>Screenshots</strong>
          <div className="mt-2">
            <input type="file" accept="image/*" onChange={onFile} />
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {screenshots.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={s} alt={`screenshot-${i}`} className="w-24 h-16 object-cover rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
