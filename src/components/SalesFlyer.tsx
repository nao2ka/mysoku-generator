'use client'

import { useState } from 'react'
import { PropertyData } from '@/types/property'
import { generatePDF, printPreview } from '@/utils/pdfGenerator'

interface SalesFlyerProps {
  data: PropertyData
}

export default function SalesFlyer({ data }: SalesFlyerProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handlePDFDownload = async () => {
    setIsGenerating(true)
    try {
      const page1 = document.getElementById('sales-flyer-page-1')
      const page2 = document.getElementById('sales-flyer-page-2')

      if (!page1 || !page2) {
        alert('ページ要素が見つかりません')
        return
      }

      const fileName = `${data.propertyName || '販売図面'}.pdf`
      await generatePDF(page1, page2, fileName)
    } catch (error) {
      console.error('PDF生成エラー:', error)
      alert('PDF生成中にエラーが発生しました')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">販売図面プレビュー</h2>

        {/* PDF出力ボタン */}
        <div className="flex gap-2">
          <button
            onClick={printPreview}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            印刷
          </button>
          <button
            onClick={handlePDFDownload}
            disabled={isGenerating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                生成中...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDFダウンロード
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* 1ページ目 */}
        <div id="sales-flyer-page-1">
          <Page1 data={data} />
        </div>

        {/* ページ区切り */}
        <div className="border-t-2 border-dashed border-gray-400 relative print:hidden">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 text-sm text-gray-500">
            ページ区切り
          </div>
        </div>

        {/* 2ページ目 */}
        <div id="sales-flyer-page-2">
          <Page2 data={data} />
        </div>
      </div>
    </div>
  )
}

// 1ページ目コンポーネント（サンプル画像スタイル）
function Page1({ data }: { data: PropertyData }) {
  const totalRent = data.rent + data.managementFee

  return (
    <div
      className="border-2 border-gray-300 bg-white print:border-0 overflow-hidden"
      style={{ aspectRatio: '210/297', width: '100%' }}
    >
      {/* ヘッダー（黒背景） */}
      <div className="bg-gray-900 text-white px-4 py-3">
        <div className="grid grid-cols-3 items-center gap-4">
          {/* 左: 物件名 */}
          <div>
            <h1 className="text-xl font-bold">{data.propertyName}</h1>
          </div>

          {/* 中央: 交通情報 */}
          <div className="text-center text-sm">
            {data.nearestStation} 徒歩{data.walkingMinutes}分
          </div>

          {/* 右: 賃料（強調） */}
          <div className="text-right">
            <div className="text-yellow-400 text-3xl font-bold">
              {totalRent.toLocaleString()}
            </div>
            <div className="text-xs text-white">円/月</div>
          </div>
        </div>

        {/* サブ情報 */}
        <div className="mt-2 flex items-center gap-4 text-xs">
          <span className="bg-white text-gray-900 px-2 py-0.5 rounded font-semibold">
            {data.layout}
          </span>
          <span>{data.area}m²</span>
          <span>築{data.buildingAge}年</span>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="p-4 grid grid-cols-3 gap-4 h-[calc(100%-120px)]">
        {/* 左1/3: 間取り図 */}
        <div className="flex flex-col">
          <div className="flex-1 border-2 border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
            {data.images.floorPlan ? (
              <img
                src={data.images.floorPlan.preview}
                alt="間取り図"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-center text-gray-400">
                <p className="text-sm">間取り図</p>
                <p className="text-xs mt-1">画像を追加</p>
              </div>
            )}
          </div>
        </div>

        {/* 右2/3: 室内写真グリッド（2x2） + 地図 */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* 室内写真 2x2グリッド */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            {data.images.interior.slice(0, 4).map((img, index) => (
              <div key={img.id} className="border border-gray-300 overflow-hidden bg-gray-50">
                <img
                  src={img.preview}
                  alt={`室内${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* 足りない場合はプレースホルダー */}
            {Array.from({ length: Math.max(0, 4 - data.images.interior.length) }).map((_, i) => (
              <div key={`placeholder-${i}`} className="border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <p className="text-xs text-gray-400">室内写真</p>
              </div>
            ))}
          </div>

          {/* 地図 */}
          <div className="h-32">
            {data.images.map ? (
              <div className="border border-gray-300 h-full overflow-hidden">
                <img
                  src={data.images.map.preview}
                  alt="地図"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 h-full flex items-center justify-center bg-gray-50">
                <p className="text-xs text-gray-400">地図</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* フッター（物件詳細情報 - 黒背景）*/}
      <div className="bg-gray-900 text-white px-4 py-3 text-xs">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <span className="text-gray-400">所在地</span>
            <p className="font-semibold mt-0.5">{data.address}</p>
          </div>
          <div>
            <span className="text-gray-400">賃料</span>
            <p className="font-semibold mt-0.5">{data.rent.toLocaleString()}円</p>
          </div>
          <div>
            <span className="text-gray-400">敷金/礼金</span>
            <p className="font-semibold mt-0.5">
              {data.deposit.toLocaleString()}円 / {data.keyMoney.toLocaleString()}円
            </p>
          </div>
          <div>
            <span className="text-gray-400">構造</span>
            <p className="font-semibold mt-0.5">{data.structure} / {data.floor}</p>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.facilities.slice(0, 8).map((facility, index) => (
            <span key={index} className="bg-gray-700 px-2 py-0.5 rounded text-xs">
              {facility}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 2ページ目コンポーネント
function Page2({ data }: { data: PropertyData }) {
  const remainingInteriorImages = data.images.interior.slice(2)

  return (
    <div
      className="border-2 border-gray-300 bg-white print:border-0"
      style={{ aspectRatio: '210/297', width: '100%' }}
    >
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4">
        <h2 className="text-xl font-bold">{data.propertyName} - 詳細情報</h2>
      </div>

      <div className="p-6 space-y-4">
        {/* 室内写真（残り） */}
        {remainingInteriorImages.length > 0 && (
          <div>
            <h3 className="font-bold text-sm mb-3 text-gray-700">室内写真</h3>
            <div className="grid grid-cols-3 gap-3">
              {remainingInteriorImages.map((img) => (
                <div key={img.id} className="border-2 border-gray-300 rounded overflow-hidden aspect-video">
                  <img
                    src={img.preview}
                    alt="室内"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 地図 */}
        {data.images.map && (
          <div>
            <h3 className="font-bold text-sm mb-3 text-gray-700">アクセスマップ</h3>
            <div className="border-2 border-gray-300 rounded overflow-hidden" style={{ height: '250px' }}>
              <img
                src={data.images.map.preview}
                alt="地図"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* 物件詳細情報 */}
        <div>
          <h3 className="font-bold text-sm mb-3 text-gray-700 border-b pb-2">物件詳細</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div className="flex">
              <span className="text-gray-600 w-24">所在地</span>
              <span className="font-medium">{data.address}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-24">階数</span>
              <span className="font-medium">{data.floor}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-24">交通</span>
              <span className="font-medium">
                {data.nearestStation} 徒歩{data.walkingMinutes}分
              </span>
            </div>
          </div>
        </div>

        {/* 設備 */}
        <div>
          <h3 className="font-bold text-sm mb-3 text-gray-700 border-b pb-2">設備</h3>
          <div className="flex flex-wrap gap-2">
            {data.facilities.map((facility, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 border border-blue-200 rounded text-sm"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* 備考 */}
        {data.notes && (
          <div>
            <h3 className="font-bold text-sm mb-3 text-gray-700 border-b pb-2">備考</h3>
            <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded border border-yellow-200">
              {data.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
