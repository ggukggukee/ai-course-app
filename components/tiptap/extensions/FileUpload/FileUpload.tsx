import { Node, ReactNodeViewRenderer } from '@tiptap/react'
import { ImageUpload } from '../ImageUpload/view/ImageUpload'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fileUpload: {
      setFileUpload: () => ReturnType
    }
  }
}

export const FileUpload = Node.create({
  name: 'fileUpload',

  isolating: true,

  defining: true,

  group: 'block',

  draggable: true,

  selectable: true,

  inline: false,

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ]
  },

  renderHTML() {
    return ['div', { 'data-type': this.name }]
  },

  addCommands() {
    return {
      setFileUpload:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUpload)
  },
})

export default FileUpload
