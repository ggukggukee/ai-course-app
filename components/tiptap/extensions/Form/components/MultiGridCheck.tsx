import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ImageComponent from "./ImageComponent";
import { FormAttributes, MultiGridCheckForm } from "../types";
import { Editor } from "@tiptap/react";

export default function MultiGridCheck({
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
  if (!form[tab] || form[tab].type !== "multigridcheck") {
    return null;
  }

  const currentForm = form[tab] as MultiGridCheckForm;

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
        <div className='flex w-full'>
          <div className='flex flex-col justify-end gap-4'>
            <div className='text-sm opacity-0'>1</div>
            {currentForm.rows?.map((r, i) => (
              <div key={i} className='flex bg-accent h-10 rounded-l-lg'>
                <div className='text-sm my-auto px-3'>{r.text}</div>
              </div>
            ))}
          </div>
          <div className='w-full space-y-4'>
            <div className='flex'>
              <div className='text-sm'></div>
              <div className='flex justify-around w-full'>
                {currentForm.columns?.map((c, j) => (
                  <div className='text-sm' key={j}>
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
            {currentForm.rows?.map((r, i) => (
              <div key={i} className='flex gap-3 bg-accent h-10 rounded-r-lg'>
                <div className='flex w-full justify-around'>
                  {currentForm.columns?.map((c, j) => (
                    <div key={j} className='flex items-center gap-3'>
                      <Checkbox
                        checked={
                          currentForm.answer?.find(
                            (x) =>
                              x.columnId === c.columnId && x.rowId === r.rowId
                          )
                            ? true
                            : false
                        }
                        onCheckedChange={() =>
                          onGridCheckboxChange(
                            c.columnId,
                            r.rowId,
                            form,
                            setForm,
                            tab
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
      <div className='flex gap-2 items-start w-full'>
        <div className='space-y-2 w-1/2'>
          <Label>Строки</Label>
          {currentForm.rows?.map((r, i) => (
            <div className='flex gap-2' key={i}>
              <Input
                placeholder='Строка...'
                className='w-full'
                value={r.text}
                onChange={(e) =>
                  handleRowText(
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
              {currentForm.rows?.length > 1 ? (
                <Button
                  type='button'
                  variant='outline'
                  onClick={() =>
                    handleDeleteRow(i, form, setForm, tab, updateAttributes)
                  }
                  className='px-3'
                >
                  <X className='w-4 h-4' />
                </Button>
              ) : null}
            </div>
          ))}
          <Button
            size='sm'
            type='button'
            variant='outline'
            onClick={() => handleAddRow(form, setForm, tab, updateAttributes)}
          >
            Добавить строку
          </Button>
        </div>
        <div className='space-y-2 w-1/2'>
          <Label>Столбцы</Label>
          {currentForm.columns?.map((с, i) => (
            <div className='flex gap-2' key={i}>
              <Input
                placeholder='Столбец...'
                className='w-full'
                value={с.text}
                onChange={(e) =>
                  handleColumnText(
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
              {currentForm.columns?.length > 1 ? (
                <Button
                  type='button'
                  variant='outline'
                  onClick={() =>
                    handleDeleteColumn(i, form, setForm, tab, updateAttributes)
                  }
                  className='px-3'
                >
                  <X className='w-4 h-4' />
                </Button>
              ) : null}
            </div>
          ))}
          <Button
            size='sm'
            type='button'
            variant='outline'
            onClick={() =>
              handleAddColumn(form, setForm, tab, updateAttributes)
            }
          >
            Добавить столбец
          </Button>
        </div>
      </div>
    </div>
  );
}

const onGridCheckboxChange = (
  columnId: string,
  rowId: string,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isMultiGridCheckForm = (
    form: FormAttributes["form"][number]
  ): form is MultiGridCheckForm => {
    return form.type === "multigridcheck";
  };

  if (!currentForm || !isMultiGridCheckForm(currentForm)) {
    return;
  }

  if (!currentForm.answer) {
    currentForm.answer = [];
  }

  const isExist = currentForm.answer.find(
    (x) => x.rowId === rowId && x.columnId === columnId
  );
  if (isExist) {
    const idx = currentForm.answer.findIndex(
      (x) => x.rowId === rowId && x.columnId === columnId
    );
    currentForm.answer.splice(idx, 1);
  } else {
    currentForm.answer.push({ columnId, rowId });
  }

  setForm(newForm);
};

const handleRowText = (
  text: string,
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isMultiGridCheckForm = (
    form: FormAttributes["form"][number]
  ): form is MultiGridCheckForm => {
    return form.type === "multigridcheck";
  };

  if (!currentForm || !isMultiGridCheckForm(currentForm)) {
    return;
  }

  currentForm.rows[index].text = text;
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleColumnText = (
  text: string,
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isMultiGridCheckForm = (
    form: FormAttributes["form"][number]
  ): form is MultiGridCheckForm => {
    return form.type === "multigridcheck";
  };

  if (!currentForm || !isMultiGridCheckForm(currentForm)) {
    return;
  }

  currentForm.columns[index].text = text;
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleAddRow = (
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isMultiGridCheckForm = (
    form: FormAttributes["form"][number]
  ): form is MultiGridCheckForm => {
    return form.type === "multigridcheck";
  };

  if (!currentForm || !isMultiGridCheckForm(currentForm)) {
    return;
  }

  currentForm.rows.push({ rowId: uuidv4(), text: "" });
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleAddColumn = (
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isMultiGridCheckForm = (
    form: FormAttributes["form"][number]
  ): form is MultiGridCheckForm => {
    return form.type === "multigridcheck";
  };

  if (!currentForm || !isMultiGridCheckForm(currentForm)) {
    return;
  }

  currentForm.columns.push({ columnId: uuidv4(), text: "" });
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleDeleteRow = (
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isMultiGridCheckForm = (
    form: FormAttributes["form"][number]
  ): form is MultiGridCheckForm => {
    return form.type === "multigridcheck";
  };

  if (!currentForm || !isMultiGridCheckForm(currentForm)) {
    return;
  }

  currentForm.rows.splice(index, 1);
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleDeleteColumn = (
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const isMultiGridCheckForm = (
    form: FormAttributes["form"][number]
  ): form is MultiGridCheckForm => {
    return form.type === "multigridcheck";
  };

  if (!currentForm || !isMultiGridCheckForm(currentForm)) {
    return;
  }

  currentForm.columns.splice(index, 1);
  setForm(newForm);
  updateAttributes({ form: newForm });
};
