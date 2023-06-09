import Article from "./pages/Article/Article";
import Home from "./pages/Home/Home";
import { Route } from "react-router-dom";
import TopicPage from "./pages/TopicPage/TopicPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import LoginPage from "./pages/LoginPage/LoginPage";
import LoginConfirmation from "./components/LoginConfirmation/LoginConfirmation";
import NotFound from "./pages/NotFound/NotFound";
import AllProviders from "./providers/AllProviders";

function App() {
  return (
    <AllProviders>
      <Route path="/" element={<Home />} />
      <Route path="/article/:article_id" element={<Article />} />
      <Route path="/topics/:topic" element={<TopicPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loginconfirm" element={<LoginConfirmation />} />
      <Route path="*" element={<NotFound />} />
    </AllProviders>
  );
}

export default App;
