import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import DoubleImageView from "./DoubleImageView";

interface EditorProps {
  solid?: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    double: {
      setDouble: (attributes: { images: string[] }) => ReturnType;
      setDoubleWidth: (width: number) => ReturnType;
      setDoubleAlign: (align: "left" | "right" | "center") => ReturnType;
    };
  }
}

export const DoubleImage = Node.create({
  name: "double",

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
    return [
      {
        tag: "double",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["double", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    const solid = (this.editor.options.editorProps as EditorProps)?.solid;
    const editable = this.editor.options.editable;
    return ReactNodeViewRenderer(DoubleImageView, {
      className: solid && !editable ? "!my-0" : "",
    });
  },

  addCommands() {
    return {
      setDouble:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name, attrs: options });
        },
      setDoubleWidth:
        (width) =>
        ({ commands }) =>
          commands.updateAttributes("double", {
            width: `${Math.max(0, Math.min(100, width))}%`,
          }),
      setDoubleAlign:
        (align) =>
        ({ commands }) =>
          commands.updateAttributes("double", { align }),
    };
  },
});

export default DoubleImage;
