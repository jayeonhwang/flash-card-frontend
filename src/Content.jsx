import axios from "axios";
import { BundleIndex } from "./BundleIndex";
import { Routes, Route } from "react-router-dom";
import { CardList } from "./CardList";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { UpdatePage } from "./Update";
import { BundleEdit } from "./BundleEdit";



export function Content() {
  return (
    <main>
      <Routes>
        <Route exact path="/" element={<BundleIndex />} />
        <Route path="/bundles/:id" element={<CardList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my" element={<UpdatePage />} />
        <Route path="/mybundles/:id" element={<BundleEdit />} />
      </Routes>
    </main>

  )
}