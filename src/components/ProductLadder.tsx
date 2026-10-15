import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

type Props = {
  headingClassName: string;
  location: string;
  /** Show the one-line summary under each product. Off on sector and method pages. */
  detailed?: boolean;
  /** Link through to the What we do page. Off on the page itself. */
  showLink?: boolean;
};

export default function ProductLadder({ headingClassName, location, detailed = false, showLink = true }: Props) {
  return (
    <div>
      <dl className="divide-y divide-white/10 border-y border-white/10">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="grid gap-2 py-6 md:grid-cols-[11rem_1fr_8rem] md:items-baseline md:gap-8"
          >
            <dt className={`${headingClassName} text-2xl leading-tight text-white`}>{product.name}</dt>
            <dd className="text-base font-light leading-relaxed text-text-secondary">
              <span className="text-white">{product.question}</span>
              {detailed ? <span className="mt-2 block">{product.summary}</span> : null}
            </dd>
            <dd className="text-sm uppercase tracking-[0.16em] text-text-muted md:text-right">{product.timing}</dd>
          </div>
        ))}
      </dl>
      {showLink ? (
        <Link
          href="/what-we-do"
          className="mt-8 inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
          data-analytics-event="cta_click"
          data-analytics-label="What we do"
          data-analytics-location={location}
          data-analytics-destination="/what-we-do"
        >
          What each one is for &rarr;
        </Link>
      ) : null}
    </div>
  );
}
