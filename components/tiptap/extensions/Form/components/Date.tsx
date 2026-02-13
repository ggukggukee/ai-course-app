import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageComponent from "./ImageComponent";
import { Editor } from "@tiptap/core";
import { DateForm, FormAttributes } from "../types";

export default function Date({
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
  if (!form[tab] || form[tab].type !== "date") {
    return null;
  }

  const currentForm = form[tab] as DateForm;

  if (!editor.options.editable) {
    return (
      <div className='space-y-6'>
        <div className='space-y-2'>
          {form[tab]?.image && (
            <div className='max-w-xs relative'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className='aspect-video rounded-lg object-cover w-[320px]'
                src={form[tab]?.image}
                alt=''
              />
            </div>
          )}
        </div>
        <div className='space-y-2'>
          <Input
            type='date'
            placeholder='Дата...'
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
        <Input type='date' placeholder='Дата...' className='w-full' disabled />
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
