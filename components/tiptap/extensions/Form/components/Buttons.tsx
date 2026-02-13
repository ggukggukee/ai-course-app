import { Button } from "@/components/ui/button";
import { Ban, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Editor } from "@tiptap/react";
import { FormAnswer, FormAttributes, FormWithAnswers } from "../types";

interface EditorProps {
  upid?: number;
  forms?: FormWithAnswers[];
}

export default function Buttons({
  editor,
  form,
  tab,
  setTab,
  uuid,
}: {
  editor: Editor;
  form: FormAttributes["form"];
  tab: number;
  setTab: (tab: number) => void;
  uuid?: string;
}) {
  const [clicked, setClicked] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const upid = (editor.options.editorProps as EditorProps).upid;
  const forms = (editor.options.editorProps as EditorProps).forms;

  // Initialize result based on whether form was already completed
  const [result, setResult] = useState<string | null>(() => {
    if (!forms || !uuid) return null;
    const found = forms.find((f) => f.uuid === uuid);
    return found ? "Вы уже прошли этот опрос" : null;
  });

  if (editor.options.editable) return null;

  return (
    <>
      <div className='flex items-center justify-between'>
        {tab !== 0 && form?.length !== 1 ? (
          <Button
            size='sm'
            type='button'
            variant='outline'
            onClick={() => prevQuestion(tab, setTab)}
          >
            Пред. вопрос
          </Button>
        ) : null}
        {tab !== form?.length - 1 ? (
          <Button
            size='sm'
            type='button'
            variant='outline'
            className='ml-auto'
            onClick={() => nextQuestion(tab, setTab, form)}
          >
            След. вопрос
          </Button>
        ) : null}
        {tab === form?.length - 1 ? (
          <Button
            size='sm'
            type='button'
            className='ml-auto'
            onClick={() =>
              saveForm(form, setClicked, setErrors, setResult, uuid, upid)
            }
            disabled={clicked}
          >
            {clicked ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Подождите...
              </>
            ) : (
              "Сохранить"
            )}
          </Button>
        ) : null}
      </div>
      {errors.map((m, k) => (
        <div className='flex items-center gap-2' key={k}>
          <Ban className='w-4 h-4 text-destructive' />
          <span className='text-destructive text-sm'>{m}</span>
        </div>
      ))}
      {result && (
        <div className='flex items-center gap-2'>
          <CheckCircle className='w-4 h-4 text-green-500 dark:text-green-700' />
          <span className='text-green-500 dark:text-green-700 text-sm'>
            {result}
          </span>
        </div>
      )}
    </>
  );
}

const nextQuestion = (
  tab: number,
  setTab: (tab: number) => void,
  form: FormAttributes["form"]
) => {
  if (tab === form.length - 1) return;
  setTab(tab + 1);
};

const prevQuestion = (tab: number, setTab: (tab: number) => void) => {
  if (tab === 0) return;
  setTab(tab - 1);
};

const saveForm = async (
  form: FormAttributes["form"],
  setClicked: (clicked: boolean) => void,
  setErrors: (errors: string[]) => void,
  setResult: (result: string) => void,
  uuid: string | undefined,
  upid: number | undefined
) => {
  if (!uuid) {
    return setErrors(["Что-то пошло не так."]);
  }

  if (!upid) {
    return setErrors(["У вас нет доступа к этому уроку."]);
  }

  const arr: string[] = [];

  form.forEach((q, i) => {
    if (q.type === "paragraph" || q.type === "short") {
      if (!q.answer) arr.push(`Вопрос ${i + 1} не заполнен`);
    }

    if (q.type === "single" || q.type === "multiple") {
      if (!q.answer) arr.push(`Вопрос ${i + 1} не заполнен`);
      if (q.answer?.length === 0) arr.push(`Вопрос ${i + 1} не заполнен`);

      const other = q.options?.find((o) => o.other);
      const answerWithOther = q.answer?.find(
        (a) => a.optionId === other?.optionId
      );
      if (other && answerWithOther) {
        if (!answerWithOther.text)
          arr.push(`В вопросе ${i + 1} заполните поле`);
      }
    }

    if (q.type === "linear") {
      if (!q.answer) arr.push(`Вопрос ${i + 1} не заполнен`);
    }

    if (q.type === "multigrid" || q.type === "multigridcheck") {
      if (!q.answer) arr.push(`Вопрос ${i + 1} не заполнен`);
      if (q.answer?.length === 0) arr.push(`Вопрос ${i + 1} не заполнен`);

      const rows = q.rows?.map((r) => r.rowId) || [];
      const answerRows = q.answer?.map((a) => a.rowId) || [];
      const unansweredRows = rows?.filter((r) => !answerRows.includes(r)) || [];
      if (q.answer && unansweredRows.length > 0) {
        arr.push(`В вопросе ${i + 1} заполните все строки`);
      }
    }
  });

  setErrors(arr);

  if (arr.length > 0) return;

  const formAnswers: { id: string; answer: FormAnswer }[] = [];

  for (const q of form) {
    if (q.answer !== undefined && q.answer !== null) {
      formAnswers.push({
        id: q.id,
        answer: q.answer as FormAnswer,
      });
    } else {
      return setErrors(["Что-то пошло не так."]);
    }
  }

  setResult("Форма не отправлена, напишите нам в поддержку");
};
