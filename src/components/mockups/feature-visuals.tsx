import { CalendarMockup } from "@/components/mockups/calendar-mockup";
import {
  ClientCardMockup,
  PhotosMockup,
  TreatmentCardsMockup,
} from "@/components/mockups/client-card-mockup";
import { DashboardMockup } from "@/components/mockups/dashboard-mockup";
import { InventoryMockup } from "@/components/mockups/inventory-mockup";
import { PhoneMockup } from "@/components/mockups/phone-mockup";
import { ServicesMockup } from "@/components/mockups/services-mockup";
import { SmsMockup } from "@/components/mockups/sms-mockup";
import { StatsMockup } from "@/components/mockups/stats-mockup";

export const featureVisuals: Record<string, React.ReactNode> = {
  kalendarz: <CalendarMockup />,
  klienci: <ClientCardMockup />,
  "karty-zabiegowe": <TreatmentCardsMockup />,
  zdjecia: <PhotosMockup />,
  przypomnienia: <SmsMockup className="mx-auto max-w-sm" />,
  statystyki: <StatsMockup />,
  uslugi: <ServicesMockup />,
  panel: <DashboardMockup />,
  magazyn: <InventoryMockup />,
  "aplikacja-mobilna": <PhoneMockup />,
};
