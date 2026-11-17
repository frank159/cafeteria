import Header from "./component/Header/Header";
import HomeCard from "./pages/HomeCard/HomeCard";
import PresentationPage from "./pages/PresentationPage/PresentationPage";
import PresentationPageB from "./pages/PresentationPageB/PresentationPageB";

export default function Home() {
  return (
    <div>
      <Header />
      <HomeCard />
      <PresentationPage />
      <PresentationPageB />
    </div>
  );
}
