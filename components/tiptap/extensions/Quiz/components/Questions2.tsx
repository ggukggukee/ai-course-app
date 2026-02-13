import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Variant from './Variant'
import { QuizType } from '../Quiz'

export default function Questions2({
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
  const handleWritableProper = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number) => {
    const newQuiz = [...quiz]
    if (!newQuiz[i].writable) return
    newQuiz[i].options[j].proper = e.target.value
    setQuiz(newQuiz)
    updateAttributes({ quiz: newQuiz })
  }

  if (quiz[tab]?.writable) {
    return (
      <div className="space-y-2">
        <Label>Правильный ответ</Label>
        <div className="flex justify-center items-center">
          {quiz[tab]?.options.map((o, j) => (
            <div className="space-y-1 w-full" key={j}>
              <Input
                placeholder="Напишите ответ..."
                className="w-full"
                value={o.proper}
                onChange={e => handleWritableProper(e, tab, j)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label>Варианты</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quiz[tab]?.options.map((o, j) => (
          <Variant key={j} o={o} j={j} tab={tab} quiz={quiz} updateAttributes={updateAttributes} setQuiz={setQuiz} />
        ))}
      </div>
    </div>
  )
}
