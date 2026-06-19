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
      <section style={{
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        padding: '24px',
        marginBottom: 22,
        boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          background: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          fontSize: '0.75rem',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: 99,
          marginBottom: 12,
        }}>
          <Layers size={14} />
          知識カード
        </div>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: 8 }}>
          {examShortName} の知識カード
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 16 }}>
          カードをクリックして答えを確認し、覚えたカードにチェックを付けながら復習できます。
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Metric label="対象章" value={`${groups.length}章`} />
          <Metric label="総カード数" value={`${totalCards}枚`} />
          <Metric label="覚えたカード" value={`${rememberedCount}枚`} />
        </div>
      </section>

      <div
        className="flashcard-layout"
        style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(220px, 280px) minmax(0, 1fr)',
        gap: 18,
        alignItems: 'start',
      }}>
        <aside
          className="flashcard-chapter-list"
          style={{
          background: '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          padding: 12,
          boxShadow: 'var(--shadow-card)',
          position: 'sticky',
          top: 84,
        }}>
          <div style={{
            padding: '8px 10px 12px',
            color: 'var(--color-text-secondary)',
            fontSize: '0.78rem',
            fontWeight: 800,
          }}>
            章を選択
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            {groups.map(group => {
              const active = group.chapter.id === activeGroup.chapter.id
              const done = group.cards.filter(card => remembered[card.id]).length
              return (
                <button
                  key={group.chapter.id}
                  onClick={() => selectChapter(group.chapter.id)}
                  style={{
                    width: '100%',
                    border: '1px solid',
                    borderColor: active ? 'rgba(37,99,235,0.28)' : 'transparent',
                    background: active ? 'var(--color-primary-light)' : 'transparent',
                    color: active ? 'var(--color-primary)' : 'var(--color-text)',
                    borderRadius: 8,
                    padding: '10px 11px',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, marginBottom: 4, opacity: 0.78 }}>
                    第{group.chapter.number}章
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, lineHeight: 1.45 }}>
                    {group.chapter.title}
                  </div>
                  <div style={{ marginTop: 7, fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    {done}/{group.cards.length}枚
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        <main>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800, marginBottom: 4 }}>
                第{activeGroup.chapter.number}章
              </div>
              <h2 style={{ margin: 0, fontSize: '1.08rem', fontWeight: 900, color: 'var(--color-text)' }}>
                {activeGroup.chapter.title}
              </h2>
            </div>
            <button
              onClick={resetChapter}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                border: '1px solid var(--color-border)',
                background: '#fff',
                borderRadius: 8,
                padding: '8px 11px',
                color: 'var(--color-text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
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

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            marginTop: 16,
            flexWrap: 'wrap',
          }}>
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

          <div style={{ marginTop: 18 }}>
            <div style={{
              height: 7,
              borderRadius: 99,
              background: 'var(--color-border)',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${cards.length ? (chapterRememberedCount / cards.length) * 100 : 0}%`,
                height: '100%',
                background: 'var(--color-primary)',
                borderRadius: 99,
                transition: 'width 0.25s ease',
              }} />
            </div>
            <div style={{
              marginTop: 8,
              fontSize: '0.78rem',
              color: 'var(--color-text-secondary)',
              fontWeight: 700,
              textAlign: 'right',
            }}>
              この章の達成度 {chapterRememberedCount}/{cards.length}枚
            </div>
          </div>
        </main>
      </div>
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
