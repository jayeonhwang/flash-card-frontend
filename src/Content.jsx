import axios from "axios";
import { BundleIndex } from "./BundleIndex";
import { Routes, Route } from "react-router-dom";
import { CardList } from "./CardList";
import { Flip } from "./Flip"

export function Content() {
  return (
    <Routes>
      <Route exact path="/" element={<BundleIndex />} />
      <Route path="/bundles/:id" element={<CardList />} />
      <Route path="/flip" element={<Flip />} />
    </Routes>
  )
}