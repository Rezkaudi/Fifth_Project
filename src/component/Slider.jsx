import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import Imgae1 from "../assets/screen/1.png";
import Imgae2 from "../assets/screen/2.png";
import Imgae3 from "../assets/screen/3.png";
import Imgae4 from "../assets/screen/4.png";
import Imgae5 from "../assets/screen/5.png";
import Imgae6 from "../assets/screen/6.png";
import Imgae7 from "../assets/screen/7.png";
import Imgae8 from "../assets/screen/8.png";
import { Autoplay} from 'swiper/modules';

const images = [Imgae1, Imgae2, Imgae3, Imgae4, Imgae5, Imgae6, Imgae7, Imgae8];

const AutoSlider = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
            className="w-full h-full"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default AutoSlider;