import axios from "axios";
import { BundleIndex } from "./BundleIndex";
import { Routes, Route } from "react-router-dom";
import { CardList } from "./CardList";
import { Signup } from "./Signup";
import { Login } from "./Login";


export function Content() {
  return (
    <Routes>
      <Route exact path="/" element={<BundleIndex />} />
      <Route path="/bundles/:id" element={<CardList />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

    </Routes>

  )
}