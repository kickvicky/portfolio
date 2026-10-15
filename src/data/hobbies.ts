import type { Accent } from "@/lib/theme";

// Each key maps to a fixed slot in the bento grid (`.bento-<key>` in globals.css), so all keys are required.
export type HobbyKey = "climb" | "mount" | "surf" | "run" | "ski";

export type Hobby = {
  label: string;
  labelColor: Accent;
  src: string;
  alt: string;
  sizes: string;
};

export const hobbies: Record<HobbyKey, Hobby> = {
  climb: {
    label: "BOULDERING",
    labelColor: "yellow",
    src: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "Climber traversing an indoor bouldering wall",
    sizes: "(max-width: 980px) 100vw, 35vw",
  },
  mount: {
    label: "MOUNTAINEERING",
    labelColor: "lime",
    src: "https://images.unsplash.com/photo-1554176259-aa961fc32671?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
    alt: "Snow-covered mountain summit beneath a dramatic sky",
    sizes: "(max-width: 480px) 100vw, (max-width: 980px) 50vw, 20vw",
  },
  surf: {
    label: "SURFING",
    labelColor: "pink",
    src: "https://images.unsplash.com/photo-1526342122811-2a9c8512023d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "Surfer carving across an open wave",
    sizes: "(max-width: 480px) 100vw, (max-width: 980px) 50vw, 45vw",
  },
  run: {
    label: "RUNNING",
    labelColor: "yellow",
    src: "https://images.unsplash.com/photo-1778362950179-88f6c8423f8d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
    alt: "Trail runner moving across a rocky mountain ridge",
    sizes: "(max-width: 480px) 100vw, (max-width: 980px) 50vw, 25vw",
  },
  ski: {
    label: "SKIING",
    labelColor: "white",
    src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    alt: "Skier launching through powder in the mountains",
    sizes: "(max-width: 980px) 100vw, 20vw",
  },
};
