'use client'

import { useRef } from 'react'
import { PropertyImage } from '@/types/property'

interface SingleImageUploadProps {
  title: string
  image: PropertyImage | null
  onImageChange: (image: PropertyImage | null) => void
}

export default function SingleImageUpload({
  title,
  image,
  onImageChange,
}: SingleImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const preview = await readFileAsDataURL(file)
    onImageChange({
      id: generateId(),
      file,
      preview,
    })

    // input をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    onImageChange(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const file = Array.from(e.dataTransfer.files).find((file) =>
      file.type.startsWith('image/')
    )

    if (!file) return

    const preview = await readFileAsDataURL(file)
    onImageChange({
      id: generateId(),
      file,
      preview,
    })
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-700">{title}</h3>

      {!image ? (
        // アップロードエリア
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="space-y-2">
            <div className="text-gray-400">
              <svg
                className="mx-auto h-10 w-10"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              <span className="text-blue-500 font-medium">クリック</span>
              または
              <span className="text-blue-500 font-medium">ドラッグ&ドロップ</span>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
          </div>
        </div>
      ) : (
        // 画像プレビュー
        <div className="relative group">
          <img
            src={image.preview}
            alt={title}
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="削除"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

// ユーティリティ関数
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
