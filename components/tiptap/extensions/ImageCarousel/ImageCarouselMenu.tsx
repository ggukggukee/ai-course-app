'use client';

import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import { useCallback, useRef } from "react";
import { Instance, sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import { Toolbar } from "../../components/ui/Toolbar";
import { Icon } from "../../components/ui/Icon";
import { ImageBlockWidth } from "../ImageBlock/components/ImageBlockWidth";
import { MenuProps } from "../../components/menus/types";
import { getRenderContainer } from "../../lib/utils";

export const ImageCarouselMenu = ({
  editor,
  appendTo,
}: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance | null>(null);

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "node-carousel");
    const rect =
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("carousel");

    return isActive;
  }, [editor]);

  const onAlignImageLeft = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setCarouselAlign("left")
      .run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setCarouselAlign("center")
      .run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setCarouselAlign("right")
      .run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setCarouselWidth(value)
        .run();
    },
    [editor]
  );

  const { isImageCenter, isImageLeft, isImageRight, width } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isImageLeft: ctx.editor.isActive("carousel", { align: "left" }),
        isImageCenter: ctx.editor.isActive("carousel", { align: "center" }),
        isImageRight: ctx.editor.isActive("carousel", { align: "right" }),
        width: parseInt(ctx.editor.getAttributes("carousel")?.width || 0),
      };
    },
  });

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`carouselMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance;
        },
        appendTo: () => {
          return appendTo?.current;
        },
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Toolbar.Wrapper shouldShowContent={shouldShow()} ref={menuRef}>
        <Toolbar.Button
          tooltip='Align image left'
          active={isImageLeft}
          onClick={onAlignImageLeft}
        >
          <Icon name='AlignHorizontalDistributeStart' />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip='Align image center'
          active={isImageCenter}
          onClick={onAlignImageCenter}
        >
          <Icon name='AlignHorizontalDistributeCenter' />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip='Align image right'
          active={isImageRight}
          onClick={onAlignImageRight}
        >
          <Icon name='AlignHorizontalDistributeEnd' />
        </Toolbar.Button>
        <Toolbar.Divider />
        <ImageBlockWidth onChange={onWidthChange} value={width} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ImageCarouselMenu;
