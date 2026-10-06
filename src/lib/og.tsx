import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Glif „S” z favicon.svg (system.saloonik.com/public/favicon.svg).
const S_PATH =
  "M8.92517 0.0348127C9.26367 -0.010429 9.64918 -0.00851683 9.98874 0.0229895C10.9644 0.113473 12.1628 0.549179 12.7779 1.34101C13.0679 1.71421 13.1602 2.1228 13.1012 2.58768C12.9637 3.67192 11.7137 6.40972 10.8298 7.04409C10.651 7.17238 10.4064 7.26909 10.1833 7.21068C9.96049 7.15241 9.82144 7.01952 9.71751 6.82135C8.98797 5.4299 10.4502 3.30871 10.8385 1.93673C10.8895 1.75662 10.9487 1.55753 10.8529 1.38406C10.7557 1.35107 10.7409 1.34186 10.6287 1.32572C10.0486 1.24232 9.16887 1.88965 8.71964 2.22064C7.22737 3.32018 5.3474 5.03767 5.08473 6.98766C4.76216 9.38229 7.49514 11.2443 8.7978 12.9103C9.48514 13.7896 10.0291 14.8226 9.8596 15.9767C9.72388 16.8999 9.21284 17.5831 8.47863 18.1248C8.05009 18.4229 7.59365 18.6787 7.11572 18.8887C5.64788 19.5302 3.54432 19.9281 2.01367 19.2831C1.20697 18.9432 0.469932 18.2926 0.155719 17.4607C-0.00344159 17.0394 -0.0815356 16.3413 0.123574 15.925C0.195649 15.7784 0.234378 15.7784 0.379378 15.7275C0.73848 15.8492 1.1778 16.621 1.48614 16.902C2.04128 17.4083 3.0759 17.484 3.79969 17.433C4.68888 17.37 5.76866 17.0649 6.35291 16.354C7.43319 15.0386 5.34796 13.2098 4.5094 12.3467C4.00381 11.827 3.4956 11.3074 3.04871 10.7346C2.37985 9.87789 1.84687 8.92611 1.73316 7.82835C1.55963 6.15264 2.27571 4.53781 3.32285 3.26658C4.69631 1.59923 6.74684 0.251675 8.92517 0.0348127Z";

/** Obraz Open Graph w barwach Atelier Plum. */
export function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fdf9fb",
          backgroundImage: "radial-gradient(circle at 15% 10%, #DA91B6 0%, #823564 45%, #411636 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "rgba(253,249,251,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="58" viewBox="0 0 13.2 19.6">
              <path d={S_PATH} fill="#FDF9FB" />
            </svg>
          </div>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Saloonik</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 26, textTransform: "uppercase", letterSpacing: 3, opacity: 0.8 }}>{eyebrow}</span>
          <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </span>
          <span style={{ fontSize: 30, opacity: 0.85, maxWidth: 960 }}>{subtitle}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
