#!/usr/bin/env node
// 简单脚本：下载指定 URL 并保存为 content/exams/{examId}/official.html
// 用法: node scripts/fetch-official-sample.js <examId> <url>
const fs = require('fs')
const path = require('path')

async function main() {
  const [,, examId, url] = process.argv
  if (!examId || !url) {
    console.error('Usage: node scripts/fetch-official-sample.js <examId> <url>')
    process.exit(2)
  }
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
    const html = await res.text()
    const root = path.join(process.cwd(), 'content', 'exams', examId)
    if (!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true })
    const outHtml = path.join(root, 'official.html')
    fs.writeFileSync(outHtml, html, 'utf-8')
    const meta = {
      sourceUrl: url,
      fetchedAt: new Date().toISOString(),
      note: '已保存为 official.html，请人工检查并转换为 official.json（结构参见 lib/types）'
    }
    fs.writeFileSync(path.join(root, 'official-source.json'), JSON.stringify(meta, null, 2), 'utf-8')
    console.log('Saved official.html and official-source.json to', root)
  } catch (e) {
    console.error('Error:', e.message || e)
    process.exit(1)
  }
}

main()
