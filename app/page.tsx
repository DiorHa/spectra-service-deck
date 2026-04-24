import fs from "node:fs";
import path from "node:path";
import { DeckHydrator } from "@/components/DeckHydrator";

const deckHtml = fs.readFileSync(
  path.join(process.cwd(), "source-deck.html"),
  "utf8"
);

export default function HomePage() {
  return <DeckHydrator html={deckHtml} />;
}
