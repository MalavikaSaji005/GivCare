export default function Stats() {
  const stats = [
    { value: "$124k+", label: "TOTAL DONATIONS" },
    { value: "2.4k+", label: "VOLUNTEERS" },
    { value: "5k+", label: "PEOPLE HELPED" },
  ];

  return (
    <div className="bg-[#eef2f0] py-16">

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-14 text-center">

        {stats.map((item, index) => (
          <div key={index}>

            {/* NUMBER */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {item.value}
            </h2>

            {/* LABEL */}
            <p className="mt-2 text-[9px] tracking-widest font-semibold text-gray-600 uppercase">
              {item.label}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}