import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ImageComponent from "./ImageComponent";
import { AddImageButton, ImageComponent2 } from "./ImageComponent2";
import { FormAttributes, MultipleForm } from "../types";
import { Editor } from "@tiptap/react";

export default function Multiple({
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
  if (!form[tab] || form[tab].type !== "multiple") {
    return null;
  }

  const currentForm = form[tab] as MultipleForm;

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
          <div className='space-y-5'>
            <div
              className={
                currentForm.options?.find((x) => x.image)
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  : "space-y-4"
              }
            >
              {currentForm.options?.map((x, i) =>
                x.other ? (
                  <div key={i} className='flex gap-2.5'>
                    <Checkbox
                      id={x.optionId}
                      checked={
                        currentForm.answer?.find(
                          (a) => a.optionId === x.optionId
                        )
                          ? true
                          : false
                      }
                      onCheckedChange={() =>
                        onCheckboxChange(x.optionId, tab, form, setForm)
                      }
                    />
                    <Input
                      placeholder='Мой ответ...'
                      className='w-full'
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.preventDefault();
                      }}
                      value={
                        currentForm.answer?.find(
                          (a) => a.optionId === x.optionId
                        )?.text || ""
                      }
                      onChange={(e) =>
                        otherCheckboxAnswer(
                          x.optionId,
                          e.target.value,
                          tab,
                          form,
                          setForm
                        )
                      }
                    />
                  </div>
                ) : (
                  <div key={i} className='space-y-2'>
                    {currentForm.options?.find((x) => x.image) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className='aspect-video rounded-lg object-cover w-full'
                        src={x.image}
                        alt=''
                      />
                    ) : null}
                    <div className='flex items-center gap-2.5'>
                      <Checkbox
                        id={x.optionId}
                        checked={
                          currentForm.answer?.find(
                            (a) => a.optionId === x.optionId
                          )
                            ? true
                            : false
                        }
                        onCheckedChange={() =>
                          onCheckboxChange(x.optionId, tab, form, setForm)
                        }
                      />
                      <Label
                        htmlFor={x.optionId}
                        className='font-normal text-base'
                      >
                        {x.text}
                      </Label>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
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
        <div className='space-y-5'>
          {currentForm.options?.map((x, i) =>
            x.other ? (
              <div key={i} className='flex gap-2'>
                <Input placeholder='Другое...' className='w-full' disabled />
                <Button
                  type='button'
                  variant='outline'
                  onClick={() =>
                    handleDeleteOption(i, form, setForm, tab, updateAttributes)
                  }
                  className='px-3'
                >
                  <X className='w-4 h-4' />
                </Button>
              </div>
            ) : (
              <div className='space-y-2' key={i}>
                <div className='flex gap-2'>
                  <Input
                    placeholder={`Выбор ${i + 1}...`}
                    className='w-full'
                    value={x.text}
                    onChange={(e) =>
                      handleText(
                        e.target.value,
                        i,
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
                  {!x.image && (
                    <AddImageButton
                      form={form}
                      setForm={setForm}
                      tab={tab}
                      updateAttributes={updateAttributes}
                      i={i}
                    />
                  )}
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() =>
                      handleDeleteOption(
                        i,
                        form,
                        setForm,
                        tab,
                        updateAttributes
                      )
                    }
                    className='px-3'
                  >
                    <X className='w-4 h-4' />
                  </Button>
                </div>
                {x.image && (
                  <ImageComponent2
                    image={x.image}
                    form={form}
                    setForm={setForm}
                    tab={tab}
                    updateAttributes={updateAttributes}
                    i={i}
                  />
                )}
              </div>
            )
          )}
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              type='button'
              variant='outline'
              onClick={() =>
                handleAddOption(form, setForm, tab, updateAttributes)
              }
            >
              Добавить вариант
            </Button>
            {!form[tab]?.options.find((o) => o.other) && (
              <Button
                size='sm'
                type='button'
                variant='outline'
                onClick={() =>
                  handleAddOther(form, setForm, tab, updateAttributes)
                }
              >
                Добавить &quot;другое&quot;
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const onCheckboxChange = (
  optionId: string,
  tab: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  // Type guard to ensure we're working with a MultipleForm
  const isMultipleForm = (
    form: FormAttributes["form"][number]
  ): form is MultipleForm => {
    return form.type === "multiple";
  };

  if (!currentForm || !isMultipleForm(currentForm)) {
    return;
  }

  // Initialize answer array if it doesn't exist
  if (!currentForm.answer) {
    currentForm.answer = [];
  }

  const checked = currentForm.answer?.find((x) => x.optionId === optionId);
  if (!checked) {
    currentForm.answer.push({ optionId });
  } else {
    const filtered = currentForm.answer.filter((x) => x.optionId !== optionId);
    currentForm.answer = filtered;
  }

  setForm(newForm);
};

const otherCheckboxAnswer = (
  optionId: string,
  text: string,
  tab: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  // Type guard to ensure we're working with a MultipleForm
  const isMultipleForm = (
    form: FormAttributes["form"][number]
  ): form is MultipleForm => {
    return form.type === "multiple";
  };

  if (!currentForm || !isMultipleForm(currentForm)) {
    return;
  }

  // Initialize answer array if it doesn't exist
  if (!currentForm.answer) {
    currentForm.answer = [];
  }

  const checked = currentForm.answer?.find((x) => x.optionId === optionId);
  if (!checked) {
    currentForm.answer.push({ optionId, text });
  } else {
    checked.optionId = optionId;
    checked.text = text;
  }

  setForm(newForm);
};

const handleDeleteOption = (
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  // Type guard to ensure we're working with a MultipleForm
  const isMultipleForm = (
    form: FormAttributes["form"][number]
  ): form is MultipleForm => {
    return form.type === "multiple";
  };

  if (!currentForm || !isMultipleForm(currentForm)) {
    return;
  }

  currentForm.options.splice(index, 1);
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleText = (
  text: string,
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  // Type guard to ensure we're working with a MultipleForm
  const isMultipleForm = (
    form: FormAttributes["form"][number]
  ): form is MultipleForm => {
    return form.type === "multiple";
  };

  if (!currentForm || !isMultipleForm(currentForm)) {
    return;
  }

  currentForm.options[index].text = text;
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleAddOption = (
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  // Type guard to ensure we're working with a MultipleForm
  const isMultipleForm = (
    form: FormAttributes["form"][number]
  ): form is MultipleForm => {
    return form.type === "multiple";
  };

  if (!currentForm || !isMultipleForm(currentForm)) {
    return;
  }

  const isOther = currentForm.options.find((o) => o.other);
  if (isOther) {
    const index = currentForm.options.length - 1;
    currentForm.options.splice(index, 0, {
      optionId: uuidv4(),
      text: "",
      image: "",
    });
  } else {
    currentForm.options.push({ optionId: uuidv4(), text: "", image: "" });
  }

  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleAddOther = (
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  // Type guard to ensure we're working with a MultipleForm
  const isMultipleForm = (
    form: FormAttributes["form"][number]
  ): form is MultipleForm => {
    return form.type === "multiple";
  };

  if (!currentForm || !isMultipleForm(currentForm)) {
    return;
  }

  currentForm.options.push({
    optionId: uuidv4(),
    text: "",
    image: "",
    other: true,
  });
  setForm(newForm);
  updateAttributes({ form: newForm });
};
