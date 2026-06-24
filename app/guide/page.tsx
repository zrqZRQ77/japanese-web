import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import ExamToolCard from '@/components/features/exams/ExamToolCard'
import { EXAMS_REGISTRY } from '@/lib/types/exams-registry'
import { getChaptersByExam } from '@/lib/types/chapters-registry'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: '学習ガイド',
  description: '日商簿記3級、FP3級、ITパスポートの学習ガイド一覧。章ごとの教材で基礎から体系的に学べます。',
  path: '/guide',
})

export default function GuidePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--color-bg-subtle)', minHeight: 'calc(100vh - 64px)' }}>
        <section style={{
          background: 'var(--color-hero-bg)',
          padding: '34px 0 28px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <div className="container-page">
            <div style={{
              fontSize: '0.8rem', fontWeight: 700,
              color: 'var(--color-primary)',
              marginBottom: 12,
            }}>学習ガイド</div>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 900, color: 'var(--color-text)',
              marginBottom: 12, lineHeight: 1.2,
            }}>
              章ごとに、基礎から順番に学ぶ
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: 560 }}>
              更新済みの教材に合わせて、試験ごとの章一覧を確認できます。学習ガイドからそのまま各章へ進めます。
            </p>
          </div>
        </section>

        <div className="container-page" style={{ padding: '28px 24px 40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {EXAMS_REGISTRY.map(exam => {
              const chapters = getChaptersByExam(exam.id)
              const sectionCount = chapters.reduce((sum, ch) => sum + ch.sections.length, 0)

              return (
                <ExamToolCard
                  key={exam.id}
                  category={exam.category}
                  title={exam.shortName}
                  countBadge={`${chapters.length}章`}
                  description={exam.description}
                  tags={[`総章数 ${chapters.length}`, `総セクション ${sectionCount}`]}
                  primaryAction={{ href: `/exams/${exam.id}/guide`, label: '章一覧を見る' }}
                  secondaryAction={{ href: `/exams/${exam.id}`, label: 'ダッシュボードへ' }}
                />
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
