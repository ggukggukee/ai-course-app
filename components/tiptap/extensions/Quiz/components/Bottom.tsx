import { Button } from '@/components/ui/button'
import { QuizType } from '../Quiz'

export default function Bottom({
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
  const handleDeleteQuestion = () => {
    const deletingTab = tab
    if (tab === quiz.length - 1) {
      setTab(tab - 1)
    }
    const newQuiz = [...quiz]
    newQuiz.splice(deletingTab, 1)
    setQuiz(newQuiz)
    updateAttributes({ quiz: newQuiz })
  }

  const handleAddOption = () => {
    const newQuiz = [...quiz]
    if (newQuiz[tab].writable) return
    newQuiz[tab].options.push({ text: '', isCorrect: false })
    setQuiz(newQuiz)
    updateAttributes({ quiz: newQuiz })
  }

  if (quiz[tab].writable) return null

  return (
    <div className="flex items-center gap-3 justify-between">
      <Button size="sm" type="button" variant="outline" onClick={() => handleAddOption()}>
        Добавить вариант
      </Button>
      {quiz.length > 1 ? (
        <Button size="sm" type="button" variant="destructive" onClick={() => handleDeleteQuestion()}>
          Удалить вопрос
        </Button>
      ) : null}
    </div>
  )
}
