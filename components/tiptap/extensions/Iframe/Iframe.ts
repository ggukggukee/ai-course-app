import { mergeAttributes, Node } from '@tiptap/core'

import { ReactNodeViewRenderer } from '@tiptap/react'
import IframeView from './IframeView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframe: {
      setIframe: (attributes: { src: string }) => ReturnType
      setIframeAlign: (align: 'left' | 'center' | 'right') => ReturnType
      setIframeWidth: (width: number) => ReturnType
    }
  }
}

export const Iframe = Node.create({
  name: 'iframe',

  group: 'block',

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: '',
      },
      width: {
        default: '100%',
      },
      align: {
        default: 'center',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-iframe] iframe' }]
  },

  addCommands() {
    return {
      setIframe:
        options =>
        ({ commands }) => {
          if (!validURL(options.src)) {
            return false
          }

          return commands.insertContent({ type: this.name, attrs: options })
        },

      setIframeAlign:
        align =>
        ({ commands }) =>
          commands.updateAttributes('iframe', { align }),

      setIframeWidth:
        width =>
        ({ commands }) =>
          commands.updateAttributes('iframe', {
            width: `${Math.max(0, Math.min(100, width))}%`,
          }),
    }
  },

  renderHTML() {
    return ['div', { 'data-iframe': '' }, ['iframe', mergeAttributes(this.options.HTMLAttributes)]]
  },

  addNodeView() {
    return ReactNodeViewRenderer(IframeView)
  },
})

function validURL(str: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ) // fragment locator

  return !!pattern.test(str)
}
