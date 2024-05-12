"use client";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { LucideX } from "lucide-react";

export default function Modal({
  children,
  title,
  open,
  close,
}: {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  close: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={() => close()}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
