// 統計カード（右上エリア4つ）
export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>
        {value}
      </span>
    </div>
  )
}
