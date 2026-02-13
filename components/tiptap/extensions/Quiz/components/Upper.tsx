import { Button } from '@/components/ui/button'
import { QuizType } from '../Quiz'

export default function Upper({
  setQuiz,
  quiz,
  setTab,
  tab,
  updateAttributes,
}: {
  setQuiz: (quiz: QuizType[]) => void
  quiz: QuizType[]
  setTab: (tab: number) => void
  tab: number
  updateAttributes: (attributes: { quiz: QuizType[] }) => void
}) {
  const handleAddQuestion = () => {
    const newQuiz = [...quiz]
    newQuiz.push({
      prompt: '',
      writable: false,
      options: [{ text: '', isCorrect: false }],
    })
    setQuiz(newQuiz)
    updateAttributes({ quiz: newQuiz })
  }

  const handleClickTab = (i: number) => setTab(i)

  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
      {quiz.map((_, i) => (
        <Button
          key={i}
          size="sm"
          type="button"
          variant="outline"
          className={`shrink-0 ${tab === i ? 'border-primary' : ''}`}
          onClick={() => handleClickTab(i)}
        >
          {tab === i ? `Вопрос ${i + 1}` : i + 1}
        </Button>
      ))}
      <Button
        size="sm"
        type="button"
        variant="ghost"
        onClick={() => handleAddQuestion()}
        className="shrink-0 text-muted-foreground"
      >
        Добавить вопрос
      </Button>
    </div>
  )
}
