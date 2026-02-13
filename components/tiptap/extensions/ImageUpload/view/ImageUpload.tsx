import { Editor, NodeViewWrapper } from '@tiptap/react'
import { useCallback } from 'react'
import { Node } from '@tiptap/pm/model'

import { ImageUploader } from './ImageUploader'

export const ImageUpload = ({ getPos, editor, node }: { getPos: () => number; editor: Editor; node: Node }) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        if (node.type.name === 'fileUpload') {
          editor.chain().setFile({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run()
        }

        if (node.type.name === 'doubleUpload') {
          editor
            .chain()
            .setDouble({ images: [url, url] })
            .deleteRange({ from: getPos(), to: getPos() })
            .focus()
            .run()
        }

        if (node.type.name === 'carouselUpload') {
          editor
            .chain()
            .setCarousel({ images: [url] })
            .deleteRange({ from: getPos(), to: getPos() })
            .focus()
            .run()
        }

        if (node.type.name === 'imageUpload') {
          editor.chain().setImageBlock({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run()
        }
      }
    },
    [getPos, editor, node.type.name],
  )

  return (
    <NodeViewWrapper>
      <div className="p-0 m-0" data-drag-handle>
        <ImageUploader onUpload={onUpload} extension={node.type.name} />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageUpload
