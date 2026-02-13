import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/core";
import { v4 as uuidv4 } from "uuid";
import { FormAttributes } from "../types";

export default function Upper({
  editor,
  form,
  setForm,
  tab,
  setTab,
  updateAttributes,
}: {
  editor: Editor;
  form: FormAttributes["form"];
  setForm: (form: FormAttributes["form"]) => void;
  tab: number;
  setTab: (tab: number) => void;
  updateAttributes: (attributes: Partial<FormAttributes>) => void;
}) {
  if (!editor.options.editable) {
    return (
      <div className='flex items-center gap-3 overflow-x-auto scrollbar-hide'>
        {form.map((_, i) => (
          <Button
            key={i}
            size='sm'
            type='button'
            variant='outline'
            className={tab === i ? "border-primary shrink-0" : ""}
            onClick={() => setTab(i)}
          >
            {tab === i ? `Вопрос ${i + 1}` : i + 1}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between gap-3'>
      <div className='flex items-center gap-3 overflow-x-auto scrollbar-hide'>
        {form.map((_, i) => (
          <Button
            key={i}
            size='sm'
            type='button'
            variant='outline'
            className={tab === i ? "border-primary shrink-0" : ""}
            onClick={() => setTab(i)}
          >
            {tab === i ? `Вопрос ${i + 1}` : i + 1}
          </Button>
        ))}
        <Button
          size='sm'
          type='button'
          variant='ghost'
          onClick={() => handleAddQuestion(form, setForm, updateAttributes)}
          className='shrink-0 text-muted-foreground'
        >
          Добавить вопрос
        </Button>
      </div>
      {form.length > 1 ? (
        <Button
          size='sm'
          type='button'
          variant='outline'
          onClick={() =>
            handleDeleteQuestion(tab, setTab, form, setForm, updateAttributes)
          }
          className='shrink-0 text-destructive border-destructive hover:text-destructive hover:dark:text-white hover:bg-red-100 hover:dark:bg-red-700'
        >
          Удалить вопрос
        </Button>
      ) : null}
    </div>
  );
}

const handleAddQuestion = (
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  newForm.push({ id: uuidv4(), prompt: "", type: "short", image: "" });
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleDeleteQuestion = (
  tab: number,
  setTab: (tab: number) => void,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const deletingTab = tab;

  if (tab === form.length - 1) {
    setTab(tab - 1);
  }

  const newForm = [...form];
  newForm.splice(deletingTab, 1);
  setForm(newForm);
  updateAttributes({ form: newForm });
};
