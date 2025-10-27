import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '販売図面ジェネレーター',
  description: '賃貸物件の販売図面を自動生成',
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
