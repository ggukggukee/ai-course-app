import { ReactNodeViewRenderer, Node } from '@tiptap/react'
import { mergeAttributes } from '@tiptap/core'
import FileView from './FileView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    file: {
      setFile: (attributes: { src: string }) => ReturnType
    }
  }
}

export const File = Node.create({
  name: 'file',

  group: 'block',

  allowGapCursor: true,

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: '',
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attributes => ({
          src: attributes.src,
        }),
      },
      name: {
        default: '',
        parseHTML: element => element.getAttribute('name'),
        renderHTML: attributes => ({
          name: attributes.name,
        }),
      },
      text: {
        default: '',
        parseHTML: element => element.getAttribute('text'),
        renderHTML: attributes => ({
          text: attributes.text,
        }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'file' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['file', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileView)
  },

  addCommands() {
    return {
      setFile:
        attrs =>
        ({ commands }) => {
          return commands.insertContent({
            type: 'file',
            attrs: { src: attrs.src },
          })
        },
    }
  },
})
