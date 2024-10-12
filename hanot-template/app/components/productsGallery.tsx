"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  productImages: string[];
}

const ProductGallery = ({ productImages }: ProductGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="h-[600px] my-9 px-6 border border-primary overflow-hidden bg-slate-100 shadow-2xl py-2">
      {/* Main Product Slider */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 select-none mb-2"
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            {/* Main Image */}
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              width={599}
              height={599}
              className="object-contain w-full h-auto"
              loading="lazy" // Lazy load images
              
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            {/* Thumbnail Image */}
            <Image
              src={image}
              alt={`Thumbnail Image ${index + 1}`}
              width={50}
              height={50}
              className="object-cover w-full h-auto cursor-pointer"
              loading="lazy" // Lazy load thumbnails too
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
