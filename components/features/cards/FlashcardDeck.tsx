'use client'

import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import { RotateCcw, Layers, CheckCircle2 } from 'lucide-react'
import { ChapterMeta, KnowledgeCard } from '@/lib/types'

interface CardGroup {
  chapter: ChapterMeta
  cards: KnowledgeCard[]
}

interface Props {
  examShortName: string
  groups: CardGroup[]
}

export default function FlashcardDeck({ examShortName, groups }: Props) {
  const [activeChapterId, setActiveChapterId] = useState(groups[0]?.chapter.id ?? '')
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [remembered, setRemembered] = useState<Record<string, boolean>>({})

  const activeGroup = useMemo(
    () => groups.find(group => group.chapter.id === activeChapterId) ?? groups[0],
    [activeChapterId, groups]
  )
  const cards = activeGroup?.cards ?? []
  const activeCard = cards[activeCardIndex] ?? cards[0]
  const totalCards = groups.reduce((sum, group) => sum + group.cards.length, 0)
  const rememberedCount = Object.values(remembered).filter(Boolean).length
  const chapterRememberedCount = cards.filter(card => remembered[card.id]).length

  function selectChapter(chapterId: string) {
    setActiveChapterId(chapterId)
    setActiveCardIndex(0)
    setFlipped(false)
  }

  function moveCard(direction: 1 | -1) {
    if (!cards.length) return
    setActiveCardIndex(index => {
      const next = index + direction
      if (next < 0) return cards.length - 1
      if (next >= cards.length) return 0
      return next
    })
    setFlipped(false)
  }

  function toggleRemembered() {
    if (!activeCard) return
    setRemembered(prev => ({ ...prev, [activeCard.id]: !prev[activeCard.id] }))
  }

  function resetChapter() {
    if (!activeGroup) return
    const chapterCardIds = new Set(activeGroup.cards.map(card => card.id))
    setRemembered(prev => Object.fromEntries(
      Object.entries(prev).filter(([id]) => !chapterCardIds.has(id))
    ))
    setActiveCardIndex(0)
    setFlipped(false)
  }

  if (!activeGroup || !activeCard) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px 24px',
        textAlign: 'center',
        color: 'var(--color-text-secondary)',
      }}>
        この試験の知識カードはまだありません。
      </div>
    )
  }

  return (
    <div className="flashcard-page">
      <section className="flashcard-shell">
        <div className="flashcard-toolbar">
          <div>
            <div className="flashcard-eyebrow">
              <Layers size={14} />
              知識カード
            </div>
            <h1>{examShortName} の復習カード</h1>
          </div>

          <div className="flashcard-select-wrap">
            <label htmlFor="flashcard-chapter">章を選択</label>
            <select
              id="flashcard-chapter"
              value={activeGroup.chapter.id}
              onChange={event => selectChapter(event.target.value)}
              className="flashcard-chapter-select"
            >
              {groups.map(group => {
                const done = group.cards.filter(card => remembered[card.id]).length
                return (
                  <option key={group.chapter.id} value={group.chapter.id}>
                    第{group.chapter.number}章 {group.chapter.title}（{done}/{group.cards.length}枚）
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="flashcard-meta-row">
          <Metric label="総カード数" value={`${totalCards}枚`} />
          <Metric label="覚えたカード" value={`${rememberedCount}枚`} />
          <Metric label="この章" value={`${chapterRememberedCount}/${cards.length}枚`} />
        </div>

        <div className="flashcard-chapter-heading">
          <div>
            <span>第{activeGroup.chapter.number}章</span>
            <h2>{activeGroup.chapter.title}</h2>
          </div>
          <button onClick={resetChapter} className="flashcard-reset-button">
            <RotateCcw size={15} />
            この章をリセット
          </button>
        </div>

        <div className="flashcard-stage">
          <button
            onClick={() => setFlipped(value => !value)}
            className={`flashcard ${flipped ? 'is-flipped' : ''}`}
            aria-label={flipped ? '問題面に戻る' : '答えを見る'}
          >
            <div className="flashcard-face flashcard-front">
              <CardHeader
                label="QUESTION"
                current={activeCardIndex + 1}
                total={cards.length}
                remembered={!!remembered[activeCard.id]}
              />
              <div className="flashcard-main-text">{activeCard.front}</div>
              <div className="flashcard-hint">クリックして答えを見る</div>
            </div>
            <div className="flashcard-face flashcard-back">
              <CardHeader
                label="ANSWER"
                current={activeCardIndex + 1}
                total={cards.length}
                remembered={!!remembered[activeCard.id]}
              />
              <div className="flashcard-answer">{activeCard.back}</div>
              <div className="flashcard-tags">
                {activeCard.tags?.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </button>
        </div>

        <div className="flashcard-actions">
          <button onClick={() => moveCard(-1)} style={navButtonStyle}>前のカード</button>
          <button
            onClick={toggleRemembered}
            style={{
              ...navButtonStyle,
              background: remembered[activeCard.id] ? 'var(--color-success)' : '#fff',
              color: remembered[activeCard.id] ? '#fff' : 'var(--color-text)',
              borderColor: remembered[activeCard.id] ? 'var(--color-success)' : 'var(--color-border)',
            }}
          >
            <CheckCircle2 size={16} />
            {remembered[activeCard.id] ? '覚えた' : '覚えたにする'}
          </button>
          <button onClick={() => moveCard(1)} style={navButtonStyle}>次のカード</button>
        </div>

        <div className="flashcard-progress">
          <div>
            <span style={{
              width: `${cards.length ? (chapterRememberedCount / cards.length) * 100 : 0}%`,
            }} />
          </div>
          <p>この章の達成度 {chapterRememberedCount}/{cards.length}枚</p>
        </div>
      </section>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <span style={{
      fontSize: '0.75rem',
      fontWeight: 800,
      color: 'var(--color-text-muted)',
      background: 'var(--color-bg-muted)',
      border: '1px solid var(--color-border)',
      padding: '4px 10px',
      borderRadius: 99,
    }}>
      {label} {value}
    </span>
  )
}

function CardHeader({
  label, current, total, remembered,
}: {
  label: string
  current: number
  total: number
  remembered: boolean
}) {
  return (
    <div className="flashcard-header">
      <span>{label}</span>
      <span>{remembered ? '覚えた' : `${current} / ${total}`}</span>
    </div>
  )
}

const navButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 7,
  minWidth: 128,
  border: '1px solid var(--color-border)',
  background: '#fff',
  color: 'var(--color-text)',
  borderRadius: 8,
  padding: '10px 14px',
  fontSize: '0.86rem',
  fontWeight: 800,
  cursor: 'pointer',
  boxShadow: 'var(--shadow-card)',
}
