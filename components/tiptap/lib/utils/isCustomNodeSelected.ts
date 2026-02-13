import { Editor } from "@tiptap/react";

import {
  HorizontalRule,
  ImageBlock,
  Link,
  CodeBlock,
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
} from "../../extensions";

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-column.selected");
  const gripRow =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-row.selected");

  if (gripColumn || gripRow) {
    return true;
  }

  return false;
};

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    HorizontalRule.name,
    ImageBlock.name,
    CodeBlock.name,
    ImageBlock.name,
    Link.name,
    Youtube.name,
    DoubleImage.name,
    ImageCarousel.name,
    Hide.name,
    Iframe.name,
    Sandpack.name,
    File.name,
    Video.name,
    Dnd.name,
    Quiz.name,
    Form.name,
    ImageUpload.name,
    FileUpload.name,
    CarouselUpload.name,
    DoubleUpload.name,
  ];

  return (
    customNodes.some((type) => editor.isActive(type)) ||
    isTableGripSelected(node)
  );
};

export default isCustomNodeSelected;
