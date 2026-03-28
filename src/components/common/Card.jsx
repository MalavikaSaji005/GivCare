export default function Card({ children }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}