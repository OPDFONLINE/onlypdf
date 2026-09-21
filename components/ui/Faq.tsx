import { Plus } from "lucide-react";

export type FaqItem = { question: string; answer: string };

export function Faq({
  items,
  title = "Frequently asked questions",
}: {
  items: FaqItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      <dl className="mt-6 divide-y divide-border border-t border-border">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] font-medium text-ink">
              <span>{item.question}</span>
              <Plus
                size={18}
                className="shrink-0 text-ink-soft transition-transform group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {item.answer}
            </dd>
          </details>
        ))}
      </dl>
    </div>
  );
}
