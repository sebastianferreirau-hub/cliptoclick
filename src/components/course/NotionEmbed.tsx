import React from "react";

interface NotionEmbedProps {
  pageId: string;
}

export function NotionEmbed({ pageId }: NotionEmbedProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <iframe
        src={`https://www.notion.so/${pageId}`}
        className="w-full h-[70vh] border-0"
        title="Recursos del curso"
      />
    </div>
  );
}
