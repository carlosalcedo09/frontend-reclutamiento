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
						<img src="https://img.freepik.com/foto-gratis/mujer-tiro-completo-que-trabaja-escritorio_23-2150062343.jpg" className="object-cover" alt="ob-1" />
						<div className="caption text-3xl xl:text-4xl font-semibold">
							 Explora oportunidades laborales en un solo lugar
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://img.freepik.com/fotos-premium/imagen-fondo-vertical-lugar-trabajo-minimo-oficina-casa-blanco-computadora-escritorio-madera-cop_236854-45032.jpg"
						className="object-cover"
						alt="ob-2"
					/>
					<div className="caption text-3xl xl:text-4xl font-semibold">
						 Postula en pocos pasos a tu trabajo deseado
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://thumbs.dreamstime.com/b/retrato-vertical-de-un-empleado-exitoso-la-oficina-del-hombre-en-el-lugar-trabajo-entrenador-negocios-o-mentor-posar-usar-camisa-309559826.jpg"
						className="object-cover"
						alt="ob-2"
					/>
					<div className="caption text-3xl xl:text-4xl font-semibold">
						Gestiona y controla tus postulaciones
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
