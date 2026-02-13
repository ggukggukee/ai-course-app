import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuid } from "uuid";
import { Node } from "@tiptap/pm/model";

interface DndViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (
    attrs: Record<
      string,
      {
        text: string;
        direction: string;
        question: { id: string; content: string }[];
        answer: { id: string; content: string }[];
      }
    >
  ) => void;
  selected: boolean;
}

export default function DndView(props: DndViewProps) {
  const { node, editor, selected, updateAttributes } = props as DndViewProps & {
    node: Node & {
      attrs: {
        items: {
          text: string;
          direction: string;
          question: { id: string; content: string }[];
          answer: { id: string; content: string }[];
        };
      };
    };
  };

  const [rows, setRows] = useState<{
    text: string;
    direction: string;
    question: { id: string; content: string }[];
    answer: { id: string; content: string }[];
  }>(node.attrs.items);
  const [message, setMessage] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setRows((r) => ({ ...r, text }));
    updateAttributes({ items: { ...rows, text } });
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const content = e.target.value;
    const items = [...rows.question];
    items[i].content = content;
    setRows((r) => ({ ...r, question: items }));
    props.updateAttributes({ items: { ...rows, question: items } });
  };

  const addItem = () => {
    const items = [...rows.question];
    items.push({ id: uuid(), content: "" });
    setRows((r) => ({ ...r, question: items }));
    props.updateAttributes({ items: { ...rows, question: items } });
  };

  const handleDelete = (i: number) => {
    const items = [...rows.question];
    items.splice(i, 1);
    setRows((r) => ({ ...r, question: items }));
    props.updateAttributes({ items: { ...rows, question: items } });
  };

  const handleDirectionChange = (checked: boolean) => {
    const direction = checked ? "vertical" : "horizontal";
    setRows((r) => ({ ...r, direction }));
    props.updateAttributes({ items: { ...rows, direction } });
  };

  const checkAnswer = () => {
    const answer = rows.answer.map((item) => item.id);
    const initial = rows.question.map((item) => item.id);

    if (!answer.length) return setMessage("Неправильно");

    if (answer.length !== initial.length) return setMessage("Неправильно");

    const isCorrect = answer.every((item, index) => item === initial[index]);
    if (isCorrect) {
      setMessage("Правильно");
    } else {
      setMessage("Неправильно");
    }
  };

  useEffect(() => {
    if (editor.options.editable) return;

    // Shuffle questions when not in edit mode
    const shuffleQuestions = () => {
      setRows((r) => {
        const questionsCopy = [...r.question];
        const shuffled = [];
        while (questionsCopy.length !== 0) {
          const randomIndex = Math.floor(Math.random() * questionsCopy.length);
          shuffled.push(questionsCopy[randomIndex]);
          questionsCopy.splice(randomIndex, 1);
        }
        return { ...r, question: shuffled };
      });
    };

    shuffleQuestions();
  }, [editor.options.editable]);

  if (editor.options.editable) {
    return (
      <NodeViewWrapper>
        <div
          className={`mt-6 not-prose border rounded-lg p-4  ${selected && editor.options.editable && "ProseMirror-selectednode"
            }`}
        >
          <div className='space-y-4'>
            <div className='space-y-1'>
              <Label>Заголовок</Label>
              <Input
                placeholder='Заголовок'
                value={rows.text || ""}
                onChange={handleTextChange}
              />
            </div>
            <div className='space-y-3'>
              <Label>Направление</Label>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='direction'
                  checked={rows.direction === "vertical"}
                  onCheckedChange={handleDirectionChange}
                />
                <Label htmlFor='direction' className='font-normal leading-none'>
                  Вертикально
                </Label>
              </div>
            </div>
            <div className='space-y-1'>
              <Label>Вопросы</Label>
              <div className='space-y-2'>
                {rows.question?.map((item, index) => (
                  <div key={item.id} className='flex items-center gap-2'>
                    <Input
                      placeholder='Вопрос'
                      value={item.content || ""}
                      onChange={(e) => handleContentChange(e, index)}
                    />
                    {rows.question?.length > 1 ? (
                      <Button
                        size='sm'
                        variant='outline'
                        type='button'
                        onClick={() => handleDelete(index)}
                      >
                        Удалить
                      </Button>
                    ) : null}
                  </div>
                ))}
                <Button
                  size='sm'
                  variant='outline'
                  type='button'
                  onClick={addItem}
                >
                  Добавить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <div
        className={`mt-6 not-prose border rounded-lg p-4  ${selected && editor.options.editable && "ProseMirror-selectednode"
          }`}
      >
        <div className='space-y-4'>
          <h4 className='text-lg font-bold'>{rows.text}</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, rows, setRows, setMessage)}
            onDragOver={(event) => handleDragOver(event, rows, setRows, setMessage)}
          >
            <AnswerDroppable
              items={rows.answer}
              direction={rows.direction}
              message={message}
            />
            <QuestionDroppable
              items={rows.question}
            />
          </DndContext>
          <div className='flex justify-between items-center'>
            <p
              className={`text-sm ${message === "Правильно" ? "text-green-600" : "text-destructive"
                }`}
            >
              {message}
            </p>
            <Button variant='outline' type='button' onClick={checkAnswer}>
              Проверить
            </Button>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
}

function SortableOption({
  item,
  direction,
}: {
  item: { id: string; content: string };
  direction: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none" as const,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`whitespace-nowrap bg-card border border-card dark:border-border shadow-md py-2 px-4 rounded-lg text-sm w-min h-min cursor-grab active:cursor-grabbing ${direction === "vertical" ? "mb-2" : "mr-2"
        }`}
    >
      {item.content}
    </div>
  );
}

function AnswerDroppable({
  items,
  direction,
  message,
}: {
  items: { id: string; content: string }[];
  direction: string;
  message: string;
}) {
  const itemIds = items.map(item => item.id);
  const strategy = direction === "vertical" ? verticalListSortingStrategy : horizontalListSortingStrategy;
  
  const { isOver, setNodeRef } = useDroppable({
    id: 'answer',
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        height:
          items && direction === "vertical"
            ? items?.length * 52
            : "100%",
      }}
      className={`relative overflow-x-auto border rounded-lg w-auto min-h-[64px] p-2 ${direction === "horizontal" ? "flex" : "flex flex-col"
        } ${message === "Правильно"
          ? "border-green-600 bg-green-50 dark:bg-green-900"
          : ""
        } ${isOver ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
    >
      <SortableContext items={itemIds} strategy={strategy}>
        {items.map((item) => (
          <SortableOption
            key={item.id}
            item={item}
            direction={direction}
          />
        ))}
      </SortableContext>
      {items.length === 0 && (
        <p className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-sm text-muted-foreground'>
          Перетащите сюда
        </p>
      )}
    </div>
  );
}

function QuestionDroppable({
  items,
}: {
  items: { id: string; content: string }[];
}) {
  const itemIds = items.map(item => item.id);
  
  const { isOver, setNodeRef } = useDroppable({
    id: 'question',
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative overflow-x-auto mt-16 flex items-start rounded-lg border p-2 ${items.length === 0 ? "h-12" : ""
        } ${isOver ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
    >
      <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
        {items.map((item) => (
          <SortableOption
            key={item.id}
            item={item}
            direction="horizontal"
          />
        ))}
      </SortableContext>
      {items.length === 0 && (
        <p className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-sm text-muted-foreground'>
          Список пуст
        </p>
      )}
    </div>
  );
}

const handleDragOver = (
  event: DragOverEvent,
  rows: {
    text: string;
    direction: string;
    question: { id: string; content: string }[];
    answer: { id: string; content: string }[];
  },
  setRows: React.Dispatch<
    React.SetStateAction<{
      text: string;
      direction: string;
      question: { id: string; content: string }[];
      answer: { id: string; content: string }[];
    }>
  >,
  setMessage: (message: string) => void
) => {
  const { active, over } = event;

  if (!over) return;

  const activeId = active.id;
  const overId = over.id;

  // Find which container the active item belongs to
  const activeContainer = findContainer(activeId, rows);
  
  // Check if we're over a droppable container or an item
  let overContainer: string | null = null;
  
  if (overId === 'answer' || overId === 'question') {
    // Dragging over a container
    overContainer = overId as string;
  } else {
    // Dragging over an item, find its container
    overContainer = findContainer(overId, rows);
  }

  if (!activeContainer || !overContainer) return;

  // If dragging between different containers
  if (activeContainer !== overContainer) {
    setMessage("");
    
    setRows((prev) => {
      const activeItems = prev[activeContainer as keyof typeof prev] as { id: string; content: string }[];
      const overItems = prev[overContainer as keyof typeof prev] as { id: string; content: string }[];

      const activeIndex = activeItems.findIndex((item) => item.id === activeId);

      if (activeIndex === -1) return prev;

      const newActiveItems = activeItems.filter((item) => item.id !== activeId);
      const newOverItems = [...overItems];
      
      const activeItem = activeItems[activeIndex];
      
      // If dropping over a container, add to the end
      // If dropping over an item, insert at that position
      let insertIndex = newOverItems.length;
      if (overId !== overContainer) {
        const overIndex = overItems.findIndex((item) => item.id === overId);
        if (overIndex >= 0) {
          insertIndex = overIndex;
        }
      }
      
      newOverItems.splice(insertIndex, 0, activeItem);

      return {
        ...prev,
        [activeContainer]: newActiveItems,
        [overContainer]: newOverItems,
      };
    });
  }
};

const handleDragEnd = (
  event: DragEndEvent,
  rows: {
    text: string;
    direction: string;
    question: { id: string; content: string }[];
    answer: { id: string; content: string }[];
  },
  setRows: React.Dispatch<
    React.SetStateAction<{
      text: string;
      direction: string;
      question: { id: string; content: string }[];
      answer: { id: string; content: string }[];
    }>
  >,
  setMessage: (message: string) => void
) => {
  const { active, over } = event;

  if (!over) return;

  const activeId = active.id;
  const overId = over.id;

  const activeContainer = findContainer(activeId, rows);
  
  // Check if we're over a droppable container or an item
  let overContainer: string | null = null;
  
  if (overId === 'answer' || overId === 'question') {
    // Dragging over a container
    overContainer = overId as string;
  } else {
    // Dragging over an item, find its container
    overContainer = findContainer(overId, rows);
  }

  if (!activeContainer || !overContainer) return;

  setMessage("");

  if (activeContainer === overContainer) {
    // Reordering within the same container
    setRows((prev) => {
      const items = prev[activeContainer as keyof typeof prev] as { id: string; content: string }[];
      const activeIndex = items.findIndex((item) => item.id === activeId);
      const overIndex = items.findIndex((item) => item.id === overId);

      if (activeIndex === -1 || overIndex === -1) return prev;

      const newItems = arrayMove(items, activeIndex, overIndex);

      return {
        ...prev,
        [activeContainer]: newItems,
      };
    });
  }
  // Cross-container movement is handled in handleDragOver
};

const findContainer = (
  id: UniqueIdentifier,
  rows: {
    question: { id: string; content: string }[];
    answer: { id: string; content: string }[];
  }
): string | null => {
  if (rows.question.find((item) => item.id === id)) {
    return "question";
  }
  if (rows.answer.find((item) => item.id === id)) {
    return "answer";
  }
  return null;
};

