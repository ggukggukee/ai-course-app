import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { QuizType } from '../Quiz'

export default function Middle({
  setQuiz,
  quiz,
  tab,
  updateAttributes,
}: {
  setQuiz: (quiz: QuizType[]) => void
  quiz: QuizType[]
  tab: number
  updateAttributes: (attributes: { quiz: QuizType[] }) => void
}) {
  const handlePrompt = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newQuiz = [...quiz]
    newQuiz[i].prompt = e.target.value
    setQuiz(newQuiz)
    updateAttributes({ quiz: newQuiz })
  }

  const handleWritable = (checked: boolean, i: number) => {
    const isChange = confirm('Вы точно хотите изменить?')
    if (!isChange) return

    const newQuiz = [...quiz]
    newQuiz[i].writable = checked
    if (checked) {
      newQuiz[i].options = [{ proper: '', response: '' }]
    } else {
      newQuiz[i].options = [{ text: '', isCorrect: false }]
    }
    setQuiz(newQuiz)
    updateAttributes({ quiz: newQuiz })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Label>Вопрос</Label>
        <Input
          placeholder="Напишите вопрос..."
          className="w-full"
          value={quiz[tab]?.prompt}
          onChange={e => handlePrompt(e, tab)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`isWritable-${tab}`}
          checked={quiz[tab]?.writable}
          onCheckedChange={e => handleWritable(e as boolean, tab)}
        />
        <div className="space-y-1 leading-none">
          <Label htmlFor={`isWritable-${tab}`}>Инпут</Label>
        </div>
      </div>
    </div>
  )
}
