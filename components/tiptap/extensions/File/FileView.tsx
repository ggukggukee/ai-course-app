import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { AudioLinesIcon, FileDownIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Node } from "@tiptap/pm/model";

interface FileViewProps {
  node: Node;
  updateAttributes: (
    attributes: Record<string, string | boolean | number>
  ) => void;
  editor: Editor;
}

const FileView = (props: FileViewProps) => {
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);

  const { node, updateAttributes, editor } = props as FileViewProps & {
    node: Node & {
      attrs: {
        src: string;
        name: string;
        text: string;
      };
    };
  };

  const handleDownload = useCallback(
    (filename: string) => {
      setClicked(true);
      fetch(node.attrs.src)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          if (!filename) {
            link.download = node.attrs.src.split("/").pop() || "";
          } else {
            if (filename.split(".").length === 1) {
              const ext = node.attrs.src.split(".").pop();
              link.download = filename + "." + ext;
            }
            if (filename.split(".").length > 1) {
              link.download = filename;
            }
          }
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          setClicked(false);
        })
        .catch((error) => {
          setClicked(false);
          toast.error("Ошибка загрузки файла");
          console.log(error);
        });
    },
    [node.attrs.src]
  );

  const handleChangeName = useCallback(() => {
    if (!editor.options.editable) return;
    const name = window.prompt("Введите название", node.attrs.name || "");
    if (name === null) return;
    if (name === "") {
      updateAttributes({ name: "" });
    } else {
      updateAttributes({ name: name });
    }
  }, [updateAttributes, node.attrs.name, editor.options.editable]);

  const extension = node.attrs.src.split(".").pop() || "";

  if (audioExtensions.includes(extension)) {
    return (
      <NodeViewWrapper>
        <div
          contentEditable={false}
          className='space-y-2 w-full border p-3 rounded-lg'
        >
          <Button
            variant='link'
            type='button'
            onClick={() => handleChangeName()}
            className='text-sm p-0 h-auto font-normal hover:no-underline'
          >
            {node.attrs.name || getFileName(node.attrs.src)}
          </Button>
          <div className='flex items-center gap-2 group/item'>
            <div className='flex items-center justify-center border rounded-full h-8 w-8 p-0'>
              <AudioLinesIcon className='w-4 h-4' />
            </div>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio controls className='w-full' src={node.attrs.src} />
          </div>
          {(editor.options.editable || node.attrs.text) && (
            <Button
              className='flex items-center justify-center border rounded-full text-xs h-7'
              variant='outline'
              size='sm'
              type='button'
              onClick={() => setShow(!show)}
            >
              Текст
            </Button>
          )}
          {!editor.options.editable && node.attrs.text && show && (
            <div className='text-sm whitespace-pre-line border rounded-lg p-2'>
              {node.attrs.text || "Текст к аудио"}
            </div>
          )}
          {editor.options.editable && show && (
            <Textarea
              value={node.attrs.text}
              onChange={(e) => updateAttributes({ text: e.target.value })}
            />
          )}
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <div
        contentEditable={false}
        className='space-y-2 w-full border p-3 rounded-lg'
      >
        <Button
          variant='link'
          type='button'
          onClick={() => handleChangeName()}
          className='text-sm p-0 h-auto font-normal hover:no-underline'
        >
          {node.attrs.name || getFileName(node.attrs.src)}
        </Button>
        <div className='flex items-center gap-2 group/item'>
          <div className='flex items-center justify-center border rounded-full h-8 w-8 p-0'>
            <FileDownIcon className='w-4 h-4' />
          </div>
          <div className='text-xs'>
            <div className='flex items-center gap-1.5'>
              <Button
                variant='link'
                className='p-0 h-auto'
                type='button'
                onClick={() => handleDownload(node.attrs.name)}
              >
                {clicked ? "Загрузка..." : "Скачать"}
              </Button>
            </div>
            <div className='text-muted-foreground'>
              Файл{" "}
              {extension === "" ? "Без расширения" : extension.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default FileView;

const getFileName = (url: string) => {
  if (!url) return "Без ссылки";

  const name = url.split("/").pop();
  if (!name) return "Неправильная ссылка";

  if (name.includes("-timestamp")) {
    return name.split("-timestamp")[0] + "." + name.split(".").pop();
  }

  if (name.slice(13, 14) === "_") {
    return decodeURIComponent(name.slice(14));
  }

  return decodeURIComponent(name);
};

// array of all audio extensions
const audioExtensions = [
  "mp3",
  "wav",
  "ogg",
  "m4a",
  "flac",
  "aac",
  "wma",
  "aiff",
  "alac",
  "ape",
  "aif",
  "au",
];
