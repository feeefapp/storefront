"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";

const ProductGallery = ({ productImages }: { productImages: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="h-[600px] my-9 px-6 border border-primary overflow-hidden bg-slate-100 shadow-2xl py-2">
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
            <Image src={image} alt="Image product" width={599} height={599} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper "
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Image  src={image} alt=" thumb Image" width={50} height={50} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
