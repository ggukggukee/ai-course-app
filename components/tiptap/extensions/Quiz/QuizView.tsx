import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import Upper from "./components/Upper";
import Middle from "./components/Middle";
import Bottom from "./components/Bottom";
import Questions from "./components/Questions";
import Errors from "./components/Errors";
import Questions2 from "./components/Questions2";
import { HelpCircle } from "lucide-react";
import QuizImage from "./components/QuizImage";
import { Node } from "@tiptap/pm/model";
import { QuizType } from "./Quiz";

interface QuizViewProps {
  editor: Editor;
  node: Node;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateAttributes: (attrs: Record<string, any>) => void;
}

export default function QuizView(props: QuizViewProps) {
  const { editor, node, updateAttributes } = props as QuizViewProps & {
    node: Node & {
      attrs: {
        quiz: QuizType[];
      };
    };
  };

  const [quiz, setQuiz] = useState(node.attrs.quiz);
  const [tab, setTab] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!editor.options.editable) return;

    if (quiz) {
      const newMessages: string[] = [];

      quiz.forEach((q, i) => {
        if (!q.prompt) {
          newMessages.push(`Вопрос ${i + 1} не заполнен`);
        }
        if (q.writable) {
          if ("proper" in q.options[0] && !q.options[0].proper) {
            newMessages.push(`Ответ в вопросе ${i + 1} не заполнен`);
          }
          if (q.options.length > 1) {
            newMessages.push(
              `В вопросе ${i + 1} должен быть только один вариант ответа`
            );
          }
        } else {
          q.options.forEach((o, j) => {
            if ("text" in o && !o.text) {
              newMessages.push(
                `Вариант ${j + 1} в вопросе ${i + 1} не заполнен`
              );
            }
          });
          if (q.options.every((o) => !("isCorrect" in o))) {
            newMessages.push(`В вопросе ${i + 1} нет правильного ответа`);
          }
        }
      });

      setMessages(newMessages);
    }
  }, [editor.options.editable, quiz]);

  if (!editor.options.editable) {
    return (
      <NodeViewWrapper>
        <div className='bg-accent rounded-lg p-3 pt-5 sm:p-5'>
          <div className='space-y-6'>
            <Intro />
            <Questions
              quiz={quiz}
              setQuiz={setQuiz}
              tab={tab}
              setTab={setTab}
            />
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <div className='bg-accent rounded-lg p-5'>
        <div className='space-y-6'>
          <Upper
            updateAttributes={updateAttributes}
            quiz={quiz}
            setQuiz={setQuiz}
            tab={tab}
            setTab={setTab}
          />
          <QuizImage
            updateAttributes={updateAttributes}
            quiz={quiz}
            setQuiz={setQuiz}
            tab={tab}
          />
          <Middle
            updateAttributes={updateAttributes}
            quiz={quiz}
            setQuiz={setQuiz}
            tab={tab}
          />
          <Questions2
            updateAttributes={updateAttributes}
            quiz={quiz}
            setQuiz={setQuiz}
            tab={tab}
          />
          <Bottom
            updateAttributes={updateAttributes}
            quiz={quiz}
            setQuiz={setQuiz}
            tab={tab}
            setTab={setTab}
          />
          <Errors messages={messages} />
        </div>
      </div>
    </NodeViewWrapper>
  );
}

const Intro = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <div className='flex items-center justify-center h-10 w-10 bg-purple-500 rounded-full'>
        <HelpCircle className='w-6 h-6 text-white' />
      </div>
      <div className='space-y-1 text-center'>
        <div className='text-base font-semibold'>
          Пришло время пройти викторину!
        </div>
        <div className='text-muted-foreground text-sm'>
          Проверьте свои знания и посмотрите, что вы только что узнали.
        </div>
      </div>
    </div>
  );
};
