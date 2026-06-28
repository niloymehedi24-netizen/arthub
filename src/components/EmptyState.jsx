"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Picture } from "@gravity-ui/icons";

export default function EmptyState({
  title = "Nothing Found",
  description = "There's nothing to display right now.",
  buttonText,
  buttonHref,
  onButtonClick,
  icon: Icon = Picture,
}) {
  return (
    <div className="flex min-h-112.5 items-center justify-center">
      <div className="max-w-lg rounded-3xl border border-default-200 bg-linear-to-br from-fuchsia-50 via-white to-cyan-50 p-10 text-center shadow-xl dark:from-default-100 dark:via-background dark:to-default-100">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-r from-fuchsia-500/10 to-cyan-500/10">
          <Icon className="h-12 w-12 text-fuchsia-500" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-black text-foreground">{title}</h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-default-500">{description}</p>

        {/* Action Button */}
        {buttonText && (buttonHref || onButtonClick) && (
          <div className="mt-8">
            {buttonHref ? (
              <Button
                as={Link}
                href={buttonHref}
                className="bg-linear-to-r from-fuchsia-500 to-cyan-500 font-bold text-white"
              >
                {buttonText}
              </Button>
            ) : (
              <Button
                onPress={onButtonClick}
                className="bg-linear-to-r from-fuchsia-500 to-cyan-500 font-bold text-white"
              >
                {buttonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
