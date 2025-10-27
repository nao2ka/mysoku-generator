import { PropertyData } from '@/types/property'

interface PremiumTemplateProps {
  data: PropertyData
}

export default function PremiumTemplate({ data }: PremiumTemplateProps) {
  const totalRent = data.rent + data.managementFee

  return (
    <div
      className="border-2 border-gray-300 bg-white print:border-0 overflow-hidden"
      style={{ aspectRatio: '297/210', width: '100%' }}
    >
      {/* ヘッダー（黒背景） */}
      <div className="bg-gray-900 text-white px-4 py-3">
        <div className="grid grid-cols-3 items-center gap-4">
          <div>
            <h1 className="text-xl font-bold">{data.propertyName}</h1>
          </div>
          <div className="text-center text-sm">
            {data.nearestStation} 徒歩{data.walkingMinutes}分
          </div>
          <div className="text-right">
            <div className="text-yellow-400 text-3xl font-bold">
              {totalRent.toLocaleString()}
            </div>
            <div className="text-xs text-white">円/月</div>
          </div>
        </div>
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

        {/* 右2/3: 室内写真グリッド + 地図 */}
        <div className="col-span-2 flex flex-col gap-4">
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
            {Array.from({ length: Math.max(0, 4 - data.images.interior.length) }).map((_, i) => (
              <div key={`placeholder-${i}`} className="border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <p className="text-xs text-gray-400">室内写真</p>
              </div>
            ))}
          </div>
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

      {/* フッター */}
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
