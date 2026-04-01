"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { useRef, useCallback, useState } from "react";

interface PostEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function PostEditor({ content, onChange }: PostEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExt.configure({ openOnClick: false }),
      ImageExt.configure({ inline: true, allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[300px] p-3",
      },
    },
  });

  const uploadImage = useCallback(async (file: File) => {
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload selhal");
      if (data.url && editor) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload selhal");
    } finally {
      setUploading(false);
    }
  }, [editor]);

  if (!editor) return null;

  const btn = (label: string, action: () => void, active?: boolean, title?: string) => (
    <button
      type="button"
      onClick={action}
      title={title}
      className={`px-2 py-1 text-sm rounded border transition-colors ${
        active
          ? "bg-[#1a3a6b] text-white border-[#1a3a6b]"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="tiptap-editor border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-300">
        {/* Formátování textu */}
        {btn("B", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"), "Tučné")}
        {btn("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"), "Kurzíva")}
        <span className="w-px bg-gray-300 mx-1" />

        {/* Nadpisy */}
        {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }), "Nadpis 2")}
        {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }), "Nadpis 3")}
        <span className="w-px bg-gray-300 mx-1" />

        {/* Zarovnání */}
        {btn("⬅", () => editor.chain().focus().setTextAlign("left").run(), editor.isActive({ textAlign: "left" }), "Zarovnat vlevo")}
        {btn("☰", () => editor.chain().focus().setTextAlign("center").run(), editor.isActive({ textAlign: "center" }), "Na střed")}
        {btn("➡", () => editor.chain().focus().setTextAlign("right").run(), editor.isActive({ textAlign: "right" }), "Zarovnat vpravo")}
        <span className="w-px bg-gray-300 mx-1" />

        {/* Seznamy */}
        {btn("• List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
        {btn("1. List", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
        <span className="w-px bg-gray-300 mx-1" />

        {/* Odkaz */}
        {btn("Odkaz", () => {
          const url = window.prompt("URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }, editor.isActive("link"))}
        {btn("✕ Odkaz", () => editor.chain().focus().unsetLink().run())}
        <span className="w-px bg-gray-300 mx-1" />

        {/* Upload fotky */}
        <label
          title="Vložit fotku"
          className={`px-2 py-1 text-sm rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer select-none ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {uploading ? "⏳ Nahrávám..." : "📷 Fotka"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file);
              e.target.value = "";
            }}
          />
        </label>

        {/* Plovoucí obrázek vedle textu */}
        <button
          type="button"
          title="Fotka vlevo (text vedle)"
          onClick={() => {
            const { state } = editor;
            const { selection } = state;
            const node = state.doc.nodeAt(selection.from);
            if (node?.type.name === "image") {
              const currentStyle = node.attrs.style || "";
              const newStyle = currentStyle.includes("float: left")
                ? currentStyle.replace(/float:\s*left;\s*/g, "")
                : "float: left; margin: 0 1rem 0.5rem 0; " + currentStyle;
              editor.chain().focus().updateAttributes("image", { style: newStyle }).run();
            }
          }}
          className="px-2 py-1 text-sm rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors"
        >
          ◧ Vlevo
        </button>
        <button
          type="button"
          title="Fotka vpravo (text vedle)"
          onClick={() => {
            const { state } = editor;
            const { selection } = state;
            const node = state.doc.nodeAt(selection.from);
            if (node?.type.name === "image") {
              const currentStyle = node.attrs.style || "";
              const newStyle = currentStyle.includes("float: right")
                ? currentStyle.replace(/float:\s*right;\s*/g, "")
                : "float: right; margin: 0 0 0.5rem 1rem; " + currentStyle;
              editor.chain().focus().updateAttributes("image", { style: newStyle }).run();
            }
          }}
          className="px-2 py-1 text-sm rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors"
        >
          ◨ Vpravo
        </button>
      </div>

      {uploadError && (
        <p className="text-red-600 text-xs px-3 py-1 bg-red-50 border-b border-red-200">
          ⚠️ {uploadError}
        </p>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
