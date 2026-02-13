import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpload } from "../../../hooks/useUpload";
import { ImageIcon, Loader2, XIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { QuizType, SelectableOption } from "../Quiz";
import { NoImage } from "./NoImage";

export default function Variant({
  o,
  j,
  tab,
  quiz,
  setQuiz,
  updateAttributes,
}: {
  o: SelectableOption;
  j: number;
  tab: number;
  quiz: QuizType[];
  setQuiz: (quiz: QuizType[]) => void;
  updateAttributes: (attributes: { quiz: QuizType[] }) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const { loading, uploadFile } = useUpload();

  const handleDeleteOption = (i: number, j: number) => {
    const newQuiz = [...quiz];
    newQuiz[i].options.splice(j, 1);
    setQuiz(newQuiz);
    updateAttributes({ quiz: newQuiz });
  };

  const handleImageOption = useCallback((j: number) => {
    setIndex(j);
    inputRef.current?.click();
  }, []);

  const onImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const fileData = event.target?.result;
        if (!fileData) return;

        const url = await uploadFile(files[0], fileData as ArrayBuffer);
        if (!url) return;

        const newQuiz = [...quiz];
        if (index === null) return;

        newQuiz[tab].options[index].image = url;
        updateAttributes({ quiz: newQuiz });
      };

      reader.readAsArrayBuffer(file);
    },
    [uploadFile, index, quiz, tab, updateAttributes]
  );

  const handleOptionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    const newQuiz = [...quiz];
    if (newQuiz[i].writable) return;
    newQuiz[i].options[j].text = e.target.value;
    setQuiz(newQuiz);
    updateAttributes({ quiz: newQuiz });
  };

  const handleIsCorrect = (checked: string | boolean, i: number, j: number) => {
    const newQuiz = [...quiz];
    if (newQuiz[i].writable) return;
    newQuiz[i].options[j].isCorrect =
      typeof checked === "string" ? checked === "true" : checked;
    setQuiz(newQuiz);
    updateAttributes({ quiz: newQuiz });
  };

  return (
    <div className='bg-background shadow-sm space-y-2 p-3 rounded-xl cursor-pointer duration-300 border'>
      <div className='relative w-full'>
        {o.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className='aspect-video rounded-lg object-cover w-full'
            src={o.image}
            alt=''
          />
        ) : (
          <NoImage />
        )}
        <Button
          type='button'
          variant='outline'
          onClick={() => handleImageOption(j)}
          className='z-10 bg-background flex gap-1 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0'
        >
          {loading ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            <ImageIcon className='w-4 h-4' />
          )}
          {o.image ? "1" : ""}
        </Button>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex items-end gap-2'>
          <div className='space-y-1 w-full'>
            <Label>Вариант {j + 1}</Label>
            <Input
              placeholder='Напишите вариант...'
              className='w-full'
              value={o.text}
              onChange={(e) => handleOptionText(e, tab, j)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>
          {quiz[tab]?.options.length > 1 ? (
            <Button
              type='button'
              variant='outline'
              onClick={() => handleDeleteOption(tab, j)}
              className='px-3'
            >
              <XIcon className='w-4 h-4' />
            </Button>
          ) : null}
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id={`isCorrect-${tab}-${j}`}
            checked={o.isCorrect}
            onCheckedChange={(e) => handleIsCorrect(e, tab, j)}
          />
          <div className='space-y-1 leading-none'>
            <Label htmlFor={`isCorrect-${tab}-${j}`}>Правильный ответ</Label>
          </div>
        </div>
        <input
          className='w-0 h-0 overflow-hidden opacity-0'
          ref={inputRef}
          type='file'
          accept='.jpg,.jpeg,.png,.webp,.gif'
          onChange={onImageChange}
          onClick={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = "";
          }}
        />
      </div>
    </div>
  );
}
