import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageComponent from "./ImageComponent";
import { Editor } from "@tiptap/react";
import { FormAttributes, LinearForm } from "../types";

export default function Linear({
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
  if (!form[tab] || form[tab].type !== "linear") {
    return null;
  }

  const currentForm = form[tab] as LinearForm;

  if (!editor.options.editable) {
    return (
      <div className='space-y-2'>
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
          <div className='flex items-end gap-4'>
            <div>{currentForm.startText}</div>
            <RadioGroup
              className='flex gap-4 justify-around w-full'
              value={currentForm.answer}
              onValueChange={(value) =>
                onLinearChange(value, "answer", form, setForm, tab)
              }
            >
              {range(
                parseInt(currentForm.start),
                parseInt(currentForm.end)
              ).map((n, i) => (
                <div className='flex flex-col items-center gap-3' key={i}>
                  <Label
                    className='text-muted-foreground'
                    htmlFor={`option-${i}`}
                  >
                    {n}
                  </Label>
                  <RadioGroupItem value={`${i}`} id={`option-${i}`} />
                </div>
              ))}
            </RadioGroup>
            <div>{currentForm.endText}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      <Label>Ответ</Label>
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Select
            value={currentForm.start}
            onValueChange={(v) =>
              handleLinearChange(
                v,
                "start",
                form,
                setForm,
                tab,
                updateAttributes
              )
            }
          >
            <SelectTrigger className='max-w-[100px]'>
              <SelectValue placeholder='Начало' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 2 }).map((_, n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n.toString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label className='text-muted-foreground'>до</Label>
          <Select
            value={currentForm.end}
            onValueChange={(v) =>
              handleLinearChange(v, "end", form, setForm, tab, updateAttributes)
            }
          >
            <SelectTrigger className='max-w-[100px]'>
              <SelectValue placeholder='Конец' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 9 }).map((_, n) => (
                <SelectItem key={n + 2} value={(n + 2).toString()}>
                  {n + 2}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
          <Label>Текст</Label>
          <div className='flex items-center gap-3'>
            <p className='text-sm text-muted-foreground'>{currentForm.start}</p>
            <Input
              placeholder='Начало...'
              className='w-full'
              value={currentForm.startText}
              onChange={(e) =>
                handleLinearText(
                  e.target.value,
                  "startText",
                  form,
                  setForm,
                  tab,
                  updateAttributes
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
          </div>
          <div className='flex items-center gap-3'>
            <p className='text-sm text-muted-foreground'>{currentForm.end}</p>
            <Input
              placeholder='Конец...'
              className='w-full'
              value={currentForm.endText}
              onChange={(e) =>
                handleLinearText(
                  e.target.value,
                  "endText",
                  form,
                  setForm,
                  tab,
                  updateAttributes
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type LinearFormEditableKeys =
  | "answer"
  | "start"
  | "end"
  | "startText"
  | "endText";

const onLinearChange = (
  value: string,
  key: LinearFormEditableKeys,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isLinearForm = (
    form: FormAttributes["form"][number]
  ): form is LinearForm => {
    return form.type === "linear";
  };

  if (!currentForm || !isLinearForm(currentForm)) {
    return;
  }

  currentForm[key] = value;
  setForm(newForm);
};

const handleLinearChange = (
  value: string,
  key: LinearFormEditableKeys,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isLinearForm = (
    form: FormAttributes["form"][number]
  ): form is LinearForm => {
    return form.type === "linear";
  };

  if (!currentForm || !isLinearForm(currentForm)) {
    return;
  }

  currentForm[key] = value;
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleLinearText = (
  text: string,
  key: LinearFormEditableKeys,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isLinearForm = (
    form: FormAttributes["form"][number]
  ): form is LinearForm => {
    return form.type === "linear";
  };

  if (!currentForm || !isLinearForm(currentForm)) {
    return;
  }

  currentForm[key] = text;
  setForm(newForm);
  updateAttributes({ form: newForm });
};

function range(start: number, end: number) {
  const arr = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}
