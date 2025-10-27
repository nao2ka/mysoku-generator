'use client'

import { PropertyData, PropertyImage } from '@/types/property'
import SingleImageUpload from './SingleImageUpload'
import ImageUpload from './ImageUpload'

interface PropertyFormProps {
  data: PropertyData
  onChange: (data: PropertyData) => void
}

export default function PropertyForm({ data, onChange }: PropertyFormProps) {
  const handleChange = (field: keyof PropertyData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handleImageChange = (
    category: keyof PropertyData['images'],
    value: PropertyImage | PropertyImage[] | null
  ) => {
    onChange({
      ...data,
      images: {
        ...data.images,
        [category]: value,
      },
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">物件情報入力</h2>

      {/* 基本情報 */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 border-b pb-2">基本情報</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            物件名
          </label>
          <input
            type="text"
            value={data.propertyName}
            onChange={(e) => handleChange('propertyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            住所
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              賃料（円）
            </label>
            <input
              type="number"
              value={data.rent}
              onChange={(e) => handleChange('rent', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              管理費（円）
            </label>
            <input
              type="number"
              value={data.managementFee}
              onChange={(e) => handleChange('managementFee', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              敷金（円）
            </label>
            <input
              type="number"
              value={data.deposit}
              onChange={(e) => handleChange('deposit', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              礼金（円）
            </label>
            <input
              type="number"
              value={data.keyMoney}
              onChange={(e) => handleChange('keyMoney', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 物件詳細 */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 border-b pb-2">物件詳細</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              間取り
            </label>
            <input
              type="text"
              value={data.layout}
              onChange={(e) => handleChange('layout', e.target.value)}
              placeholder="例: 1K, 2LDK"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              専有面積（m²）
            </label>
            <input
              type="number"
              step="0.1"
              value={data.area}
              onChange={(e) => handleChange('area', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              築年数
            </label>
            <input
              type="number"
              value={data.buildingAge}
              onChange={(e) => handleChange('buildingAge', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              構造
            </label>
            <input
              type="text"
              value={data.structure}
              onChange={(e) => handleChange('structure', e.target.value)}
              placeholder="例: RC造, 木造"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            階数
          </label>
          <input
            type="text"
            value={data.floor}
            onChange={(e) => handleChange('floor', e.target.value)}
            placeholder="例: 3階/10階建"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 交通 */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 border-b pb-2">交通</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              最寄り駅
            </label>
            <input
              type="text"
              value={data.nearestStation}
              onChange={(e) => handleChange('nearestStation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              徒歩（分）
            </label>
            <input
              type="number"
              value={data.walkingMinutes}
              onChange={(e) => handleChange('walkingMinutes', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 画像アップロード */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 border-b pb-2">画像</h3>

        {/* 間取り図 */}
        <SingleImageUpload
          title="間取り図"
          image={data.images.floorPlan}
          onImageChange={(img) => handleImageChange('floorPlan', img)}
        />

        {/* 外観写真 */}
        <ImageUpload
          title="外観写真"
          images={data.images.exterior}
          maxImages={2}
          onImagesChange={(imgs) => handleImageChange('exterior', imgs)}
        />

        {/* 室内写真 */}
        <ImageUpload
          title="室内写真"
          images={data.images.interior}
          maxImages={6}
          onImagesChange={(imgs) => handleImageChange('interior', imgs)}
        />

        {/* 地図 */}
        <SingleImageUpload
          title="地図（オプション）"
          image={data.images.map}
          onImageChange={(img) => handleImageChange('map', img)}
        />
      </div>
    </div>
  )
}
