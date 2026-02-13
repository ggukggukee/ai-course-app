import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Editor, NodeViewWrapper } from '@tiptap/react'
import { RotateCcw } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { Node } from '@tiptap/pm/model'

interface IframeViewProps {
  editor: Editor
  getPos: () => number
  node: Node
}

const IframeView = (props: IframeViewProps) => {
  const { editor, getPos, node } = props
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

  if (!editor.options.editable) {
    return <NewIframe node={node} />
  }

  return (
    <NodeViewWrapper>
      <div className={wrapperClassName} style={{ width: node.attrs.width }}>
        <div contentEditable={false} ref={imageWrapperRef}>
          <iframe
            className="block w-full aspect-video rounded-lg"
            src={src}
            title="iframe"
            onClick={onClick}
            allowFullScreen
          />
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export default IframeView

const NewIframe = ({ node }: { node: Node }) => {
  const [src, setSrc] = useState<string>(node.attrs.src)

  const wrapperClassName = cn(
    node.attrs.align === 'left' ? 'ml-0' : 'ml-auto',
    node.attrs.align === 'right' ? 'mr-0' : 'mr-auto',
    node.attrs.align === 'center' && 'mx-auto',
  )

  const handleUpdate = useCallback(() => {
    setSrc(prev => (prev.includes('?') ? `${prev}&_t=${Date.now()}` : `${prev}?_t=${Date.now()}`))
  }, [])

  return (
    <NodeViewWrapper>
      <div className={wrapperClassName} style={{ width: node.attrs.width, position: 'relative' }}>
        <div contentEditable={false}>
          <iframe className="block w-full aspect-video rounded-lg" src={src} title="iframe" allowFullScreen />
        </div>
        <Button
          size="icon"
          type="button"
          variant="secondary"
          className="z-10 absolute top-2 right-2 rounded-full h-8 w-8"
          onClick={handleUpdate}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </NodeViewWrapper>
  )
}
