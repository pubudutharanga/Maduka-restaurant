import {
  Leaf,
  Star,
  WavesHorizontal,
} from "lucide-react";

const trustItems = [
  {
    icon: Star,
    value: "10/10",
    label: "Exceptional on Booking.com",
    meta: "Staff 10.0 · Couples' location 10/10",
  },
  {
    icon: Star,
    value: "5.0/5.0",
    label: "Excellent on Tripadvisor",
    meta: "21 reviews · 43 traveller photos",
  },
  {
    icon: WavesHorizontal,
    value: "Private",
    label: "Beach at your door",
    meta: "Direct access from both rooms",
  },
  {
    icon: Leaf,
    value: "Daily",
    label: "Curries from scratch",
    meta: "Vegetarian & vegan friendly",
  },
];

export function TrustBar() {
  return (
    <section aria-label="Guest ratings and highlights" className="bg-sand">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-y-8 border-b border-ink/10 py-10 sm:grid-cols-4 sm:gap-0 sm:py-12">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={
                  index > 0
                    ? "sm:border-l sm:border-ink/10 sm:pl-6 lg:pl-8"
                    : "sm:pr-6 lg:pr-8"
                }
              >
                <div className="flex items-center gap-2 text-cinnamon">
                  <Icon
                    className={`h-4 w-4 ${
                      item.icon === Star
                        ? "fill-turmeric text-turmeric"
                        : ""
                    }`}
                    strokeWidth={1.7}
                  />
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em]">
                    {item.value}
                  </span>
                </div>
                <p className="mt-3 font-display text-[1.15rem] leading-tight text-ink sm:text-[1.3rem]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[0.7rem] leading-5 text-coastal">
                  {item.meta}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
