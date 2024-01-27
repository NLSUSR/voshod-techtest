import { Entry } from "@/components/entry";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense>
        <Entry></Entry>
      </Suspense>
    </main>
  );
}
