import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pen, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { QuizType } from "../Quiz";
import { useUpload } from "../../../hooks/useUpload";
import { NoImage } from "./NoImage";

export default function QuizImage({
  quiz,
  setQuiz,
  tab,
  updateAttributes,
}: {
  quiz: QuizType[];
  setQuiz: (quiz: QuizType[]) => void;
  tab: number;
  updateAttributes: (attributes: { quiz: QuizType[] }) => void;
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

      const url = await uploadFile(file, fileData as ArrayBuffer);
      if (!url) return;

      addImage(url, quiz, setQuiz, tab, updateAttributes);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className='space-y-1'>
      <Label>Изображение</Label>
      <div className='max-w-xs relative'>
        {quiz[tab]?.image ? (
          //eslint-disable-next-line @next/next/no-img-element
          <img
            className='aspect-video rounded-lg object-cover w-full max-w-xs'
            src={quiz[tab]?.image}
            alt=''
          />
        ) : (
          <NoImage className='max-w-xs' />
        )}
        <div className='absolute top-2 right-2 z-10 flex gap-2'>
          {quiz[tab]?.image && (
            <button
              type='button'
              onClick={() =>
                handleDeleteImage(quiz, setQuiz, tab, updateAttributes)
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
            ) : quiz[tab]?.image ? (
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
            const target = e.target as HTMLInputElement;
            target.value = "";
          }}
          onChange={handleAddFile}
        />
      </div>
    </div>
  );
}

const addImage = (
  url: string,
  quiz: QuizType[],
  setQuiz: (quiz: QuizType[]) => void,
  tab: number,
  updateAttributes: (attributes: { quiz: QuizType[] }) => void
) => {
  const newQuiz = [...quiz];
  newQuiz[tab].image = url;
  setQuiz(newQuiz);
  updateAttributes({ quiz: newQuiz });
};

const handleDeleteImage = (
  quiz: QuizType[],
  setQuiz: (quiz: QuizType[]) => void,
  tab: number,
  updateAttributes: (attributes: { quiz: QuizType[] }) => void
) => {
  const newQuiz = [...quiz];
  newQuiz[tab].image = "";
  setQuiz(newQuiz);
  updateAttributes({ quiz: newQuiz });
};
