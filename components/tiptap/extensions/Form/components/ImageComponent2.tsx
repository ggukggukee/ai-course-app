import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpload } from "../../../hooks/useUpload";
import { ImagePlus, Loader2, Pen, Trash2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { FormAttributes, MultipleForm, SingleForm } from "../types";
import { NoImage } from "./NoImage";

export function ImageComponent2({
  image,
  form,
  setForm,
  tab,
  updateAttributes,
  i,
}: {
  image: string;
  form: FormAttributes["form"];
  setForm: (form: FormAttributes["form"]) => void;
  tab: number;
  updateAttributes: (attributes: Partial<FormAttributes>) => void;
  i: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { loading, uploadFile } = useUpload();

  const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 900 * 1024 * 1024) {
      toast.error("Размер файла больше 900 МБ");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (!fileData) return;
      if (!(fileData instanceof ArrayBuffer)) return;

      const url = await uploadFile(file, fileData);
      if (!url) return;

      addImage(url, i, form, setForm, tab, updateAttributes);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className='max-w-xs relative'>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className='aspect-video rounded-lg object-cover max-w-xs w-full'
          src={image}
          alt=''
        />
      ) : (
        <NoImage />
      )}
      <div className='absolute top-2 right-2 z-10 flex gap-2'>
        <button
          type='button'
          onClick={() =>
            handleDeleteImage(i, form, setForm, tab, updateAttributes)
          }
          className='p-2 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
        >
          <Trash2 className='w-4 h-4' />
        </button>

        <button
          type='button'
          onClick={() => inputRef.current?.click()}
          className='p-2 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
        >
          {loading ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            <Pen className='w-4 h-4' />
          )}
        </button>
      </div>
      <Input
        ref={inputRef}
        type='file'
        className='hidden w-0 h-0 opacity-0'
        accept='image/*'
        onClick={(e) => {
          if (e.target instanceof HTMLInputElement) {
            e.target.value = "";
          }
        }}
        onChange={handleAddFile}
      />
    </div>
  );
}

export function AddImageButton({
  form,
  setForm,
  tab,
  updateAttributes,
  i,
}: {
  form: FormAttributes["form"];
  setForm: (form: FormAttributes["form"]) => void;
  tab: number;
  updateAttributes: (attributes: Partial<FormAttributes>) => void;
  i: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { loading, uploadFile } = useUpload();

  const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 900 * 1024 * 1024) {
      toast.error("Размер файла больше 900 МБ");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (!fileData) return;
      if (!(fileData instanceof ArrayBuffer)) return;

      const url = await uploadFile(file, fileData);
      if (!url) return;

      addImage(url, i, form, setForm, tab, updateAttributes);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Button
        type='button'
        variant='outline'
        onClick={() => inputRef.current?.click()}
        className='px-3'
      >
        {loading ? (
          <Loader2 className='w-4 h-4 animate-spin' />
        ) : (
          <ImagePlus className='w-4 h-4' />
        )}
      </Button>
      <Input
        ref={inputRef}
        type='file'
        className='hidden w-0 h-0 opacity-0'
        accept='image/*'
        onClick={(e) => {
          if (e.target instanceof HTMLInputElement) {
            e.target.value = "";
          }
        }}
        onChange={handleAddFile}
      />
    </>
  );
}

const handleDeleteImage = (
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const hasOptions = (
    form: FormAttributes["form"][number]
  ): form is SingleForm | MultipleForm => {
    return form.type === "single" || form.type === "multiple";
  };

  if (!currentForm || !hasOptions(currentForm)) {
    return;
  }

  if (index >= 0 && index < currentForm.options.length) {
    currentForm.options[index].image = "";
    setForm(newForm);
    updateAttributes({ form: newForm });
  }
};

const addImage = (
  url: string,
  index: number,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  const currentForm = newForm[tab];

  const hasOptions = (
    form: FormAttributes["form"][number]
  ): form is SingleForm | MultipleForm => {
    return form.type === "single" || form.type === "multiple";
  };

  if (!currentForm || !hasOptions(currentForm)) {
    return;
  }

  if (index >= 0 && index < currentForm.options.length) {
    currentForm.options[index].image = url;
    setForm(newForm);
    updateAttributes({ form: newForm });
  }
};
