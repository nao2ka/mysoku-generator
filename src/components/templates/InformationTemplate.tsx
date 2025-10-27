import { PropertyData } from '@/types/property'

interface InformationTemplateProps {
  data: PropertyData
}

export default function InformationTemplate({ data }: InformationTemplateProps) {
  const totalRent = data.rent + data.managementFee

  return (
    <div
      className="border-2 border-gray-300 bg-white print:border-0 overflow-hidden"
      style={{ aspectRatio: '297/210', width: '100%' }}
    >
      {/* ヘッダー */}
      <div className="bg-gray-800 text-white px-4 py-3">
        <h1 className="text-xl font-bold">{data.propertyName}</h1>
        <p className="text-sm mt-1">{data.address}</p>
      </div>

      {/* メインコンテンツ（2カラム） */}
      <div className="grid grid-cols-5 h-[calc(100%-60px)]">
        {/* 左カラム: 詳細情報 */}
        <div className="col-span-2 bg-gray-50 p-4 overflow-auto border-r border-gray-200">
          {/* 賃料情報 */}
          <div className="mb-4 bg-white rounded p-3 shadow-sm">
            <h3 className="font-bold text-sm mb-2 text-gray-800 border-b pb-1">賃料情報</h3>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">賃料</td>
                  <td className="py-1.5 text-right font-semibold">{data.rent.toLocaleString()}円</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">管理費</td>
                  <td className="py-1.5 text-right font-semibold">{data.managementFee.toLocaleString()}円</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="py-1.5 text-gray-800 font-semibold">合計</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{totalRent.toLocaleString()}円/月</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 初期費用 */}
          <div className="mb-4 bg-white rounded p-3 shadow-sm">
            <h3 className="font-bold text-sm mb-2 text-gray-800 border-b pb-1">初期費用</h3>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">敷金</td>
                  <td className="py-1.5 text-right font-semibold">{data.deposit.toLocaleString()}円</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">礼金</td>
                  <td className="py-1.5 text-right font-semibold">{data.keyMoney.toLocaleString()}円</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 物件詳細 */}
          <div className="mb-4 bg-white rounded p-3 shadow-sm">
            <h3 className="font-bold text-sm mb-2 text-gray-800 border-b pb-1">物件詳細</h3>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">間取り</td>
                  <td className="py-1.5 text-right font-semibold">{data.layout}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">専有面積</td>
                  <td className="py-1.5 text-right font-semibold">{data.area}m²</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">築年数</td>
                  <td className="py-1.5 text-right font-semibold">築{data.buildingAge}年</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">構造</td>
                  <td className="py-1.5 text-right font-semibold">{data.structure}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">階数</td>
                  <td className="py-1.5 text-right font-semibold">{data.floor}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 交通 */}
          <div className="mb-4 bg-white rounded p-3 shadow-sm">
            <h3 className="font-bold text-sm mb-2 text-gray-800 border-b pb-1">交通</h3>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b">
                  <td className="py-1.5 text-gray-600">最寄り駅</td>
                  <td className="py-1.5 text-right font-semibold">{data.nearestStation}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-gray-600">徒歩</td>
                  <td className="py-1.5 text-right font-semibold">{data.walkingMinutes}分</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 設備 */}
          <div className="bg-white rounded p-3 shadow-sm">
            <h3 className="font-bold text-sm mb-2 text-gray-800 border-b pb-1">設備</h3>
            <div className="flex flex-wrap gap-1">
              {data.facilities.map((facility, index) => (
                <span key={index} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {facility}
                </span>
              ))}
            </div>
          </div>

          {/* 備考 */}
          {data.notes && (
            <div className="mt-4 bg-yellow-50 rounded p-3 shadow-sm border border-yellow-200">
              <h3 className="font-bold text-sm mb-1 text-yellow-900">備考</h3>
              <p className="text-xs text-gray-700">{data.notes}</p>
            </div>
          )}
        </div>

        {/* 右カラム: 画像 */}
        <div className="col-span-3 p-4 space-y-3 overflow-auto">
          {/* 間取り図 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">間取り図</h3>
            <div className="border-2 border-gray-300 rounded bg-gray-50 aspect-video flex items-center justify-center overflow-hidden">
              {data.images.floorPlan ? (
                <img
                  src={data.images.floorPlan.preview}
                  alt="間取り図"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <p className="text-sm text-gray-400">間取り図</p>
              )}
            </div>
          </div>

          {/* 室内写真 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">室内写真</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.images.interior.slice(0, 6).map((img, index) => (
                <div key={img.id} className="border border-gray-300 rounded overflow-hidden aspect-video">
                  <img
                    src={img.preview}
                    alt={`室内${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {Array.from({ length: Math.max(0, 6 - data.images.interior.length) }).map((_, i) => (
                <div key={`placeholder-${i}`} className="border border-dashed border-gray-300 rounded flex items-center justify-center aspect-video bg-gray-50">
                  <p className="text-xs text-gray-400">室内写真</p>
                </div>
              ))}
            </div>
          </div>

          {/* 地図 */}
          {data.images.map && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">アクセスマップ</h3>
              <div className="border border-gray-300 rounded overflow-hidden h-40">
                <img
                  src={data.images.map.preview}
                  alt="地図"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
