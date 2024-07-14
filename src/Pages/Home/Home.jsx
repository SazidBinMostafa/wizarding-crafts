import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';

function Home() {

  const [crafts, setCrafts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://wizarding-crafts-server.vercel.app/crafts')
      .then(res => res.json())
      .then(data => {
        setCrafts(data)
        setLoading(false)
      })
  }, [])

  return <section className='mb-20'>
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay
    >
      <SwiperSlide><img src="/Banner.png" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/Jewellery_Banner.png" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/Trunk_Banner.png" alt="" /></SwiperSlide>
    </Swiper>

    {/* Art and Craft Section */}
    {crafts ? <section>
      <h1 className='text-3xl md:text-4xl font-bold my-14 text-center'>Magical Creations</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-fit mx-auto'>
        {crafts && crafts.map(craft => <Card key={craft._id} craft={craft}></Card>)}
      </div>
    </section> : <div className="w-full h-screen flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>}

  </section>
}

export default Home;