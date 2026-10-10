import Link from "next/link";
import { NotebookPen } from "lucide-react";

export const metadata = { title: "Notes" };

export default function BlogPage() {
  return (
    <main id="main" className="min-h-[60vh]">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Notes</h1>
      <div className="flex flex-col items-center gap-4 rounded-xl border py-20 text-muted-foreground">
        <NotebookPen className="size-8" strokeWidth={1} />
        <p className="text-sm">暂无内容</p>
      </div>
      <Link
        href="/"
        className="mt-8 inline-block text-sm underline underline-offset-4"
      >
        返回首页
      </Link>
    </main>
  );
}
