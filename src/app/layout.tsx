import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}
