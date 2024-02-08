import axios from "axios";
import { BundleIndex } from "./BundleIndex";
import { Routes, Route } from "react-router-dom";
import { CardList } from "./FlashCard";
import { Signup } from "./authentication/Signup";
import { Login } from "./authentication/Login";
import { MyPage } from "./user_page/MyPage";
import { CardEdit } from "./user_page/CardEdit";
import { Quiz } from "./Quiz/Quiz";



export function Content() {
  return (
    <main>
      <Routes>
        <Route exact path="/" element={<BundleIndex />} />
        <Route path="/bundles/:id" element={<CardList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/mybundles/:id" element={<CardEdit />} />
        <Route path="/quiz/:id" element={<Quiz />} />

      </Routes>
    </main>

  )
}