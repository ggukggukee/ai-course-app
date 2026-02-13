import { useUpload } from "../../hooks/useUpload";
import { Node } from "@tiptap/pm/model";
import { useCallback, useRef, useState } from "react";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Pen, PlusIcon, Trash } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import { cn } from "@/lib/utils";

interface EditorProps {
  solid?: boolean;
}

interface ImageCarouselViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string | string[]>) => void;
}

const ImageCarouselView = (props: ImageCarouselViewProps) => {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const { loading, uploadFile } = useUpload();

  const addRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);

  const { node, editor, updateAttributes } = props as ImageCarouselViewProps & {
    node: Node & {
      attrs: {
        images: string[];
        width: string;
        align: "left" | "center" | "right";
      };
    };
  };

  const handleDelete = useCallback(() => {
    if (node.attrs.images.length < 2) return;

    const newArr = [...node.attrs.images];
    newArr.splice(current, 1);
    updateAttributes({ images: newArr });
  }, [current, node.attrs.images, updateAttributes]);

  const handleAdd = useCallback(() => {
    addRef.current?.click();
  }, []);

  const handleEdit = useCallback(() => {
    editRef.current?.click();
  }, []);

  const onImageAdd = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const fileData = event.target?.result;
        if (!fileData) return;
        if (!(fileData instanceof ArrayBuffer)) return;

        const url = await uploadFile(files[0], fileData);
        if (!url) return;

        const newArr = [...node.attrs.images];
        newArr.push(url);

        updateAttributes({ images: newArr });
      };

      reader.readAsArrayBuffer(file);
    },
    [uploadFile, node.attrs.images, updateAttributes]
  );

  const onImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const fileData = event.target?.result;
        if (!fileData) return;
        if (!(fileData instanceof ArrayBuffer)) return;

        const url = await uploadFile(files[0], fileData);
        if (!url) return;

        const newArr = [...node.attrs.images];
        newArr[current] = url;
        updateAttributes({ images: newArr });
      };

      reader.readAsArrayBuffer(file);
    },
    [uploadFile, node.attrs.images, current, updateAttributes]
  );

  const solid = (editor.options.editorProps as EditorProps)?.solid || false;
  const editable = editor.options.editable;

  const wrapperClassName = cn(
    node.attrs.align === "left" ? "ml-0" : "ml-auto",
    node.attrs.align === "right" ? "mr-0" : "mr-auto",
    node.attrs.align === "center" && "mx-auto",
    "flex relative"
  );

  if (editor.options.editable) {
    return (
      <NodeViewWrapper
        className={wrapperClassName}
        style={{ width: node.attrs.width || "100%" }}
      >
        <div className='relative w-full'>
          <Swiper
            className='w-full pointer-events-none'
            modules={[Pagination]}
            pagination={{ clickable: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onRealIndexChange={(swiper) => {
              setCurrent(swiper.activeIndex);
            }}
            spaceBetween={50}
            slidesPerView={1}
            autoHeight
          >
            {node.attrs.images.map((image, i) => (
              <SwiperSlide key={i}>
                <div className='relative w-full'>
                  <SliderImage src={image} solid={solid} editable={editable} />
                  <Button
                    size='icon'
                    variant='secondary'
                    type='button'
                    className='z-10 absolute top-2 left-2 rounded-full h-8 w-8 pointer-events-auto'
                    onClick={handleAdd}
                    disabled={loading}
                  >
                    <PlusIcon className='w-4 h-4' />
                  </Button>
                  <Button
                    size='icon'
                    variant='secondary'
                    type='button'
                    className='z-10 absolute top-2 right-2 rounded-full h-8 w-8 pointer-events-auto'
                    onClick={handleEdit}
                    disabled={loading}
                  >
                    <Pen className='w-4 h-4' />
                  </Button>
                  {node.attrs.images.length > 1 && (
                    <Button
                      size='icon'
                      variant='secondary'
                      type='button'
                      className='z-10 absolute top-2 right-11 rounded-full h-8 w-8 pointer-events-auto'
                      onClick={handleDelete}
                      disabled={loading}
                    >
                      <Trash className='w-4 h-4' />
                    </Button>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {current !== 0 && (
            <Button
              onClick={() => swiperRef.current?.slidePrev()}
              variant='secondary'
              type='button'
              className='z-10 absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 left-2 bg-secondary/20 pointer-events-auto'
            >
              <ArrowLeft className='h-4 w-4 shrink-0' />
            </Button>
          )}
          {current !== node.attrs.images?.length - 1 && (
            <Button
              onClick={() => swiperRef.current?.slideNext()}
              variant='secondary'
              type='button'
              className='z-10 absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 right-2 bg-secondary/20 pointer-events-auto'
            >
              <ArrowRight className='h-4 w-4 shrink-0' />
            </Button>
          )}
        </div>
        <input
          className='w-0 h-0 overflow-hidden opacity-0'
          ref={addRef}
          type='file'
          accept='.jpg,.jpeg,.png,.webp,.gif'
          onChange={onImageAdd}
        />
        <input
          className='w-0 h-0 overflow-hidden opacity-0'
          ref={editRef}
          type='file'
          accept='.jpg,.jpeg,.png,.webp,.gif'
          onChange={onImageChange}
        />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      className={wrapperClassName}
      style={{ width: node.attrs.width || "100%" }}
    >
      <div className='relative w-full'>
        <Swiper
          className='w-full'
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onRealIndexChange={(swiper) => {
            setCurrent(swiper.activeIndex);
          }}
          spaceBetween={50}
          slidesPerView={1}
          autoHeight
        >
          {node.attrs.images.map((image, i) => (
            <SwiperSlide key={i}>
              <div className='relative w-full'>
                <SliderImage src={image} solid={solid} editable={editable} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {current !== 0 && (
          <Button
            onClick={() => swiperRef.current?.slidePrev()}
            variant='secondary'
            type='button'
            className='z-10 absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 left-2 bg-secondary/20'
          >
            <ArrowLeft className='h-4 w-4 shrink-0' />
          </Button>
        )}
        {current !== node.attrs.images?.length - 1 && (
          <Button
            onClick={() => swiperRef.current?.slideNext()}
            variant='secondary'
            type='button'
            className='z-10 absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 right-2 bg-secondary/20'
          >
            <ArrowRight className='h-4 w-4 shrink-0' />
          </Button>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ImageCarouselView;

const SliderImage = ({
  src,
  solid,
  editable,
}: {
  src: string;
  solid: boolean;
  editable: boolean;
}) => {
  let extension = "unknown";

  try {
    // Create URL object and get the pathname
    const url = new URL(src);
    // Get the filename from the pathname
    const filename = url.pathname.split("/").pop() || "";
    // Get extension from filename
    extension = filename.split(".").pop()?.toLowerCase() || "unknown";
  } catch (e) {
    console.log(e);
    // If not a valid URL, fallback to simple splitting
    extension =
      src.split("?")[0].split("#")[0].split(".").pop()?.toLowerCase() ||
      "unknown";
  }

  if (images.includes(extension)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=''
        className={`w-full ${solid && !editable ? "rounded-none!" : "rounded-lg"
          }`}
      />
    );
  }

  if (videos.includes(extension)) {
    return (
      <video
        src={src}
        className={`w-full ${solid && !editable ? "rounded-none!" : "rounded-lg"
          }`}
        controls
      />
    );
  }

  return (
    <div
      className={`w-full h-full aspect-video bg-secondary border text-center flex flex-col gap-1 items-center justify-center ${solid && !editable ? "rounded-none!" : "rounded-lg"
        }`}
    >
      <div className='text-sm'>Неизвестный формат</div>
      <div className='text-sm text-muted-foreground max-w-xs'>
        {src.split(".").pop()}
      </div>
    </div>
  );
};

const images = [
  "jpg",
  "png",
  "jpeg",
  "gif",
  "svg",
  "webp",
  "avif",
  "heic",
  "heif",
  "bmp",
  "ico",
  "tiff",
  "tif",
  "jp2",
  "j2k",
  "jpf",
  "jpx",
  "jpm",
  "mj2",
  "svgz",
];

const videos = [
  "mp4",
  "webm",
  "ogg",
  "ogv",
  "avi",
  "flv",
  "mov",
  "wmv",
  "m4v",
  "mkv",
  "3gp",
  "3g2",
];
