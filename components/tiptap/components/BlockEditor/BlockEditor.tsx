"use client";

import { EditorContent } from "@tiptap/react";
import React, { useCallback, useRef } from "react";
import { LinkMenu } from "../menus";
import { useBlockEditor } from "../../hooks/useBlockEditor";

import "../../styles/index.css";

import ImageBlockMenu from "../../extensions/ImageBlock/components/ImageBlockMenu";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import YoutubeMenu from "../../extensions/Youtube/YoutubeMenu";
import DoubleImageMenu from "../../extensions/DoubleImage/DoubleImageMenu";
import ImageCarouselMenu from "../../extensions/ImageCarousel/ImageCarouselMenu";
import IframeMenu from "../../extensions/Iframe/IframeMenu";
import { FormWithAnswers } from "../../extensions/Form/types";
import { ClipboardPaste, CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const BlockEditor = ({
  content,
  editable = true,
  solid = false,
  forms,
  formUrl,
  upid,
}: {
  content?: string;
  editable?: boolean;
  solid?: boolean;
  forms?: FormWithAnswers[];
  formUrl?: string;
  upid?: number;
}) => {
  const menuContainerRef = useRef(null);

  const { editor } = useBlockEditor({
    content,
    editable,
    solid,
    forms,
    formUrl,
    upid,
  });

  const pasteContent = useCallback(async () => {
    const confirm = window.confirm(
      "Вставка контента удалит текущий контент. Продолжить?"
    );

    if (!confirm || !editor || !editor.options.editable) return;

    try {
      const text = await navigator.clipboard.readText();

      if (!text) return toast.error("Текст не найден");

      const json = isJson(text);
      if (!json) {
        return toast.error("Это не контент урока");
      }

      const parsed = JSON.parse(text);

      if (!parsed.type || parsed.type !== "doc") {
        return toast.error("Это не контент урока");
      }

      editor.commands.setContent(parsed, true);
      toast.success("Готово");
    } catch (err) {
      console.log(err);
      toast.error("Ошибка при вставке текста");
    }
  }, [editor]);

  const copyContent = useCallback(async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Скопировано");
    } catch (error) {
      console.error(error);
      toast.error("Не удалось скопировать");
    }
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className='flex h-full' ref={menuContainerRef}>
      <div className='relative flex flex-col flex-1 h-full w-full'>
        <EditorContent editor={editor} className='flex-1' />
        {editor.options.editable && (
          <div className='ml-auto pt-4 flex items-center gap-1'>
            <Button
              variant='secondary'
              size='icon'
              className='text-muted-foreground w-8 h-8'
              onClick={() => copyContent(JSON.stringify(content))}
            >
              <CopyIcon className='w-4 h-4' />
            </Button>
            <Button
              variant='secondary'
              size='icon'
              className='text-muted-foreground w-8 h-8'
              onClick={() => pasteContent()}
            >
              <ClipboardPaste className='w-4 h-4' />
            </Button>
          </div>
        )}
        <ContentItemMenu editor={editor} isEditable={editable} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        <YoutubeMenu editor={editor} appendTo={menuContainerRef} />
        <DoubleImageMenu editor={editor} appendTo={menuContainerRef} />
        <ImageCarouselMenu editor={editor} appendTo={menuContainerRef} />
        <IframeMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

export default BlockEditor;

function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}
