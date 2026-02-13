import { useTheme } from "next-themes";
import { useState } from "react";
import { Sandpack, SandpackThemeProp } from "@codesandbox/sandpack-react";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Node } from "@tiptap/pm/model";

interface SandpackViewProps {
  node: Node;
  editor: Editor;
  selected: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateAttributes: (attributes: Record<string, any>) => void;
}

export default function SandpackView(props: SandpackViewProps) {
  const { node, editor, selected } = props;
  const { resolvedTheme } = useTheme();
  const [expand, setExpand] = useState(false);
  const [wrap, setWrap] = useState(false);

  const addFile = () => {
    const length = Object.keys(node.attrs.files).length;
    const key = `file${length + 1}`;
    props.updateAttributes({
      files: { ...node.attrs.files, [key]: { code: "", hidden: false } },
    });
  };

  const changeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = node.attrs.files[e.target.name];
    const keyValues = Object.entries(node.attrs.files);
    const index2 = keyValues.find((kv) => kv[0] === e.target.value);
    if (index2) return alert("Такое имя уже существует");
    const index = keyValues.findIndex((kv) => kv[0] === e.target.name);
    keyValues.splice(index, 0, [e.target.value, value]);
    const newFiles = Object.fromEntries(keyValues);
    delete newFiles[e.target.name];
    props.updateAttributes({ files: newFiles });
  };

  const changeFileCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    const file = node.attrs.files[key];
    props.updateAttributes({
      files: { ...node.attrs.files, [key]: { ...file, code: value } },
    });
  };

  const deleteFile = (index: number) => {
    const keyValues = Object.entries(node.attrs.files);
    keyValues.splice(index, 1);
    const newFiles = Object.fromEntries(keyValues);
    props.updateAttributes({ files: newFiles });
  };

  const changeHidden = (checked: string | boolean, key: string) => {
    const file = node.attrs.files[key];
    props.updateAttributes({
      files: { ...node.attrs.files, [key]: { ...file, hidden: checked } },
    });
  };

  const changeReadOnly = (checked: string | boolean, key: string) => {
    const file = node.attrs.files[key];
    props.updateAttributes({
      files: { ...node.attrs.files, [key]: { ...file, readOnly: checked } },
    });
  };

  const changeActive = (checked: string | boolean, key: string) => {
    const file = node.attrs.files[key];
    props.updateAttributes({
      files: { ...node.attrs.files, [key]: { ...file, active: checked } },
    });
  };

  const handleHeight = () => {
    setExpand(!expand);
  };

  const handleWrap = () => {
    setWrap(!wrap);
  };

  if (editor.options.editable) {
    return (
      <NodeViewWrapper
        className={`sandpack-component not-prose mt-6 rounded-lg ${
          selected && editor.options.editable && "ProseMirror-selectednode"
        }`}
        draggable='true'
        data-drag-handle
      >
        <div
          contentEditable={false}
          className='border rounded-lg p-4 space-y-5'
        >
          <p className=''>Template: {node.attrs.template}</p>
          {Object.keys(node.attrs.files)?.map((key, index) => (
            <div key={index} className='space-y-2'>
              <div className='flex justify-between items-center'>
                <Label>Файл {index + 1}</Label>
                {Object.keys(node.attrs.files)?.length > 1 ? (
                  <Label
                    onClick={() => deleteFile(index)}
                    className='text-muted-foreground hover:text-destructive cursor-pointer'
                  >
                    Удалить
                  </Label>
                ) : null}
              </div>
              <Input value={key} onChange={changeFileName} name={key} />
              <Textarea
                name={key}
                value={node.attrs.files[key]?.code}
                onChange={changeFileCode}
              />
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2 leading-none'>
                  <Checkbox
                    checked={node.attrs.files[key]?.hidden}
                    onCheckedChange={(c) => changeHidden(c, key)}
                  />
                  <Label htmlFor={`label-${key}`}>Скрыть</Label>
                </div>
                <div className='flex items-center gap-2 leading-none'>
                  <Checkbox
                    checked={node.attrs.files[key]?.readOnly}
                    onCheckedChange={(c) => changeReadOnly(c, key)}
                  />
                  <Label htmlFor={`label-${key}2`}>Только чтение</Label>
                </div>
                <div className='flex items-center gap-2 leading-none'>
                  <Checkbox
                    checked={node.attrs.files[key]?.active}
                    onCheckedChange={(c) => changeActive(c, key)}
                  />
                  <Label htmlFor={`label-${key}3`}>Активный</Label>
                </div>
              </div>
            </div>
          ))}
          <Button size='sm' variant='outline' onClick={addFile} type='button'>
            Добавить
          </Button>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      className={`sandpack-component not-prose mt-6 rounded-lg ${
        selected && editor.options.editable && "ProseMirror-selectednode"
      }`}
      draggable='true'
      data-drag-handle
    >
      <div contentEditable={false}>
        <Sandpack
          template={node.attrs.template}
          files={node.attrs.files}
          theme={resolvedTheme as SandpackThemeProp}
          options={{
            showConsoleButton: true,
            showInlineErrors: true,
            showLineNumbers: true,
            // showOpenInCodeSandbox: false,
            wrapContent: wrap === true,
            codeEditor: {
              extensions: [autocompletion()],
              extensionsKeymap: [...completionKeymap],
            },
            classes: {
              "sp-editor": expand ? "!h-full" : "",
              "sp-stack": expand ? "!h-auto" : "",
            },
          }}
        />
        <div className='flex gap-3 pt-1'>
          <Button
            variant='ghost'
            className='p-0 h-full'
            onClick={() => handleHeight()}
            type='button'
            size='sm'
          >
            {expand ? "Свернуть" : "Развернуть"}
          </Button>
          <Button
            variant='ghost'
            className='p-0 h-full'
            onClick={() => handleWrap()}
            type='button'
            size='sm'
          >
            {wrap ? "Отключить перенос" : "Включить перенос"}
          </Button>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
