import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import Upper from "./components/Upper";
import Question from "./components/Question";
import FormType from "./components/FormType";
import Short from "./components/Short";
import Paragraph from "./components/Paragraph";
import Date from "./components/Date";
import Time from "./components/Time";
import Single from "./components/Single";
import Multiple from "./components/Multiple";
import Linear from "./components/Linear";
import MultiGrid from "./components/MultiGrid";
import MultiGridCheck from "./components/MultiGridCheck";
import Errors from "./components/Errors";
import Buttons from "./components/Buttons";
import { Node } from "@tiptap/pm/model";
import { FormAttributes, FormWithAnswers } from "./types";

interface EditorProps {
  forms?: FormWithAnswers[];
}

interface FormViewProps {
  editor: Editor;
  node: Node;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateAttributes: (attrs: Record<string, any>) => void;
}

export default function FormView(props: FormViewProps) {
  const { editor, node, updateAttributes } = props as FormViewProps & {
    node: Node & {
      attrs: FormAttributes;
    };
  };
  const [form, setForm] = useState(node.attrs.form);
  const [tab, setTab] = useState(0);

  const forms = (editor.options.editorProps as EditorProps).forms;

  useEffect(() => {
    if (!forms) return;

    const found = forms.find((form) => form.uuid === node.attrs.uuid);
    if (!found) return;

    setForm((prev) => {
      const newForm = [...prev];

      newForm.forEach((q, i) => {
        const answered = found.answers.find((x) => x.id === q.id);
        if (answered) {
          newForm[i].answer = answered.answer;
        }
      });

      return newForm;
    });
  }, [forms, node.attrs.uuid]);

  if (!form) return null;

  return (
    <NodeViewWrapper>
      <div className='border rounded-lg p-4'>
        <div className='space-y-6'>
          <Upper
            editor={editor}
            form={form}
            tab={tab}
            setTab={setTab}
            setForm={setForm}
            updateAttributes={updateAttributes}
          />
          <Question
            editor={editor}
            form={form}
            tab={tab}
            setForm={setForm}
            updateAttributes={updateAttributes}
          />
          <FormType
            editor={editor}
            form={form}
            tab={tab}
            setForm={setForm}
            updateAttributes={updateAttributes}
          />
          <div className='space-y-6'>
            {form[tab]?.type === "short" && (
              <Short
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            {form[tab]?.type === "paragraph" && (
              <Paragraph
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            {form[tab]?.type === "date" && (
              <Date
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            {form[tab]?.type === "time" && (
              <Time
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            {form[tab]?.type === "single" && (
              <Single
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            {form[tab]?.type === "multiple" && (
              <Multiple
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            {form[tab]?.type === "linear" && (
              <Linear
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            {form[tab]?.type === "multigrid" && (
              <MultiGrid
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            {form[tab]?.type === "multigridcheck" && (
              <MultiGridCheck
                editor={editor}
                form={form}
                tab={tab}
                setForm={setForm}
                updateAttributes={updateAttributes}
              />
            )}
            <Errors editor={editor} form={form} />
          </div>
          <Buttons
            editor={editor}
            form={form}
            tab={tab}
            setTab={setTab}
            uuid={node.attrs.uuid}
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}
