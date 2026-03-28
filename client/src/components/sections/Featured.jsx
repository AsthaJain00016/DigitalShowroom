import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const featured = [
    {
        name: "Silk Saree",
        image: "https://img.freepik.com/premium-photo/silk-saree-fabric-texture-design-closeup-created-with-generative-ai_419341-13727.jpg?w=2000"
    },
    {
        name: "Blouse",
        image: "https://www.pinkvilla.com/images/2023-06/1686074831_shutterstock_2161893013.jpg"
    },
    {
        name: "Silk Saree",
        image: "https://img.freepik.com/premium-photo/silk-saree-fabric-texture-design-closeup-created-with-generative-ai_419341-13727.jpg?w=2000"
    },
    {
        name: "Blouse",
        image: "https://www.pinkvilla.com/images/2023-06/1686074831_shutterstock_2161893013.jpg"
    },
    {
        name: "Silk Saree",
        image: "https://img.freepik.com/premium-photo/silk-saree-fabric-texture-design-closeup-created-with-generative-ai_419341-13727.jpg?w=2000"
    },
    {
        name: "Blouse",
        image: "https://www.pinkvilla.com/images/2023-06/1686074831_shutterstock_2161893013.jpg"
    }
]


const Featured = () => {
    const scrollRef = useRef();

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <section className="py-12 px-4 md:px-10 bg-gray-50 relative">

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
                Featured Collection
            </h2>

            {/* LEFT ARROW */}
            <button
                onClick={scrollLeft}
                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
            >
                <ChevronLeft size={24} />
            </button>

            {/* RIGHT ARROW */}
            <button
                onClick={scrollRight}
                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
            >
                <ChevronRight size={24} />
            </button>

            {/* SCROLL CONTAINER */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            >
                {featured.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-55 md:min-w-75 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                    >

                        {/* Image */}
                        <div className="h-70 md:h-87.5 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-center text-gray-800">
                                {item.name}
                            </h3>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Featured;