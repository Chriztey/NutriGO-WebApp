import Hero from "./../component/Hero";
import Intro from "../component/Introduce";
import Footer from "../component/Footer";
import KeyFeatures from "../component/KeyFeatures";

export default function Home() {
  return (
    <div>
      <Hero></Hero>

      <KeyFeatures></KeyFeatures>

      {/* <Intro></Intro> */}

      <Footer></Footer>
    </div>
  );
}
