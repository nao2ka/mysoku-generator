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

// 1ページ目コンポーネント
function Page1({ data }: { data: PropertyData }) {
  return (
    <div
      className="border-2 border-gray-300 bg-white print:border-0"
      style={{ aspectRatio: '210/297', width: '100%' }}
    >
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{data.propertyName}</h1>
            <p className="text-sm opacity-90">
              {data.nearestStation} 徒歩{data.walkingMinutes}分
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {(data.rent + data.managementFee).toLocaleString()}
            </div>
            <div className="text-sm">円/月</div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-6 h-[calc(100%-80px)]">
        {/* 左側: 間取り図 */}
        <div className="flex flex-col">
          <h3 className="font-bold text-sm mb-2 text-gray-700">間取り図</h3>
          <div className="flex-1 border-2 border-gray-300 rounded bg-gray-50 flex items-center justify-center overflow-hidden">
            {data.images.floorPlan ? (
              <img
                src={data.images.floorPlan.preview}
                alt="間取り図"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-center text-gray-400">
                <p className="text-sm">間取り図</p>
                <p className="text-xs mt-1">画像を追加してください</p>
              </div>
            )}
          </div>

          {/* 基本情報 */}
          <div className="mt-4 bg-blue-50 p-3 rounded text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">間取り</span>
              <span className="font-semibold">{data.layout}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">専有面積</span>
              <span className="font-semibold">{data.area}m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">築年数</span>
              <span className="font-semibold">築{data.buildingAge}年</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">構造</span>
              <span className="font-semibold">{data.structure}</span>
            </div>
          </div>
        </div>

        {/* 右側: 写真と詳細情報 */}
        <div className="flex flex-col space-y-3">
          {/* 外観写真 */}
          <div>
            <h3 className="font-bold text-sm mb-2 text-gray-700">外観</h3>
            {data.images.exterior.length > 0 ? (
              <div className={`grid gap-2 ${data.images.exterior.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {data.images.exterior.map((img) => (
                  <div key={img.id} className="border-2 border-gray-300 rounded overflow-hidden aspect-video">
                    <img
                      src={img.preview}
                      alt="外観"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded aspect-video flex items-center justify-center">
                <p className="text-xs text-gray-400">外観写真</p>
              </div>
            )}
          </div>

          {/* 室内写真（2枚まで表示） */}
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-2 text-gray-700">室内</h3>
            {data.images.interior.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 h-full">
                {data.images.interior.slice(0, 2).map((img) => (
                  <div key={img.id} className="border-2 border-gray-300 rounded overflow-hidden">
                    <img
                      src={img.preview}
                      alt="室内"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {data.images.interior.length === 1 && (
                  <div className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                    <p className="text-xs text-gray-400">室内写真</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded h-full flex items-center justify-center">
                <p className="text-xs text-gray-400">室内写真</p>
              </div>
            )}
          </div>

          {/* 賃料情報 */}
          <div className="bg-gray-50 p-3 rounded text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-600 text-xs">賃料</span>
                <p className="font-semibold">{data.rent.toLocaleString()}円</p>
              </div>
              <div>
                <span className="text-gray-600 text-xs">管理費</span>
                <p className="font-semibold">{data.managementFee.toLocaleString()}円</p>
              </div>
              <div>
                <span className="text-gray-600 text-xs">敷金</span>
                <p className="font-semibold">{data.deposit.toLocaleString()}円</p>
              </div>
              <div>
                <span className="text-gray-600 text-xs">礼金</span>
                <p className="font-semibold">{data.keyMoney.toLocaleString()}円</p>
              </div>
            </div>
          </div>
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
