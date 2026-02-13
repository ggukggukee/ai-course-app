import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { v4 as uuidv4 } from "uuid";
import FormView from "./FormView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    form: {
      setForm: () => ReturnType;
    };
  }
}

export const Form = Node.create({
  name: "form",

  group: "block",

  allowGapCursor: true,

  parseHTML() {
    return [
      {
        tag: "form",
      },
    ];
  },

  addAttributes() {
    return {
      uuid: {
        default: uuidv4(),
      },
      form: {
        default: [{ prompt: "", type: "short" }],
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["form", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FormView);
  },

  addCommands() {
    return {
      setForm:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              form: [{ id: uuidv4(), prompt: "", type: "short", image: "" }],
            },
          });
        },
    };
  },
});

export default Form;
