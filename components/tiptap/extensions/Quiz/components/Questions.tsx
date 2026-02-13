import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { QuizType } from "../Quiz";
import { NoImage } from "./NoImage";

export default function Questions({
  setQuiz,
  quiz,
  tab,
  setTab,
}: {
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  quiz: QuizType[];
  tab: number;
  setTab: (tab: number) => void;
}) {
  const [allCorrect, setAllCorrect] = useState(false);

  const handleClick = (j: number) => {
    setQuiz((prev) => {
      const newQuiz = [...prev];
      if (!newQuiz[tab].writable) {
        const options = newQuiz[tab].options;
        if (options.filter((x) => x.isCorrect).length === 1) {
          options.forEach((o) => (o.selected = false));
          options[j].selected = true;
        } else {
          options[j].selected = !options[j].selected;
        }
        newQuiz[tab].isCorrect = undefined;
      }
      return newQuiz;
    });
  };

  const handleNext = () => {
    if (quiz[tab].writable) {
      const isCorrect = quiz[tab].options.every((x) => {
        const option = x;
        return (
          option.response?.trim().toLowerCase() ===
          option.proper?.trim().toLowerCase()
        );
      });
      if (isCorrect) {
        if (tab === quiz.length - 1) return setAllCorrect(true);
        return setTab(tab + 1);
      }
    } else {
      const options = quiz[tab].options;
      const filtered = options.filter((x) => x.isCorrect);
      if (filtered.every((x) => x.selected)) {
        if (tab === quiz.length - 1) return setAllCorrect(true);
        return setTab(tab + 1);
      }
    }

    setQuiz((prev) => {
      const newQuiz = [...prev];
      newQuiz[tab].options = newQuiz[tab].options.sort(
        () => Math.random() - 0.5
      );
      newQuiz[tab].isCorrect = false;
      return newQuiz;
    });
  };

  if (allCorrect) {
    return (
      <div className='h-[250px] flex flex-col gap-1 items-center justify-center border w-4/5 mx-auto rounded-lg p-5 bg-background'>
        <div className='text-lg text-center font-semibold'>Поздравляю!</div>
        <div className='text-muted-foreground text-center text-sm'>
          Вы успешно прошли викторину
        </div>
      </div>
    );
  }

  if (quiz[tab]?.writable) {
    return (
      <div className='space-y-6 border sm:w-4/5 mx-auto rounded-lg p-5 bg-background'>
        {quiz[tab]?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className='aspect-video rounded-lg object-cover w-full'
            src={quiz[tab]?.image}
            alt=''
          />
        )}
        <div className='text-base text-center'>
          <div className='text-muted-foreground text-xs'>Вопрос {tab + 1}</div>
          <div className='font-medium'>{quiz[tab]?.prompt}</div>
        </div>
        <div className='space-y-4'>
          <div className='text-muted-foreground text-xs text-center'>
            Варианты ответов
          </div>
          <div className='flex justify-center items-center'>
            {quiz[tab]?.options.map((o, j) => (
              <Input
                key={j}
                placeholder='Напишите ответ...'
                className='w-full'
                value={o.response}
                onChange={(e) => {
                  setQuiz((prev) => {
                    const newQuiz = [...prev];
                    if (!newQuiz[tab].writable) return newQuiz;
                    newQuiz[tab].options[j].response = e.target.value;
                    return newQuiz;
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleNext();
                  }
                }}
              />
            ))}
          </div>
          {quiz[tab].isCorrect === false && (
            <div className='text-destructive text-center text-sm'>
              Пожалуйста, напишите правильный ответ
            </div>
          )}
        </div>
        <div className='w-full flex items-end'>
          <Button
            type='button'
            variant='outline'
            onClick={() => handleNext()}
            className='ml-auto'
          >
            Проверить ответ
          </Button>
        </div>
        <div className='flex items-center justify-center gap-1'>
          {Array.from({ length: quiz.length }).map((_, i) => (
            <div
              className={`rounded-full ${tab === i
                  ? "w-4 h-2 bg-muted-foreground"
                  : "w-2 h-2 bg-muted border"
                }`}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }

  if (quiz[tab]?.options?.some((x) => x.image)) {
    return (
      <div className='space-y-6 border sm:w-4/5 mx-auto rounded-lg p-5 bg-background'>
        {quiz[tab]?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className='aspect-video rounded-lg object-cover w-full'
            src={quiz[tab]?.image}
            alt=''
          />
        )}
        <div className='text-base text-center'>
          <div className='text-muted-foreground text-xs'>Вопрос {tab + 1}</div>
          <div className='font-medium'>{quiz[tab]?.prompt}</div>
        </div>
        <div className='space-y-4'>
          <div className='text-muted-foreground text-xs text-center'>
            Варианты ответов
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            {quiz[tab]?.options.map((o, j) => (
              <Button
                key={j}
                variant='outline'
                className={`flex-col h-auto p-2 gap-2 font-normal text-left text-sm ${o.selected ? "bg-accent" : ""
                  }`}
                onClick={() => handleClick(j)}
              >
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
                <div className='whitespace-pre-wrap'>{o.text}</div>
              </Button>
            ))}
          </div>
          {quiz[tab].options.filter((o) => o.isCorrect)?.length > 1 ? (
            <div className='text-muted-foreground text-center text-sm'>
              Выберите несколько правильных ответов
            </div>
          ) : null}
          {quiz[tab].isCorrect === false && (
            <div className='text-destructive text-center text-sm'>
              Пожалуйста, выберите правильный ответ
            </div>
          )}
        </div>
        <div className='w-full flex items-end'>
          <Button
            type='button'
            variant='outline'
            onClick={() => handleNext()}
            className='ml-auto'
          >
            Проверить ответ
          </Button>
        </div>
        <div className='flex items-center justify-center gap-1'>
          {Array.from({ length: quiz.length }).map((_, i) => (
            <div
              className={`rounded-full ${tab === i
                  ? "w-4 h-2 bg-muted-foreground"
                  : "w-2 h-2 bg-muted border"
                }`}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6 border sm:w-4/5 mx-auto rounded-lg p-5 bg-background'>
      {quiz[tab]?.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className='aspect-video rounded-lg object-cover w-full'
          src={quiz[tab]?.image}
          alt=''
        />
      )}
      <div className='text-base text-center'>
        <div className='text-muted-foreground text-xs'>Вопрос {tab + 1}</div>
        <div className='font-medium'>{quiz[tab]?.prompt}</div>
      </div>
      <div className='space-y-4'>
        <div className='text-muted-foreground text-xs text-center'>
          Варианты ответов
        </div>
        <div className='flex flex-col gap-1'>
          {quiz[tab]?.options.map((o, j) => {
            return (
              <Button
                key={j}
                variant='outline'
                className={`justify-start h-auto gap-2 text-left ${o.selected ? "bg-accent" : ""
                  }`}
                onClick={() => handleClick(j)}
              >
                <div
                  className={`flex shrink-0 items-center justify-center h-6 w-6 text-white rounded-full ${o.selected ? "bg-blue-500" : "bg-blue-300 dark:bg-blue-900"
                    }`}
                >
                  {j + 1}
                </div>
                <span className='whitespace-pre-wrap'>{o.text}</span>
              </Button>
            );
          })}
        </div>
        {quiz[tab].options.filter((o) => o.isCorrect)?.length > 1 ? (
          <div className='text-muted-foreground text-center text-sm'>
            Выберите несколько правильных ответов
          </div>
        ) : null}
        {quiz[tab].isCorrect === false && (
          <div className='text-destructive text-center text-sm'>
            Пожалуйста, выберите правильный ответ
          </div>
        )}
      </div>
      <div className='w-full flex items-end'>
        <Button
          type='button'
          variant='outline'
          onClick={() => handleNext()}
          className='ml-auto'
        >
          Проверить ответ
        </Button>
      </div>
      <div className='flex items-center justify-center gap-1'>
        {Array.from({ length: quiz.length }).map((_, i) => (
          <div
            className={`rounded-full ${tab === i
                ? "w-4 h-2 bg-muted-foreground"
                : "w-2 h-2 bg-muted border"
              }`}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
