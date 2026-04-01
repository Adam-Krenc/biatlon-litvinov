"use client";

import { Image } from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { useCallback, useRef } from "react";

function ResizableImageView({ node, updateAttributes, selected }: NodeViewProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startWidth = imgRef.current?.offsetWidth ?? 200;

      const onMove = (ev: MouseEvent) => {
        const w = Math.max(40, startWidth + ev.clientX - startX);
        updateAttributes({ width: w });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [updateAttributes]
  );

  const { src, alt, title, width, style: attrStyle } = node.attrs;
  const float = (attrStyle as string | null)?.match(/float:\s*(left|right)/)?.[1] as
    | "left"
    | "right"
    | undefined;
  const margin =
    float === "left"
      ? "0 1rem 0.5rem 0"
      : float === "right"
      ? "0 0 0.5rem 1rem"
      : undefined;

  return (
    <NodeViewWrapper
      as="span"
      data-drag-handle
      style={{
        display: "inline-block",
        position: "relative",
        float,
        margin,
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <img
        ref={imgRef}
        src={src as string}
        alt={(alt as string) ?? ""}
        title={(title as string) ?? ""}
        draggable={false}
        style={{
          display: "block",
          width: width ? `${width}px` : undefined,
          maxWidth: "100%",
          outline: selected ? "2px solid #3b82f6" : "none",
          outlineOffset: 2,
        }}
      />
      {selected && (
        <span
          onMouseDown={onResizeMouseDown}
          style={{
            position: "absolute",
            bottom: -4,
            right: -4,
            width: 12,
            height: 12,
            background: "#3b82f6",
            borderRadius: 2,
            cursor: "se-resize",
            display: "block",
          }}
        />
      )}
    </NodeViewWrapper>
  );
}

export const ResizableImage = Image.extend({
  addOptions() {
    return { ...this.parent?.(), inline: true, allowBase64: false };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => {
          const w = el.getAttribute("width");
          return w ? parseInt(w, 10) : null;
        },
        renderHTML: (attrs) => (attrs.width ? { width: String(attrs.width) } : {}),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});
