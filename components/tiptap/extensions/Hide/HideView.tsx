import { Pen } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import { Editor, NodeViewContent } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { NodeViewWrapper } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { Node } from '@tiptap/pm/model'

interface HideViewProps {
  node: Node
  editor: Editor
  updateAttributes: (attributes: Record<string, string>) => void
}

const HideView = (props: HideViewProps) => {
  const { node, editor, updateAttributes } = props
  const [isHidden, setIsHidden] = useState(true)

  function handleEdit() {
    const title = prompt('Введите заголовок', node.attrs.title || '')
    if (!title) return
    updateAttributes({ title })
  }

  useEffect(() => {
    if (!editor.options.editable) return
    const hide = node.content.content.find(n => n.type.name === 'hide')
    if (hide) editor.commands.undo()
  }, [node.content, editor])

  return (
    <NodeViewWrapper className="bg-accent rounded-xl p-3 md:p-5 space-y-5">
      <div className="flex justify-between items-center gap-2" contentEditable={false}>
        <Button type="button" onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          {node.attrs.title || 'Решение'}
        </Button>
        {editor.options.editable && (
          <Button type="button" variant="ghost" size="sm" onClick={handleEdit}>
            <Pen className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Content editable={editor.options.editable} isHidden={isHidden} />
    </NodeViewWrapper>
  )
}

export default HideView

const Content = ({ editable, isHidden }: { editable: boolean; isHidden: boolean }) => {
  if (isHidden) return null

  if (!editable) {
    return <NodeViewContent />
  }

  return (
    <div className="border rounded-xl p-3">
      <NodeViewContent className="hide-component-content" />
    </div>
  )
}
