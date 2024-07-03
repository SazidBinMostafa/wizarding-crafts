import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

function Home(){

    return <>
        <Swiper
        modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay
    >
      <SwiperSlide><img src="/Banner.png" alt="" /></SwiperSlide>
    </Swiper>
    </>
}

export default Home;