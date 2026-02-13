"use client";

import {
  CodeBlock,
  Color,
  Focus,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  TextAlign,
  TextStyle,
  TrailingNode,
  Underline,
  TaskItem,
  TaskList,
  Youtube,
  DoubleImage,
  ImageCarousel,
  Hide,
  Iframe,
  Sandpack,
  File,
  Video,
  Dnd,
  Quiz,
  Form,
  ImageUpload,
  FileUpload,
  CarouselUpload,
  DoubleUpload,
} from ".";

export const ExtensionKit = () => [
  TaskList,
  TaskItem.configure({
    nested: true,
    onReadOnlyChecked: () => true,
  }),
  Selection,
  HorizontalRule,
  StarterKit.configure({
    dropcursor: {
      width: 2,
      class: "ProseMirror-dropcursor border-black",
    },
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-2 italic pl-4",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "!rounded !bg-muted !text-primary !px-[0.3rem] !py-[0.2rem] !shadow-none",
      },
    },
    horizontalRule: false,
    codeBlock: false,
  }),
  CodeBlock,
  TextStyle,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  ImageBlock,
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Subscript,
  Superscript,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => "",
  }),
  SlashCommand,
  Focus,
  Youtube,
  DoubleImage,
  ImageCarousel,
  Hide,
  Iframe,
  Sandpack,
  File,
  Video,
  Dnd,
  Quiz,
  Form,
  ImageUpload,
  DoubleUpload,
  FileUpload,
  CarouselUpload,
];

export default ExtensionKit;
