import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import HideView from './HideView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    hide: {
      setHide: (attributes: { title: string }) => ReturnType
    }
  }
}

export const Hide = Node.create({
  name: 'hide',

  group: 'block',

  content: 'block*',

  allowGapCursor: true,

  draggable: true,

  parseHTML() {
    return [{ tag: 'hide' }]
  },

  addAttributes() {
    return {
      title: {
        default: 'Решение',
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => {
          return {
            'data-title': attributes.title,
          }
        },
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['hide', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(HideView)
  },

  addCommands() {
    return {
      setHide:
        options =>
        ({ commands }) => {
          const initialText = {
            type: 'paragraph',
            content: [{ type: 'text', text: 'wrappable content' }],
          }
          return commands.insertContent({
            type: this.name,
            content: [initialText],
            attrs: options,
          })
        },
    }
  },
})

export default Hide
