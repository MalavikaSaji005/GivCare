import { Search, HandHeart, BarChart3 } from "lucide-react";

export default function HowItWorks() {

  const steps = [
    {
      title: "Discover Needs",
      desc: "Browse community-verified requests for food, medical aid, or companionship. Find where your heart aligns.",
      icon: Search,
    },
    {
      title: "Take Action",
      desc: "Donate essentials, volunteer your time, or become a companion to someone in need. Every second counts.",
      icon: HandHeart,
    },
    {
      title: "Track Impact",
      desc: "See real-time updates on how your contribution is changing lives. Transparency at every step.",
      icon: BarChart3,
    }
  ];

  return (
    <div className="bg-[#eef2f0] px-10 py-24">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900">
          How it Works
        </h2>
        <p className="text-gray-500 mt-3 text-sm">
          Simple steps to create lasting change in your community.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >

              {/* ICON BOX */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#dff3e7] text-primary">
                <Icon size={20} strokeWidth={2.6} />
              </div>

              {/* TITLE */}
              <h3 className="mt-6 font-semibold text-base text-gray-900">
                {step.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                {step.desc}
              </p>

            </div>
          );
        })}

      </div>
    </div>
  );
}