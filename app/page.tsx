import fs from "node:fs";
import path from "node:path";
import { DeckHydrator } from "@/components/DeckHydrator";

function loadDeckSource() {
  const sourcePath = path.join(process.cwd(), "source-deck.html");
  return fs.readFileSync(sourcePath, "utf8");
}

export default function HomePage() {
  const body = loadDeckSource();
  return <DeckHydrator html={body} />;
}
