import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageComponent from "./ImageComponent";
import { Editor } from "@tiptap/core";
import { FormAttributes, ShortForm } from "../types";

export default function Short({
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
  // Guard at the component level
  if (!form[tab] || form[tab].type !== "short") {
    return null; // Return nothing if this isn't a short form
  }

  // Now TypeScript knows form[tab] is a DateForm
  const currentForm = form[tab] as ShortForm;

  if (!editor.options.editable) {
    return (
      <div className='space-y-6'>
        <div className='space-y-2'>
          {currentForm.image && (
            <div className='max-w-xs relative'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className='aspect-video rounded-lg object-cover w-full max-w-xs'
                src={currentForm.image}
                alt=''
              />
            </div>
          )}
        </div>
        <div className='space-y-2'>
          <Input
            placeholder='Ваш ответ...'
            className='w-full'
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            onChange={(e) => writeAnswer(e.target.value, tab, form, setForm)}
            value={currentForm.answer || ""}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label>Изображение</Label>
        <ImageComponent
          form={form}
          setForm={setForm}
          tab={tab}
          updateAttributes={updateAttributes}
        />
      </div>
      <div className='space-y-2'>
        <Label>Ответ</Label>
        <Input placeholder='Короткий ответ...' className='w-full' disabled />
      </div>
    </div>
  );
}

const writeAnswer = (
  text: string,
  tab: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void
) => {
  const newForm = [...form];
  newForm[tab].answer = text;
  setForm(newForm);
};
