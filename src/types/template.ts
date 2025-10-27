// テンプレートの型定義

export type TemplateType = 'premium' | 'clean' | 'information'

export interface Template {
  id: TemplateType
  name: string
  description: string
  theme: string // テーマ（高級感、清潔感、情報量）
}

export const templates: Template[] = [
  {
    id: 'premium',
    name: 'プレミアム',
    description: '高級感のある黒背景で賃料を強調',
    theme: '高級感重視',
  },
  {
    id: 'clean',
    name: 'クリーン',
    description: 'シンプルで清潔感のある白背景デザイン',
    theme: 'シンプル・清潔感重視',
  },
  {
    id: 'information',
    name: 'インフォメーション',
    description: '情報を詳細に表示する2カラムレイアウト',
    theme: '情報量重視',
  },
]
