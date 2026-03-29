import foodImg from "../../assets/food.jpg";
import elderlyImg from "../../assets/elderly.jpg";
import schoolImg from "../../assets/school.jpg";

export default function FeaturedNeeds({ needs = [] }) {

  const dummyNeeds = [
    {
      id: 1,
      title: "Community Food Drive",
      type: "Ongoing",
      progress: 60,
      image: foodImg,
    },
    {
      id: 2,
      title: "Volunteer for Elderly Care",
      type: "Urgent",
      desc: "Participate in meaningful volunteering activities at old age homes. Your time and presence can brighten someone's day.",
      image: elderlyImg,
    },
    {
      id: 3,
      title: "School Supplies for Kids",
      type: "Medium",
      progress: 88,
      image: schoolImg,
    }
  ];

  const data = [0, 1, 2].map((index) => {
    const item = needs[index] || {};
    const fallback = dummyNeeds[index];

    return {
      id: item.id || fallback.id,
      title: item.title || fallback.title,
      type: item.type || fallback.type,
      progress: item.progress || fallback.progress,
      desc: item.desc || fallback.desc,
      image: item.image || fallback.image,
    };
  });

  return (
    <div className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-10">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-[26px] font-semibold text-gray-900">
              Featured Needs
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Urgent requests from your community that need immediate attention.
            </p>
          </div>

          <button className="flex items-center text-primary text-sm font-medium group mt-2">
            <span>View all needs</span>
            <span className="ml-4 text-[25px] leading-none relative -top-[1.5px] transition-transform duration-200 group-hover:translate-x-1">
                ›
            </span>
          </button>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-10">

          {data.map((item) => {

            const imageSrc =
              item.image && item.image !== ""
                ? item.image
                : item.type === "Urgent"
                ? elderlyImg
                : item.type === "Medium"
                ? schoolImg
                : foodImg;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-[20px] border border-gray-100 overflow-hidden 
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                transition-all duration-300 ease-in-out 
                hover:-translate-y-2 hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="relative h-[190px] overflow-hidden">
                  <img
                    src={imageSrc}
                    alt="need"
                    className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                  />

                  {/* BADGE */}
                  <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold
                    ${item.type === "Urgent"
                      ? "bg-orange-100 text-orange-600"
                      : item.type === "Medium"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-green-100 text-primary"}
                  `}>
                    {item.type}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h3 className="font-semibold text-[15px] text-gray-900">
                    {item.title}
                  </h3>

                  {item.desc && (
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  )}

                  {item.progress && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>

                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <button
                    className={`mt-5 w-full py-3 rounded-full text-sm font-medium transition duration-200
                    ${item.type === "Urgent"
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-primary text-white hover:bg-primaryDark"}
                  `}
                  >
                    Help Now
                  </button>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}