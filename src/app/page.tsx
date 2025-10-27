'use client'

import { useState } from 'react'
import PropertyForm from '@/components/PropertyForm'
import MysokuPreview from '@/components/MysokuPreview'
import { PropertyData, sampleProperty } from '@/types/property'

export default function Home() {
  const [propertyData, setPropertyData] = useState<PropertyData>(sampleProperty)

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">販売図面ジェネレーター</h1>
          <p className="text-gray-600 mt-2">賃貸物件の販売図面を自動生成</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左側：入力フォーム */}
          <div>
            <PropertyForm data={propertyData} onChange={setPropertyData} />
          </div>

          {/* 右側：プレビュー */}
          <div>
            <MysokuPreview data={propertyData} />
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="font-bold text-blue-900 mb-2">今後の開発予定</h2>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>設備項目の追加・削除機能</li>
            <li>画像アップロード機能</li>
            <li>複数テンプレート対応</li>
            <li>PDF出力機能</li>
            <li>データの保存・読み込み機能</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
