
export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah J.",
      role: "Volunteer & Donor",
      text: "Finding a community of support through GivCare transformed my perspective. I wasn't just donating money; I was building a friendship with Martha that brings so much joy to my weekends.",
      image: "https://i.pravatar.cc/40?img=5",
    },
    {
      name: "Robert M.",
      role: "Community Member",
      text: "The help I received during my recovery was more than just physical aid. The kindness of the volunteers made me feel seen and valued during a very difficult time.",
      image: "https://i.pravatar.cc/40?img=12",
    },
  ];

  return (
    <div className="bg- px-10 py-20">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-14">
        Community Voices
      </h2>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[#f2f5f3] p-8 pt-10 rounded-3xl relative shadow-[0_6px_20px_rgba(0,0,0,0.03)]"
          >

            {/* EXACT QUOTE ICON */}
            <div className="absolute -top-3 left-6">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="#9bb8aa"
                >
                  <path d="M7.17 6A5 5 0 0 0 2 11v5a3 3 0 0 0 3 3h3v-8H5a3 3 0 0 1 3-3V6zm10 0a5 5 0 0 0-5.17 5v5a3 3 0 0 0 3 3h3v-8h-3a3 3 0 0 1 3-3V6z"/>
                </svg>
            </div>

            {/* TEXT */}
            <p className="text-black text-sm leading-relaxed italic">
              "{item.text}"
            </p>

            {/* USER */}
            <div className="flex items-center gap-3 mt-6">

              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.role}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}