import { useState } from "react";
import { Outlet } from "react-router-dom";
import BreadcrumbBar from "./BreadcrumbBar";
import PracticeHeader from "./PracticeTimer";

export type BreadcrumbContextType = {
  setBreadcrumbTrail: (
    trail: { label: string; path?: string | null }[]
  ) => void;
};

export default function Layout() {
  const [breadcrumbTrail, setBreadcrumbTrail] = useState([
    { label: "Home", path: "/" },
  ]);

  return (
    <>
      <BreadcrumbBar trail={breadcrumbTrail} />
      <PracticeHeader />
      <Outlet context={{ setBreadcrumbTrail }} />
    </>
  );
}
