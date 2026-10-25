import { Compass, House } from "lucide-react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getGeneralWhatsAppUrl } from "@/services/api";

export default function NotFound() {
  return (
    <section className="wash-sand relative flex min-h-[78svh] items-center overflow-hidden bg-sand py-24">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-turmeric/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-cinnamon">
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
            404 · Off the map
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
          </p>

          <h1 className="mt-6 text-[3rem] leading-[0.98] tracking-[-0.03em] text-ink sm:text-[4.2rem]">
            This path ends{" "}
            <em className="font-normal italic text-cinnamon">in the sand.</em>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-[0.92rem] leading-7 text-coastal">
            The page you were looking for is not here. The beach, the curry and
            the two rooms still are—head back to the beginning and we will show
            you the way.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className={buttonClasses({ variant: "primary", size: "lg" })}>
              <House className="h-4 w-4" />
              Back to the beach
            </Link>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonClasses({ variant: "outline", size: "lg" })}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Message Maduka
            </a>
          </div>

          <p className="mt-10 inline-flex items-center gap-2 font-hand text-[1.5rem] text-ocean/70">
            <Compass className="h-4 w-4" />
            Ilandaiyadi · Kalpitiya · Sri Lanka
          </p>
        </div>
      </div>
    </section>
  );
}
