'use client'

import { useRef } from 'react'
import { PropertyImage } from '@/types/property'

interface ImageUploadProps {
  title: string
  images: PropertyImage[]
  maxImages: number
  onImagesChange: (images: PropertyImage[]) => void
}

export default function ImageUpload({
  title,
  images,
  maxImages,
  onImagesChange,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const remainingSlots = maxImages - images.length
    const filesToAdd = Array.from(files).slice(0, remainingSlots)

    const newImages: PropertyImage[] = await Promise.all(
      filesToAdd.map(async (file) => {
        const preview = await readFileAsDataURL(file)
        return {
          id: generateId(),
          file,
          preview,
        }
      })
    )

    onImagesChange([...images, ...newImages])

    // input をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    )

    const remainingSlots = maxImages - images.length
    const filesToAdd = files.slice(0, remainingSlots)

    const newImages: PropertyImage[] = await Promise.all(
      filesToAdd.map(async (file) => {
        const preview = await readFileAsDataURL(file)
        return {
          id: generateId(),
          file,
          preview,
        }
      })
    )

    onImagesChange([...images, ...newImages])
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="text-sm text-gray-500">
          {images.length} / {maxImages}枚
        </span>
      </div>

      {/* アップロードエリア */}
      {images.length < maxImages && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="space-y-2">
            <div className="text-gray-400">
              <svg
                className="mx-auto h-12 w-12"
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
              で画像を追加
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF（最大{maxImages}枚）
            </p>
          </div>
        </div>
      )}

      {/* 画像プレビュー */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.preview}
                alt="プレビュー"
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                onClick={() => handleRemove(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="削除"
              >
                <svg
                  className="w-4 h-4"
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
          ))}
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
