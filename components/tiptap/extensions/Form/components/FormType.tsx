import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Editor } from '@tiptap/core'
import { v4 as uuidv4 } from 'uuid'
import {
  DateForm,
  FormAttributes,
  LinearForm,
  MultiGridCheckForm,
  MultiGridForm,
  MultipleForm,
  ParagraphForm,
  ShortForm,
  SingleForm,
  TimeForm,
} from '../types'

export default function FormType({
  editor,
  form,
  tab,
  setForm,
  updateAttributes,
}: {
  editor: Editor
  form: FormAttributes['form']
  tab: number
  setForm: (form: FormAttributes['form']) => void
  updateAttributes: (attributes: Partial<FormAttributes>) => void
}) {
  if (!editor.options.editable) return null

  return (
    <div className="space-y-1">
      <Label>Тип</Label>
      <Select
        value={form[tab]?.type}
        onValueChange={value => handleChangeType(value, tab, form, setForm, updateAttributes)}
      >
        <SelectTrigger className="max-w-sm">
          <SelectValue placeholder="Тип..." />
        </SelectTrigger>
        <SelectContent>
          {types.map(t => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const handleChangeType = (
  value: string,
  tab: number,
  form: FormAttributes['form'],
  setForm: (form: FormAttributes['form']) => void,
  updateAttributes: (attributes: Partial<FormAttributes>) => void,
) => {
  if (!value) return

  const newForm = [...form]
  const currentForm = newForm[tab]

  if (!currentForm) return

  // Save essential properties
  const { id, prompt, image } = currentForm

  // Replace the form at the specified tab based on type
  switch (value) {
    case 'short':
      newForm[tab] = {
        id,
        prompt,
        type: 'short', // Literal type is important
        image,
      } as ShortForm
      break

    case 'paragraph':
      newForm[tab] = {
        id,
        prompt,
        type: 'paragraph', // Literal type is important
        image,
      } as ParagraphForm
      break

    case 'date':
      newForm[tab] = {
        id,
        prompt,
        type: 'date', // Literal type is important
        image,
      } as DateForm
      break

    case 'time':
      newForm[tab] = {
        id,
        prompt,
        type: 'time', // Literal type is important
        image,
      } as TimeForm
      break

    case 'single':
      newForm[tab] = {
        id,
        prompt,
        type: 'single', // Literal type is important
        image,
        options: [{ optionId: uuidv4(), text: '', image: '' }],
      } as SingleForm
      break

    case 'multiple':
      newForm[tab] = {
        id,
        prompt,
        type: 'multiple', // Literal type is important
        image,
        options: [{ optionId: uuidv4(), text: '', image: '' }],
      } as MultipleForm
      break

    case 'linear':
      newForm[tab] = {
        id,
        prompt,
        type: 'linear', // Literal type is important
        image,
        start: '0',
        end: '5',
      } as LinearForm
      break

    case 'multigrid':
      newForm[tab] = {
        id,
        prompt,
        type: 'multigrid', // Literal type is important
        image,
        rows: [{ rowId: uuidv4(), text: '' }],
        columns: [{ columnId: uuidv4(), text: '' }],
      } as MultiGridForm
      break

    case 'multigridcheck':
      newForm[tab] = {
        id,
        prompt,
        type: 'multigridcheck', // Literal type is important
        image,
        rows: [{ rowId: uuidv4(), text: '' }],
        columns: [{ columnId: uuidv4(), text: '' }],
      } as MultiGridCheckForm
      break
  }

  setForm(newForm)
  updateAttributes({ form: newForm })
}

const types = [
  { value: 'short', label: 'Короткий ответ' },
  { value: 'paragraph', label: 'Длинный ответ' },
  { value: 'single', label: 'Один из списка' },
  { value: 'multiple', label: 'Несколько из списка' },
  { value: 'date', label: 'Дата' },
  { value: 'time', label: 'Время' },
  { value: 'linear', label: 'Шкала' },
  { value: 'multigrid', label: 'Сетка' },
  { value: 'multigridcheck', label: 'Сетка с чекбоксами' },
]
