import { Node, ReactNodeViewRenderer } from '@tiptap/react'
import VideoView from './VideoView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (attributes: { src: string }) => ReturnType
    }
  }
}

export const Video = Node.create({
  name: 'vid',

  group: 'block',

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: el => el.getAttribute('src'),
        renderHTML: attrs => ({ src: attrs.src }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
        getAttrs: el => ({ src: el.getAttribute('src') }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', { controls: 'true', style: 'width: 100%', ...HTMLAttributes }, ['source', HTMLAttributes]]
  },

  addCommands() {
    return {
      setVideo:
        src =>
        ({ commands }) =>
          commands.insertContent(`<video controls="true" style="width: 100%" src="${src}" />`),
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoView)
  },
})
