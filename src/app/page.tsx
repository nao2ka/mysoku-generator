'use client'

import { useState } from 'react'
import PropertyForm from '@/components/PropertyForm'
import SalesFlyer from '@/components/SalesFlyer'
import { PropertyData, sampleProperty } from '@/types/property'

export default function Home() {
  const [propertyData, setPropertyData] = useState<PropertyData>(sampleProperty)

  return (
    <main className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">販売図面ジェネレーター</h1>
          <p className="text-gray-600 mt-2">賃貸物件の販売図面を自動生成</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* 左側：入力フォーム (2/5) */}
          <div className="xl:col-span-2">
            <PropertyForm data={propertyData} onChange={setPropertyData} />
          </div>

          {/* 右側：プレビュー (3/5) */}
          <div className="xl:col-span-3">
            <SalesFlyer data={propertyData} />
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="font-bold text-green-900 mb-2">🎉 Phase 1 & 2 実装完了</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Phase 1: 画像処理</h3>
              <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                <li>✅ 画像アップロード機能</li>
                <li>✅ ドラッグ&ドロップ対応</li>
                <li>✅ 2ページレイアウト</li>
                <li>✅ リアルタイムプレビュー</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Phase 2: PDF出力</h3>
              <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                <li>✅ PDF生成・ダウンロード</li>
                <li>✅ 印刷機能</li>
                <li>✅ 高画質出力</li>
                <li>✅ A4サイズ最適化</li>
              </ul>
            </div>
          </div>
          <h3 className="font-bold text-blue-900 mb-2 mt-4">今後の開発予定（Phase 3以降）</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>設備項目の追加・削除機能</li>
            <li>データの保存・読み込み機能</li>
            <li>テンプレートの切り替え</li>
            <li>画像の並び替え機能</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
