import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import QuizView from './QuizView'

export type SelectableOption = {
  text: string
  isCorrect: boolean
  selected?: boolean
  image?: string
}

export type WritableOption = {
  proper: string
  response: string
  image?: string
}

export type QuizType =
  | {
      prompt: string
      writable: false
      options: SelectableOption[]
      image?: string
      isCorrect?: boolean
    }
  | {
      prompt: string
      writable: true
      options: WritableOption[]
      image?: string
      isCorrect?: boolean
    }

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    quiz: {
      setQuiz: () => ReturnType
    }
  }
}

export const Quiz = Node.create({
  name: 'quiz',

  group: 'block',

  allowGapCursor: true,

  parseHTML() {
    return [
      {
        tag: 'quiz',
      },
    ]
  },

  addAttributes() {
    return {
      quiz: {
        default: [
          {
            prompt: '',
            writable: false,
            options: [{ text: '', isCorrect: false }],
          },
        ],
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['quiz', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(QuizView)
  },

  addCommands() {
    return {
      setQuiz:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              quiz: [
                {
                  prompt: '',
                  writable: false,
                  options: [{ text: '', isCorrect: false }],
                },
              ],
            },
          })
        },
    }
  },
})

export default Quiz
