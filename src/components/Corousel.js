// import React, { useState } from 'react';
// import "../styles/Corousel.css"

// const Carousel = ({ items = [] }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const updateIndex = (newIndex) => {
//         setCurrentIndex((newIndex + items.length) % items.length);
//     };

//     return (
//         <div className="carousel relative">
//             <div
//                 className="carousel-items flex transition-transform duration-500"
//                 style={{
//                     transform: `translateX(-${currentIndex * 100}%)`,
//                     width: `${items.length * 100}%`,
//                 }}
//             >
//                 {items.map((item, index) => (
//                     <div key={index} className="carousel-item w-full text-center">
//                         <img
//                             src={`books/${item.imageUrl}`}
//                             alt={item.altText}
//                             className="w-full h-64 object-cover rounded-xl"
//                         />
//                         {item.caption && <p className="text-lg mt-2">{item.caption}</p>}
//                     </div>
//                 ))}
//             </div>
//             {/* Navigation Buttons */}
//             <button
//                 className="prev absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
//                 onClick={() => updateIndex(currentIndex - 1)}
//             >
//                 &#8592;
//             </button>
//             <button
//                 className="next absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
//                 onClick={() => updateIndex(currentIndex + 1)}
//             >
//                 &#8594;
//             </button>
//             {/* Dots */}
//             <div className="dots flex justify-center mt-2 space-x-2">
//                 {items.map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setCurrentIndex(index)}
//                         className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
//                             }`}
//                     ></button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Carousel;
