// 物件情報の型定義

export interface PropertyData {
  // 基本情報
  propertyName: string
  address: string
  rent: number
  managementFee: number
  deposit: number
  keyMoney: number

  // 物件詳細
  layout: string // 例: 1K, 2LDK
  area: number // 専有面積（m²）
  buildingAge: number // 築年数
  structure: string // 構造（木造、RC造など）
  floor: string // 階数（例: 3階/5階建）

  // 交通
  nearestStation: string
  walkingMinutes: number

  // 設備
  facilities: string[]

  // 画像URL
  images?: {
    exterior?: string
    interior?: string[]
    floorPlan?: string
  }

  // その他
  notes?: string
}

// サンプルデータ
export const sampleProperty: PropertyData = {
  propertyName: 'サンプルマンション',
  address: '東京都渋谷区〇〇1-2-3',
  rent: 120000,
  managementFee: 8000,
  deposit: 120000,
  keyMoney: 120000,
  layout: '1K',
  area: 25.5,
  buildingAge: 5,
  structure: 'RC造',
  floor: '3階/10階建',
  nearestStation: '渋谷駅',
  walkingMinutes: 8,
  facilities: [
    'エアコン',
    'オートロック',
    'バス・トイレ別',
    '宅配ボックス',
    '駐輪場',
  ],
  notes: '角部屋につき日当たり良好',
}
