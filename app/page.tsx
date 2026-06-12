export default function HomePage() {
  return (
    <div style={{ padding: '50px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>資格合格を、<span style={{ color: 'red' }}>無料で。</span></h1>
      <p>日本の主要資格に特化した学習プラットフォーム。</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>学習ガイド</div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>練習問題</div>
      </div>
    </div>
  );
}