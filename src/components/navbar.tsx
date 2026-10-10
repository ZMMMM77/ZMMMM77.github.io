import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  FolderOpen,
  GraduationCap,
  Mail,
  NotebookPen,
} from "lucide-react";
import { site } from "@/data/profile";

export default function Navbar() {
  const enabled = new Set(
    site.sections.filter((s) => s.enabled).map((s) => s.id),
  );
  const items = [
    { href: "/#hero", label: "首页", icon: Home, show: true },
    {
      href: "/#education",
      label: "教育",
      icon: GraduationCap,
      show: enabled.has("education"),
    },
    {
      href: "/#projects",
      label: "项目",
      icon: FolderOpen,
      show: enabled.has("projects"),
    },
    { href: "/blog/", label: "笔记", icon: NotebookPen, show: true },
    {
      href: "/#contact",
      label: "联系",
      icon: Mail,
      show: enabled.has("contact"),
    },
  ];
  return (
    <nav
      aria-label="主导航"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-30 pb-[env(safe-area-inset-bottom)]"
    >
      <Dock
        magnification={44}
        className="pointer-events-auto mx-auto h-14 w-fit gap-1 bg-card/90 p-2 shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl sm:gap-2"
      >
        {items
          .filter((item) => item.show)
          .map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  aria-label={item.label}
                  className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <DockIcon className="border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <item.icon className="size-full" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>{item.label}</TooltipContent>
            </Tooltip>
          ))}
        <span className="mx-1 my-auto h-6 w-px bg-border" aria-hidden="true" />
        <DockIcon className="border bg-background text-muted-foreground">
          <ModeToggle className="size-full" />
        </DockIcon>
      </Dock>
    </nav>
  );
}
