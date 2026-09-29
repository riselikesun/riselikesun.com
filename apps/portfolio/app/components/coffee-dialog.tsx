"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@riselikesun/ui";
import config from "../config";
import { BlobImage } from "@/components/ui/blob-image";

export function CoffeeDialog() {
  return (
    <Dialog closeOnBackButton>
      <DialogTrigger asChild>
        <Button cursor="pointer">
          ☕ Let's Grab a Coffee
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-200">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="hidden md:block w-3/4 relative h-40 min-h-100">
            <BlobImage
              src="/coffee-me.jpeg"
              alt="Coffee with Suraj"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <DialogHeader className="mb-4 md:mb-6 text-left">
              <DialogTitle className="text-xl md:text-2xl">
                Let's grab a coffee
              </DialogTitle>
              <DialogDescription className="text-base">
                I'm always open to discussing new ideas or just having a chat.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <div className="block md:hidden w-full relative h-50 min-h-40">
                <BlobImage
                  src="/coffee-me.jpeg"
                  alt="Coffee with Suraj"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <Button asChild variant="outline" cursor="pointer">
                <a
                  href={config.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on LinkedIn
                </a>
              </Button>

              <Button asChild variant="outline" cursor="pointer">
                <a href={`mailto:${config.email}`}>Email me</a>
              </Button>

              <Button asChild cursor="pointer" >
                <a
                  href={config.calendarURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}