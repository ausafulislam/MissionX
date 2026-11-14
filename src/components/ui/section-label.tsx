import type { ReactNode } from "react";
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <span className="eyebrow">
      <b>{number}</b> {children}
    </span>
  );
}
