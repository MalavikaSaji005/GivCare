import Navbar from "../Navbar";

export default function LandingLayout({ children }) {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}