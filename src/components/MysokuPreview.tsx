'use client'

import { PropertyData } from '@/types/property'

interface MysokuPreviewProps {
  data: PropertyData
}

export default function MysokuPreview({ data }: MysokuPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">販売図面プレビュー</h2>

      {/* A4サイズを想定した領域 */}
      <div className="border-2 border-gray-300 p-6 bg-white" style={{ aspectRatio: '210/297' }}>
        {/* ヘッダー */}
        <div className="border-b-2 border-gray-800 pb-4 mb-4">
          <h1 className="text-3xl font-bold text-center">{data.propertyName}</h1>
          <p className="text-center text-gray-600 mt-2">{data.address}</p>
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-2 gap-6">
          {/* 左側：基本情報 */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-bold text-lg mb-3 text-blue-900">賃料・費用</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">賃料</span>
                  <span className="font-semibold">{data.rent.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">管理費</span>
                  <span className="font-semibold">{data.managementFee.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">合計</span>
                  <span className="font-bold text-lg text-blue-600">
                    {(data.rent + data.managementFee).toLocaleString()}円/月
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-sm mb-2 text-gray-700">初期費用</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">敷金</span>
                  <span>{data.deposit.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">礼金</span>
                  <span>{data.keyMoney.toLocaleString()}円</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-sm mb-2 text-gray-700">物件詳細</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">間取り</span>
                  <span className="font-semibold">{data.layout}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">専有面積</span>
                  <span>{data.area}m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">築年数</span>
                  <span>築{data.buildingAge}年</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">構造</span>
                  <span>{data.structure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">階数</span>
                  <span>{data.floor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右側：交通・設備 */}
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-bold text-sm mb-2 text-green-900">交通アクセス</h3>
              <div className="text-sm">
                <p>
                  <span className="font-semibold">{data.nearestStation}</span>
                  <br />
                  <span className="text-gray-600">徒歩</span>
                  <span className="font-semibold text-lg text-green-700"> {data.walkingMinutes}分</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-sm mb-2 text-gray-700">設備</h3>
              <div className="flex flex-wrap gap-2">
                {data.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white border border-gray-300 rounded text-xs"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {data.notes && (
              <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                <h3 className="font-bold text-sm mb-2 text-yellow-900">備考</h3>
                <p className="text-sm text-gray-700">{data.notes}</p>
              </div>
            )}

            {/* 画像プレースホルダー */}
            <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
              <p className="text-gray-400 text-sm">物件写真</p>
              <p className="text-xs text-gray-400 mt-1">（今後実装予定）</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-center">
        ※ このプレビューは実際の販売図面のイメージです
      </div>
    </div>
  )
}
