import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import AllArtAndCraftItems from '../AllArtAndCraftItems/AllArtAndCraftItems';

function Home() {

  return <section>
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay
      className='mb-24'
    >
      <SwiperSlide><img src="/Banner.png" alt="" /></SwiperSlide>
    </Swiper>

    <AllArtAndCraftItems></AllArtAndCraftItems>
  </section>
}

export default Home;