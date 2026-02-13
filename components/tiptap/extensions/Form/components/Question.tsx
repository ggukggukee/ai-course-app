import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor } from "@tiptap/core";
import { FormAttributes } from "../types";

export default function Question({
  editor,
  form,
  tab,
  setForm,
  updateAttributes,
}: {
  editor: Editor;
  form: FormAttributes["form"];
  tab: number;
  setForm: (form: FormAttributes["form"]) => void;
  updateAttributes: (attributes: Partial<FormAttributes>) => void;
}) {
  if (!editor.options.editable) {
    return <p>{form[tab]?.prompt}</p>;
  }

  return (
    <div className='space-y-1'>
      <Label>Вопрос</Label>
      <Input
        placeholder='Напишите вопрос...'
        className='w-full'
        value={form[tab]?.prompt}
        onChange={(e) =>
          handlePrompt(e.target.value, tab, form, setForm, updateAttributes)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />
    </div>
  );
}

const handlePrompt = (
  prompt: string,
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  newForm[index].prompt = prompt;
  setForm(newForm);
  updateAttributes({ form: newForm });
};
