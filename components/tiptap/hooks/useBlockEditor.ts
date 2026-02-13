"use client";

import { useEditor } from "@tiptap/react";
import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";
import { ExtensionKit } from "../extensions/extension-kit";
import { initialContent } from "../lib/data/initialContent";
import { FormWithAnswers } from "../extensions/Form/types";
import { useEffect } from "react";

interface CustomEditorProps {
  attributes?: {
    autocomplete: string;
    autocorrect: string;
    autocapitalize: string;
    class: string;
  };
  forms?: FormWithAnswers[];
  formUrl?: string;
  upid?: number;
  solid?: boolean;
}

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  content,
  editable = true,
  solid = false,
  forms,
  formUrl,
  upid,
  ...editorOptions
}: {
  content?: string;
  editable?: boolean;
  solid?: boolean;
  forms?: FormWithAnswers[];
  formUrl?: string;
  upid?: number;
} & Partial<Omit<EditorOptions, "extensions">>) => {
  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      editable,
      onCreate: (ctx) => {
        if (content) {
          ctx.editor.commands.setContent(content);
        } else if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent);
          ctx.editor.commands.focus("start", { scrollIntoView: true });
        }
      },
      extensions: [...ExtensionKit()].filter(
        (e): e is AnyExtension => e !== undefined,
      ),
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: `min-h-full ${
            editable ? "editable border rounded-lg" : "!p-0"
          } ${solid && !editable ? "!p-0" : ""}`,
        },
        forms,
        formUrl,
        upid,
        solid: solid ?? false,
      } as CustomEditorProps,
    },
    [],
  );

  // Update for JSON content
  useEffect(() => {
    if (editor && content) {
      try {
        // For JSON content, we need to compare differently
        const currentContent = editor.getJSON();

        // Only update if content is different (deep comparison for JSON)
        if (JSON.stringify(currentContent) !== JSON.stringify(content)) {
          editor.commands.setContent(content, false);
        }
      } catch (error) {
        console.error("Error updating editor content:", error);
        // Fallback: just set the content anyway
        editor.commands.setContent(content, false);
      }
    }
  }, [editor, content]);

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  return { editor };
};
