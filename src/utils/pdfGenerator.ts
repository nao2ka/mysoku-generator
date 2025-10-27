import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * 販売図面をPDFとして出力する
 * @param page1Element 1ページ目のDOM要素
 * @param page2Element 2ページ目のDOM要素
 * @param fileName ファイル名（デフォルト: 販売図面.pdf）
 */
export async function generatePDF(
  page1Element: HTMLElement,
  page2Element: HTMLElement,
  fileName: string = '販売図面.pdf'
): Promise<void> {
  try {
    // A4横サイズの設定（mm）
    const a4Width = 297  // 横
    const a4Height = 210 // 縦

    // PDFドキュメントを作成（横向き）
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    // 1ページ目をキャンバスに変換
    const canvas1 = await html2canvas(page1Element, {
      scale: 2, // 高解像度化
      useCORS: true, // 外部画像の読み込みを許可
      logging: false,
      backgroundColor: '#ffffff',
    })

    // キャンバスを画像データに変換
    const imgData1 = canvas1.toDataURL('image/jpeg', 1.0)

    // 1ページ目をPDFに追加
    pdf.addImage(imgData1, 'JPEG', 0, 0, a4Width, a4Height)

    // 2ページ目を追加
    pdf.addPage()

    // 2ページ目をキャンバスに変換
    const canvas2 = await html2canvas(page2Element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })

    const imgData2 = canvas2.toDataURL('image/jpeg', 1.0)

    // 2ページ目をPDFに追加
    pdf.addImage(imgData2, 'JPEG', 0, 0, a4Width, a4Height)

    // PDFをダウンロード
    pdf.save(fileName)
  } catch (error) {
    console.error('PDF生成中にエラーが発生しました:', error)
    throw error
  }
}

/**
 * 印刷プレビューを開く
 */
export function printPreview(): void {
  window.print()
}
