import { PropertyData } from '@/types/property'

interface CleanTemplateProps {
  data: PropertyData
}

export default function CleanTemplate({ data }: CleanTemplateProps) {
  const totalRent = data.rent + data.managementFee

  return (
    <div
      className="border-2 border-gray-200 bg-white print:border-0 overflow-hidden"
      style={{ aspectRatio: '297/210', width: '100%' }}
    >
      {/* ヘッダー（シンプルな白背景） */}
      <div className="bg-white border-b-4 border-blue-500 px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{data.propertyName}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {data.nearestStation} 徒歩{data.walkingMinutes}分
            </p>
          </div>
          <div className="text-right">
            <div className="text-blue-600 text-3xl font-bold">
              {totalRent.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">円/月（税込）</div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="p-6">
        {/* 基本情報バッジ */}
        <div className="flex gap-3 mb-4">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            {data.layout}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {data.area}m²
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            築{data.buildingAge}年
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {data.structure}
          </span>
        </div>

        {/* 間取り図と写真 */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          {/* 間取り図 */}
          <div className="col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">間取り図</h3>
            <div className="border border-gray-200 rounded-lg bg-gray-50 aspect-square flex items-center justify-center overflow-hidden">
              {data.images.floorPlan ? (
                <img
                  src={data.images.floorPlan.preview}
                  alt="間取り図"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <p className="text-xs text-gray-400">間取り図</p>
              )}
            </div>
          </div>

          {/* 写真グリッド */}
          <div className="col-span-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">室内写真</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.images.interior.slice(0, 4).map((img, index) => (
                <div key={img.id} className="border border-gray-200 rounded-lg overflow-hidden aspect-video">
                  <img
                    src={img.preview}
                    alt={`室内${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {Array.from({ length: Math.max(0, 4 - data.images.interior.length) }).map((_, i) => (
                <div key={`placeholder-${i}`} className="border border-dashed border-gray-200 rounded-lg flex items-center justify-center aspect-video bg-gray-50">
                  <p className="text-xs text-gray-400">室内写真</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 物件情報カード */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">賃料情報</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">賃料</span>
                <span className="font-semibold">{data.rent.toLocaleString()}円</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">管理費</span>
                <span className="font-semibold">{data.managementFee.toLocaleString()}円</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">敷金</span>
                <span className="font-semibold">{data.deposit.toLocaleString()}円</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">礼金</span>
                <span className="font-semibold">{data.keyMoney.toLocaleString()}円</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">物件情報</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">所在地</span>
                <span className="font-semibold text-right text-xs">{data.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">階数</span>
                <span className="font-semibold">{data.floor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 設備 */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">設備</h3>
          <div className="flex flex-wrap gap-2">
            {data.facilities.map((facility, index) => (
              <span key={index} className="bg-white border border-blue-200 px-3 py-1 rounded text-xs text-gray-700">
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* 地図 */}
        {data.images.map && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">アクセス</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden h-32">
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
  )
}
