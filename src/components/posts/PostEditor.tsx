"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

interface PostEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function PostEditor({ content, onChange }: PostEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[200px] p-3",
      },
    },
  });

  if (!editor) return null;

  const btn = (label: string, action: () => void, active?: boolean) => (
    <button
      type="button"
      onClick={action}
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
        {btn("B", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
        {btn("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
        {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
        {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
        {btn("• Seznam", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
        {btn("1. Seznam", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
        {btn("Odkaz", () => {
          const url = window.prompt("URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }, editor.isActive("link"))}
        {btn("Odebrat odkaz", () => editor.chain().focus().unsetLink().run())}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
