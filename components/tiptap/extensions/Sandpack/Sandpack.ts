import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react'
import SandpackView from './SandpackView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    sandpack: {
      setSandpack: (attributes: {
        template: string
        files: Record<string, { code: string; hidden: boolean; readOnly: boolean; active: boolean }>
      }) => ReturnType
    }
  }
}

export const Sandpack = Node.create({
  name: 'sandpack',

  group: 'block',

  atom: true,

  parseHTML() {
    return [
      {
        tag: 'sandpack',
      },
    ]
  },

  addAttributes() {
    return {
      template: {
        default: 'static',
      },
      files: {
        default: {},
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['sandpack', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SandpackView)
  },

  addCommands() {
    return {
      setSandpack:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})

export default Sandpack
