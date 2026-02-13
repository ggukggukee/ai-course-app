import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageCarouselView from "./ImageCarouselView";

interface EditorProps {
  solid?: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    carousel: {
      setCarousel: (attributes: { images: string[] }) => ReturnType;
      setCarouselWidth: (width: number) => ReturnType;
      setCarouselAlign: (align: "left" | "center" | "right") => ReturnType;
    };
  }
}

export const ImageCarousel = Node.create({
  name: "carousel",

  group: "block",

  allowGapCursor: true,

  draggable: true,

  addAttributes() {
    return {
      images: {
        default: [],
      },
      width: {
        default: "100%",
      },
      align: {
        default: "center",
      },
    };
  },

  parseHTML() {
    return [{ tag: "carousel" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["carousel", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    const solid = (this.editor.options.editorProps as EditorProps)?.solid;
    const editable = this.editor.options.editable;
    return ReactNodeViewRenderer(ImageCarouselView, {
      className: solid && !editable ? "!my-0" : "",
    });
  },

  addCommands() {
    return {
      setCarousel:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { images: attrs.images },
          });
        },
      setCarouselWidth:
        (width) =>
        ({ commands }) =>
          commands.updateAttributes("carousel", {
            width: `${Math.max(0, Math.min(100, width))}%`,
          }),
      setCarouselAlign:
        (align) =>
        ({ commands }) =>
          commands.updateAttributes("carousel", { align }),
    };
  },
});

export default ImageCarousel;
