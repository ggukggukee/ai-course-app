import { Editor } from '@tiptap/react'
import { Ban } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormAttributes, MultiGridCheckForm, MultiGridForm, MultipleForm, SingleForm } from '../types'

export default function Errors({ editor, form }: { editor: Editor; form: FormAttributes['form'] }) {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    if (!editor.options.editable) return
    if (!form) return

    const arr: string[] = []

    form.forEach((q, i) => {
      if (!q.prompt) {
        arr.push(`Вопрос ${i + 1} не заполнен`)
      }

      // Type guard for forms with options
      const hasOptions = (formItem: FormAttributes['form'][number]): formItem is SingleForm | MultipleForm => {
        return formItem.type === 'single' || formItem.type === 'multiple'
      }

      // Type guard for forms with rows and columns
      const hasRowsAndColumns = (
        formItem: FormAttributes['form'][number],
      ): formItem is MultiGridForm | MultiGridCheckForm => {
        return formItem.type === 'multigrid' || formItem.type === 'multigridcheck'
      }

      // Check options (only applicable for Single and Multiple forms)
      if (hasOptions(q) && q.options) {
        q.options.forEach((o, j) => {
          if (!o.text && !o.other) {
            arr.push(`Выбор ${j + 1} в вопросе ${i + 1} не заполнен`)
          }
        })
      }

      // Check rows (only applicable for MultiGrid and MultiGridCheck forms)
      if (hasRowsAndColumns(q) && q.rows) {
        q.rows.forEach((o, j) => {
          if (!o.text) {
            arr.push(`Строка ${j + 1} в вопросе ${i + 1} не заполнен`)
          }
        })
      }

      // Check columns (only applicable for MultiGrid and MultiGridCheck forms)
      if (hasRowsAndColumns(q) && q.columns) {
        q.columns.forEach((o, j) => {
          if (!o.text) {
            arr.push(`Столбец ${j + 1} в вопросе ${i + 1} не заполнен`)
          }
        })
      }
    })

    setMessages(arr)
  }, [editor.options.editable, form])

  if (!editor.options.editable) return null

  if (messages?.length === 0) return null

  return messages?.map((m, k) => (
    <div className="flex items-center gap-2" key={k}>
      <Ban className="w-4 h-4 text-destructive" />
      <span className="text-destructive text-sm">{m}</span>
    </div>
  ))
}
