import { cn } from "@/lib/utils";
import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { getEmbedUrlFromYoutubeUrl } from "./utils";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditorProps {
  solid?: boolean;
}

interface YoutubeViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (
    attrs: Record<string, string | { type: string; src: string }[]>
  ) => void;
}

export const YoutubeView = (props: YoutubeViewProps) => {
  const { editor, getPos, node, updateAttributes } =
    props as YoutubeViewProps & {
      node: Node & {
        attrs: {
          src: string;
          align: "left" | "right" | "center";
          width: string;
          links: {
            type: "youtube" | "rutube" | "kinescope";
            src: string;
          }[];
        };
      };
    };

  const videoType = localStorage.getItem("videoType");
  const [type, setType] = useState(videoType || "youtube");

  const imageWrapperRef = useRef(null);
  const { src } = node.attrs;

  const wrapperClassName = cn(
    node.attrs.align === "left" ? "ml-0" : "ml-auto",
    node.attrs.align === "right" ? "mr-0" : "mr-auto",
    node.attrs.align === "center" && "mx-auto"
  );

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [getPos, editor.commands]);

  const embedUrl = getEmbedUrlFromYoutubeUrl({ url: src, controls: true });

  const links = useMemo(
    () => [
      ...(embedUrl ? [{ type: "youtube", src: embedUrl }] : []),
      ...(node.attrs.links || []),
    ],
    [node.attrs, embedUrl]
  );

  const link = useMemo(() => {
    const found = links.find((x) => x.type === type);
    if (!found) return embedUrl;
    return found.src;
  }, [links, type, embedUrl]);

  const solid = (editor.options.editorProps as EditorProps)?.solid || false;
  const editable = editor.options.editable;

  const handleAdd = useCallback(
    (type: string) => {
      if (type === "youtube") {
        toast.error("Ссылка Youtube уже добавлена");
        return;
      }

      if (type === "rutube") {
        const link = node.attrs?.links?.find((x) => x.type === "rutube");

        const url = window.prompt("Введите URL видео", link?.src || "");

        if (url === null) return;

        if (url === "") {
          const links = node.attrs.links || [];
          const filtered = links.filter((x) => x.type !== "rutube");

          updateAttributes({ links: filtered });
          toast.success("Ссылка Rutube удалена");
          return;
        }

        const isRutube = isRutubeUrl(url);
        if (!isRutube) {
          toast.error("Неверная ссылка Rutube");
          return;
        }

        const videoId = getRutubeVideoId(url);
        if (!videoId) {
          toast.error("Неверная ссылка Rutube");
          return;
        }

        const embedUrl = `https://rutube.ru/play/embed/${videoId}`;

        const links = node.attrs.links || [];
        const filtered = links.filter((x) => x.type !== "rutube");
        const updated = [...filtered, { type: "rutube", src: embedUrl }];

        updateAttributes({ links: updated });
        toast.success("Ссылка Rutube добавлена");
      }

      if (type === "kinescope") {
        const link = node.attrs?.links?.find((x) => x.type === "kinescope");

        const url = window.prompt("Введите URL видео", link?.src || "");

        if (url === null) return;

        if (url === "") {
          const links = node.attrs.links || [];
          const filtered = links.filter((x) => x.type !== "kinescope");

          updateAttributes({ links: filtered });
          toast.success("Ссылка Kinescope удалена");
          return;
        }

        const links = node.attrs.links || [];
        const filtered = links.filter((x) => x.type !== "kinescope");
        const updated = [...filtered, { type: "kinescope", src: url }];

        updateAttributes({ links: updated });
        toast.success("Ссылка Kinescope добавлена");
      }
    },
    [node.attrs, updateAttributes]
  );

  const changeType = useCallback(
    (type: string) => {
      const found = links.find((x) => x.type === type);

      if (!found) {
        toast.error("Ссылка не найдена");
        return;
      }

      localStorage.setItem("videoType", type);

      setType(type);
    },
    [links]
  );

  if (editor.options.editable) {
    return (
      <NodeViewWrapper>
        <div
          className={wrapperClassName}
          style={{ width: node.attrs.width }}
          data-drag-handle
        >
          <div
            contentEditable={false}
            ref={imageWrapperRef}
            className='relative'
          >
            <iframe
              className={`block w-full aspect-video pointer-events-none ${
                solid && !editable ? "!border-none !rounded-none" : ""
              }`}
              src={embedUrl || ""}
              title='iframe'
              rel='0'
              onClick={onClick}
              allowFullScreen
            />
            <Links
              links={[{ type: "rutube" }, { type: "kinescope" }]}
              handleAdd={handleAdd}
            />
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <div className={wrapperClassName} style={{ width: node.attrs.width }}>
        <div contentEditable={false} ref={imageWrapperRef} className='relative'>
          <iframe
            className={`block w-full aspect-video ${
              solid && !editable ? "!border-none !rounded-none" : ""
            }`}
            src={link || ""}
            title='iframe'
            rel='0'
            onClick={onClick}
            allowFullScreen
          />
          {links.length > 1 && <Links links={links} changeType={changeType} />}
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default YoutubeView;

function Links({
  links,
  changeType,
  handleAdd,
}: {
  links: { type: string }[];
  changeType?: (type: string) => void;
  handleAdd?: (type: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          type='button'
          variant='secondary'
          className='z-10 absolute top-2 right-2 rounded-full h-8 w-8'
        >
          <ChevronDown className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-fit' align='end'>
        <DropdownMenuGroup>
          {links.map((link, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() =>
                handleAdd ? handleAdd(link.type) : changeType?.(link.type)
              }
            >
              {getTypeTitle(link.type)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function isRutubeUrl(text: string) {
  try {
    // Attempt to create a new URL object from the text
    const url = new URL(text);

    // Check if the hostname contains 'rutube'
    return url.hostname.includes("rutube");
  } catch (error) {
    console.error(error);
    // If an error is thrown, the text is not a valid URL
    return false;
  }
}

function getRutubeVideoId(url: string) {
  try {
    // Create a new URL object
    const urlObj = new URL(url);

    // Split the pathname by '/' and filter out empty strings
    const pathParts = urlObj.pathname
      .split("/")
      .filter((part) => part.length > 0);

    // The video ID should be the last part of the pathname
    const videoId = pathParts.pop();

    if (url.includes("private")) {
      const params = new URL(url).searchParams;
      const p = params.get("p");
      if (!p) return null;
      return videoId + "/?p=" + p;
    }

    return videoId;
  } catch (error) {
    console.error(error);
    // Return null if the URL is not valid
    return null;
  }
}

function getTypeTitle(type: string) {
  if (type === "rutube") {
    return "Rutube";
  }
  if (type === "youtube") {
    return "Youtube";
  }
  if (type === "kinescope") {
    return "Kinescope";
  }
  return "Видео";
}
