import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react'
import DndView from './DndView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    dnd: {
      setDnd: (attributes: {
        items: {
          text: string
          direction: string
          question: { id: string; content: string }[]
          answer: { id: string; content: string }[]
        }
      }) => ReturnType
    }
  }
}

export const Dnd = Node.create({
  name: 'dnd',

  group: 'block',

  allowGapCursor: true,

  draggable: true,

  addAttributes() {
    return {
      items: {
        default: {
          text: '',
          direction: 'horizontal',
          question: [],
          answer: [],
        },
      },
    }
  },

  parseHTML() {
    return [{ tag: 'dnd' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['dnd', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(DndView)
  },

  addCommands() {
    return {
      setDnd:
        options =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name, attrs: options })
        },
    }
  },
})
