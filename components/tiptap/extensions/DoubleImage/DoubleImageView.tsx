import { Button } from "@/components/ui/button";
import { useUpload } from "../../hooks/useUpload";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";
import { Pen } from "lucide-react";
import { useCallback, useRef } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { cn } from "@/lib/utils";

interface EditorProps {
  solid?: boolean;
}

interface DoubleImageViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string | string[]>) => void;
}

const DoubleImageView = (props: DoubleImageViewProps) => {
  const editRef1 = useRef<HTMLInputElement>(null);
  const editRef2 = useRef<HTMLInputElement>(null);

  const { node, editor, updateAttributes } = props as DoubleImageViewProps & {
    node: Node & {
      attrs: {
        images: string[];
        width: string;
      };
    };
  };

  const { loading, uploadFile } = useUpload();

  const handleEdit1 = useCallback(() => {
    editRef1.current?.click();
  }, []);

  const handleEdit2 = useCallback(() => {
    editRef2.current?.click();
  }, []);

  const onImageChange1 = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length === 0) return;
      if (node.attrs.images.length === 0) return;

      const file = files[0];
      const reader = new FileReader();

      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const fileData = event.target?.result;
        if (!fileData) return;
        if (!(fileData instanceof ArrayBuffer)) return;

        const url = await uploadFile(files[0], fileData);
        if (!url) return;
        const newArr = [...node.attrs.images];
        newArr[0] = url;
        updateAttributes({ images: newArr });
      };

      reader.readAsArrayBuffer(file);
    },
    [uploadFile, node.attrs.images, updateAttributes]
  );

  const onImageChange2 = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length === 0) return;
      if (node.attrs.images.length !== 2) return;

      const file = files[0];
      const reader = new FileReader();

      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const fileData = event.target?.result;
        if (!fileData) return;
        if (!(fileData instanceof ArrayBuffer)) return;

        const url = await uploadFile(files[0], fileData);
        if (!url) return;
        const newArr = [...node.attrs.images];
        newArr[1] = url;
        updateAttributes({ images: newArr });
      };

      reader.readAsArrayBuffer(file);
    },
    [uploadFile, node.attrs.images, updateAttributes]
  );

  const solid = (editor.options.editorProps as EditorProps)?.solid || false;
  const editable = editor.options.editable;

  const wrapperClassName = cn(
    node.attrs.align === "left" ? "ml-0" : "ml-auto",
    node.attrs.align === "right" ? "mr-0" : "mr-auto",
    node.attrs.align === "center" && "mx-auto",
    solid && !editable ? "!rounded-none !border-none" : "rounded-lg",
    "flex relative rounded-lg overflow-hidden"
  );

  if (editor.options.editable) {
    return (
      <NodeViewWrapper
        style={{ width: node.attrs.width || "100%" }}
        className={wrapperClassName}
      >
        {node.attrs.images.length > 0 && (
          <Button
            size='icon'
            variant='secondary'
            className='absolute z-10 top-2 right-2 rounded-full h-8 w-8'
            onClick={handleEdit2}
            disabled={loading}
          >
            <Pen className='w-4 h-4' />
          </Button>
        )}
        {node.attrs.images.length > 1 && (
          <Button
            size='icon'
            variant='secondary'
            className='absolute z-10 top-2 right-11 rounded-full h-8 w-8'
            onClick={handleEdit1}
            disabled={loading}
          >
            <Pen className='w-4 h-4' />
          </Button>
        )}
        <div
          className={`w-full pointer-events-none ${solid && !editable ? "rounded-none!" : "rounded-lg"
            }`}
        >
          <ReactCompareSlider
            handle={
              <ReactCompareSliderHandle
                buttonStyle={{ background: "#4094d4", border: 0 }}
                linesStyle={{ width: 0 }}
              />
            }
            itemOne={
              <ReactCompareSliderImage src={node.attrs.images[0]} alt='#' />
            }
            itemTwo={
              <ReactCompareSliderImage src={node.attrs.images[1]} alt='#' />
            }
            disabled
          />
        </div>
        <input
          className='w-0 h-0 overflow-hidden opacity-0'
          ref={editRef1}
          type='file'
          accept='.jpg,.jpeg,.png,.webp,.gif'
          onChange={onImageChange1}
        />
        <input
          className='w-0 h-0 overflow-hidden opacity-0'
          ref={editRef2}
          type='file'
          accept='.jpg,.jpeg,.png,.webp,.gif'
          onChange={onImageChange2}
        />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      style={{ width: node.attrs.width || "100%" }}
      className={wrapperClassName}
    >
      <div
        className={`w-full ${solid && !editable ? "rounded-none!" : "rounded-lg"
          }`}
      >
        <ReactCompareSlider
          handle={
            <ReactCompareSliderHandle
              buttonStyle={{ background: "#4094d4", border: 0 }}
              linesStyle={{ width: 0 }}
            />
          }
          itemOne={
            <ReactCompareSliderImage src={node.attrs.images[0]} alt='#' />
          }
          itemTwo={
            <ReactCompareSliderImage src={node.attrs.images[1]} alt='#' />
          }
        />
      </div>
    </NodeViewWrapper>
  );
};

export default DoubleImageView;
