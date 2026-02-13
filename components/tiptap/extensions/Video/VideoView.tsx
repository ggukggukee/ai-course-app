import { cn } from '@/lib/utils'
import { Editor, NodeViewWrapper } from '@tiptap/react'
import { useRef, useCallback } from 'react'
import { Node } from '@tiptap/pm/model'

interface VideoViewProps {
  editor: Editor
  getPos: () => number
  node: Node
  updateAttributes: (attrs: Record<string, string>) => void
}

export const VideoView = (props: VideoViewProps) => {
  const { editor, getPos, node } = props as VideoViewProps & {
    node: Node & {
      attrs: {
        src: string
      }
    }
  }
  const imageWrapperRef = useRef(null)
  const { src } = node.attrs

  const wrapperClassName = cn(
    node.attrs.align === 'left' ? 'ml-0' : 'ml-auto',
    node.attrs.align === 'right' ? 'mr-0' : 'mr-auto',
    node.attrs.align === 'center' && 'mx-auto',
  )

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos())
  }, [getPos, editor.commands])

  return (
    <NodeViewWrapper>
      <div className={wrapperClassName} style={{ width: '100%' }}>
        <div contentEditable={false} ref={imageWrapperRef}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video controls={true} className="block w-full" src={src} onClick={onClick} />
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export default VideoView
