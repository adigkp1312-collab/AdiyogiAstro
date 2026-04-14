import { Suspense } from "react";
import { BirthChartForm } from "./birth-chart-form";

export default function NewBirthChartPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white/60">Loading birth chart form...</div>}>
      <BirthChartForm />
    </Suspense>
  );
}
