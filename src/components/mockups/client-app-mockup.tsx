import Image from "next/image";
import {
  BellRingIcon,
  CalendarIcon,
  CheckIcon,
  HomeIcon,
  MapPinIcon,
  UserIcon,
} from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { wash } from "./app-window";

const past = [
  {
    date: "30.09",
    service: "Manicure hybrydowy",
    place: "Nails by Ola",
    color: "--viz-2",
  },
  {
    date: "12.09",
    service: "Strzyżenie damskie",
    place: "Studio Bella",
    color: "--viz-1",
  },
];

/** The client panel on a phone: next visit with a paid deposit, then history. */
export function ClientAppMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Panel klienta Saloonik na telefonie — najbliższa wizyta z opłaconym zadatkiem i historia wizyt"
      className={cn(
        "bg-foreground mx-auto w-64 rounded-[2.5rem] p-2.5 shadow-2xl select-none dark:bg-zinc-700",
        className,
      )}
    >
      <div
        aria-hidden
        className="bg-background flex h-[500px] flex-col overflow-hidden rounded-[2rem] text-left"
      >
        <div className="mt-2 flex justify-center">
          <span className="h-5 w-20 rounded-full bg-black" />
        </div>
        <div className="flex-1 space-y-4 px-4 pt-4">
          <div>
            <p className="text-muted-foreground text-[11px] font-medium">
              Cześć, Natalia
            </p>
            <p className="text-lg font-semibold">Najbliższa wizyta</p>
          </div>

          <div className="bg-card overflow-hidden rounded-2xl border shadow-sm">
            <div className="relative aspect-[16/7]">
              <Image
                src="/images/koloryzacja.jpg"
                alt=""
                fill
                sizes="240px"
                className="object-cover"
              />
              <span className="bg-background/90 absolute top-2 left-2 rounded-lg px-2 py-1 text-[11px] font-semibold tabular-nums">
                sob, 25.10, 10:00
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold">Koloryzacja</p>
              <p className="text-muted-foreground flex items-center gap-1 text-[11px]">
                <MapPinIcon className="size-3" /> Studio Bella, ul. Długa 12
              </p>
              <Badge variant="success" className="mt-2 text-[10px]">
                <CheckIcon className="size-3" /> Zadatek 50 zł opłacony
              </Badge>
              <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] font-medium">
                <span className="rounded-lg border py-1.5 text-center">
                  Przełóż
                </span>
                <span className="bg-primary text-primary-foreground rounded-lg py-1.5 text-center">
                  Dojazd
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold">Ostatnie wizyty</p>
            <ul className="mt-2 space-y-2">
              {past.map((v) => (
                <li
                  key={v.date}
                  className="flex items-center justify-between gap-2 rounded-lg border-l-[3px] px-3 py-2"
                  style={wash(v.color)}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold">
                      {v.service}
                    </span>
                    <span className="text-muted-foreground block text-[10px]">
                      {v.date}, {v.place}
                    </span>
                  </span>
                  <span className="text-primary shrink-0 text-[10px] font-semibold">
                    Umów ponownie
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-card grid grid-cols-4 border-t py-2.5">
          {[HomeIcon, CalendarIcon, BellRingIcon, UserIcon].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "flex justify-center",
                i === 0 ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" />
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
