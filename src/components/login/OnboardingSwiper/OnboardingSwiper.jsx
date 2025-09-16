'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import './OnboardingSwiper.scss';

const OnboardingSwiper = ({ isHiddenOnMobile }) => {
	const router = useRouter();
	const [hiddenOnboarding, sethiddenOnboarding] = useState(false);

	const handleRedirect = (route = '/') => {
		sethiddenOnboarding(true);
		router.push(route, { scroll: false, shallow: false });
	};

	return (
		<div
			className={`OnboardingSwiper 
				${hiddenOnboarding ? 'customClose' : ''} 
				${isHiddenOnMobile ? 'hidden lg:block' : ''}`}
		>
			<Swiper
				className="bg-gray-100"
				modules={[Pagination, Autoplay]}
				slidesPerView={1}
				pagination={{ clickable: true }}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
				// autoplay={{
				// 	delay: 5000,
				// 	disableOnInteraction: false,
				// }}
				loop={true}
			>
				<SwiperSlide>
					<div className="slide">
						<img src="https://s3.amazonaws.com/remanso.com.pe/wp-content/uploads/2023/03/25063547/hero-home.jpeg" className="object-cover" alt="ob-1" />
						<div className="caption text-3xl xl:text-4xl font-semibold">
							 Belleza, paz y grandes recuerdos en un solo lugar
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://s3.amazonaws.com/remanso.com.pe/wp-content/uploads/2025/07/hero_banner-v2-scaled.webp"
						className="object-cover"
						alt="ob-2"
					/>
					<div className="caption text-3xl xl:text-4xl font-semibold">
						 Nuevos espacios exclusivos para el descanso eterno
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://s3.amazonaws.com/remanso.com.pe/wp-content/uploads/2025/07/hero_banner_v3-scaled.webp"
						className="object-cover"
						alt="ob-2"
					/>
					<div className="caption text-3xl xl:text-4xl font-semibold">
						 Apoyo profesional y humano, desde el primer momento
					</div>
				</SwiperSlide>
			</Swiper>
			<div className="buttons">
				<button className="btn" name="button" onClick={() => handleRedirect('/')}>
					Iniciar sesión
				</button>
			</div>
		</div>
	);
};
export default OnboardingSwiper;
