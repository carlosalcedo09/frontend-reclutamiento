'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HeroSlider() {
	const slides = [
		{
			image: '/img/slider-1.jpg',
			title: 'Explora oportunidades laborales',
			text: 'Encuentra ofertas de trabajo adaptadas a tu perfil y experiencia.',
		},
		{
			image: '/img/slider-2.webp',
			title: 'Postula en pocos pasos',
			text: 'Nuestro portal te permite enviar tus postulaciones de forma rápida y sencilla.',
		},
		{
			image: '/img/slider-3.jpg',
			title: 'Gestiona tus postulaciones',
			text: 'Accede a tu cuenta y lleva un seguimiento de todos tus procesos en curso.',
		},
	];

	return (
		<div className="relative w-full h-[70vh] md:h-[80vh]">
			<Swiper
				modules={[Autoplay, Pagination]}
				autoplay={{ delay: 5000 }}
				pagination={{ clickable: true }}
				loop
				className="w-full h-full"
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div
							className="relative w-full h-full flex items-center justify-center text-center"
							style={{
								backgroundImage: `url(${slide.image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							{/* Overlay degradado con blur */}
							<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

							<div className="relative z-10 px-6 max-w-4xl mx-auto text-white">
								<h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
									{slide.title}
								</h2>
								<p className="text-lg md:text-xl">{slide.text}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
