import { Input } from "@/components/ui/input";
import { Loader2, Pen, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { FormAttributes } from "../types";
import { useUpload } from "../../../hooks/useUpload";
import { NoImage } from "./NoImage";

export default function ImageComponent({
  form,
  setForm,
  tab,
  updateAttributes,
}: {
  form: FormAttributes["form"];
  setForm: (form: FormAttributes["form"]) => void;
  tab: number;
  updateAttributes: (attributes: Partial<FormAttributes>) => void;
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

      addImage(url, form, setForm, tab, updateAttributes);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className='max-w-xs relative'>
      {form[tab]?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className='aspect-video rounded-lg object-cover max-w-xs w-full'
          src={form[tab]?.image}
          alt=''
        />
      ) : (
        <NoImage />
      )}
      <div className='absolute top-2 right-2 z-10 flex gap-2'>
        {form[tab]?.image && (
          <button
            type='button'
            onClick={() =>
              handleDeleteImage(form, setForm, tab, updateAttributes)
            }
            className='p-2 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        )}
        <button
          type='button'
          className='p-2 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
          onClick={() => inputRef.current?.click()}
        >
          {loading ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : form[tab]?.image ? (
            <Pen className='w-4 h-4' />
          ) : (
            <Plus className='w-4 h-4' />
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

const addImage = (
  url: string,
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  newForm[tab].image = url;
  setForm(newForm);
  updateAttributes({ form: newForm });
};

const handleDeleteImage = (
  form: FormAttributes["form"],
  setForm: (form: FormAttributes["form"]) => void,
  tab: number,
  updateAttributes: (attributes: Partial<FormAttributes>) => void
) => {
  const newForm = [...form];
  newForm[tab].image = "";
  setForm(newForm);
  updateAttributes({ form: newForm });
};
