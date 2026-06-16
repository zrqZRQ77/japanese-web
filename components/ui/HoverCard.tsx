'use client'
export default function HoverCard({
  children, style = {}
}: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ ...style, transition: 'box-shadow 0.15s, transform 0.15s' }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-elevated)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {children}
    </div>
  )
}
