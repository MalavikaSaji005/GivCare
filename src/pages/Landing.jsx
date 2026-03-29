import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import AOS from "aos";
import "aos/dist/aos.css";

import { db } from "../firebase";
import Navbar from "../components/Navbar";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

import HowItWorks from "../components/home/HowItWorks";
import FeaturedNeeds from "../components/home/FeaturedNeeds";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";

export default function Landing() {
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    const needsRef = ref(db, "needs");

    const unsubscribe = onValue(needsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const needsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setNeeds(needsArray.slice(0, 3));
      } else {
        setNeeds([]);
      }
    });

    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-background min-h-screen font-sans">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div
        id="hero"
        data-aos="fade-up"
        className="flex flex-col md:flex-row items-center justify-between px-10 py-24 gap-12"
      >

        {/* LEFT */}
        <div className="max-w-xl">

          <span className="bg-green-100 text-primary px-4 py-1 rounded-full text-xs font-bold tracking-wide">
            COMMUNITY FIRST
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-textMain leading-tight mt-5">
            Make a <br />
            <span>Difference</span>{" "}
            <span className="text-primary">Today</span>
          </h1>

          <p className="mt-5 text-textSub text-lg leading-relaxed">
            Empower lives by connecting donors, volunteers, and communities.
            Every small act of kindness builds a stronger tomorrow.
          </p>

          <div className="flex gap-4 mt-10">

            <Link to="/browse">
              <button className="bg-primary text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-primaryDark transition">
                Explore Needs →
              </button>
            </Link>

            {/* ONLY CHANGE */}
            <button
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border border-gray-300 text-primary px-7 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition"
            >
              Learn More
            </button>

          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex items-center justify-center">

          <img
            src={hero1}
            alt="left"
            className="w-[180px] h-[320px] object-cover rounded-xl shadow-md transform scale-90 translate-y-6 opacity-90"
          />

          <div className="relative mx-[-20px]">
            <div className="absolute w-[260px] h-[420px] bg-primary/10 blur-3xl rounded-2xl"></div>

            <img
              src={hero2}
              alt="main"
              className="w-[250px] h-[440px] object-cover rounded-2xl shadow-xl transform -translate-y-6 z-10 relative"
            />
          </div>

          <img
            src={hero3}
            alt="right"
            className="w-[180px] h-[320px] object-cover rounded-xl shadow-md transform scale-90 translate-y-6 opacity-90"
          />

          {/* FLOATING BADGE */}
          <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 bg-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3">

            <div className="w-9 h-9 bg-orange-100 text-orange-600 flex items-center justify-center rounded-full">
              ❤️
            </div>

            <div>
              <p className="text-sm font-semibold text-textMain">
                2.4k+ Active Volunteers
              </p>
              <p className="text-xs text-textSub">
                Making impact every day
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ONLY ADDED IDs BELOW */}

      <div id="how-it-works" data-aos="fade-up">
        <HowItWorks />
      </div>

      <div id="featured-needs" data-aos="fade-up">
        <FeaturedNeeds needs={needs} />
      </div>

      <div id="stats" data-aos="fade-up">
        <Stats />
      </div>

      <div id="testimonials" data-aos="fade-up">
        <Testimonials />
      </div>

      {/* CTA */}
      <div
        data-aos="zoom-in"
        className="mx-10 my-20 bg-primary text-white rounded-2xl p-14 text-center"
      >

        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Ready to start your journey?
        </h2>

        <p className="mt-5 text-white/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Join thousands of people who are already making a difference in their
          communities. Your first step starts here.
        </p>

        <Link to="/register">
          <button className="mt-8 bg-white text-primary px-8 py-3 rounded-full font-medium text-sm hover:bg-gray-100 transition">
            Join the Community
          </button>
        </Link>

      </div>

      {/* FOOTER */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-10 py-8 bg-[#eef2f1] text-sm text-black gap-4">

        <div>
          <h3 className="text-primary font-semibold text-lg">GivCare</h3>
          <p className="text-xs mt-1">
            © 2026 GivCare. Built for the Human Sanctuary.
          </p>
        </div>

        <div className="flex gap-6 text-xs">
          <span className="cursor-pointer hover:text-primary">Privacy Policy</span>
          <span className="cursor-pointer hover:text-primary">Terms of services</span>
          <span className="cursor-pointer hover:text-primary">Contact us</span>
          <span className="cursor-pointer hover:text-primary">FAQ</span>
        </div>

      </footer>

    </div>
  );
}