import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'マイソクジェネレーター',
  description: '賃貸物件のマイソクを自動生成',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
