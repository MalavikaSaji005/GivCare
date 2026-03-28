export default function Button({ children, variant = "primary" }) {
  const base = "px-4 py-2 rounded-xl font-medium transition";

  const styles = {
    primary: "bg-primary text-white hover:bg-primaryDark",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}