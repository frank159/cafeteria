import CoffeeStainLoop from "./component/CoffeeStain/CoffeeStain";
import EventPage from "./pages/EventPage/EventPage";
import HomeCard from "./pages/HomeCard/HomeCard";
import PresentationPage from "./pages/PresentationPage/PresentationPage";
import PresentationPageB from "./pages/PresentationPageB/PresentationPageB";

export default function Home() {
  return (
    <div>
      <HomeCard />
      <PresentationPage />
      <PresentationPageB />
      {/* <EventPage /> */}
    </div>
  );
}
