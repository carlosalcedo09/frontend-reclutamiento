'use client';

import HeroSlider from '@/components/menu/SwiperMenu/SwiperMenu';
import { UserPlus, Briefcase, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	return (
		<main>
			<HeroSlider />
			
			{/* Introducción */}
			<section className="py-16 px-6 text-center max-w-[1440px] mx-auto">
				<h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
					¿Cómo funciona nuestra plataforma?
				</h2>
				<p className="text-gray-600 leading-relaxed text-lg">
					Con <span className="font-semibold">Recruitment Portal</span> puedes explorar
					oportunidades laborales, postularte a las vacantes de tu interés y dar
					seguimiento a tus postulaciones desde un solo lugar. Todo en un entorno seguro,
					ágil y accesible desde cualquier dispositivo.
				</p>
			</section>

			{/* Sección de pasos */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-[1440px] mx-auto px-6 text-center">
					<h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-800">
						Postula en sencillos pasos
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						{/* Paso 1 */}
						<div className="flex flex-col items-center">
							<div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 shadow-md">
								<UserPlus size={32} />
							</div>
							<h3 className="text-lg font-semibold mb-2">1. Regístrate</h3>
							<p className="text-gray-600 text-sm">
								Crea tu cuenta y completa tu perfil profesional en minutos.
							</p>
						</div>

						{/* Paso 2 */}
						<div className="flex flex-col items-center">
							<div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md">
								<Briefcase size={32} />
							</div>
							<h3 className="text-lg font-semibold mb-2">2. Busca vacantes</h3>
							<p className="text-gray-600 text-sm">
								Explora ofertas laborales adaptadas a tu perfil y preferencias.
							</p>
						</div>

						{/* Paso 3 */}
						<div className="flex flex-col items-center">
							<div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4 shadow-md">
								<CheckCircle size={32} />
							</div>
							<h3 className="text-lg font-semibold mb-2">3. Postula</h3>
							<p className="text-gray-600 text-sm">
								Envía tu postulación y da seguimiento a cada proceso desde tu panel.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-center text-white">
				<div className="max-w-[900px] mx-auto px-6">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						¡Descubre las vacantes disponibles y encuentra tu próximo empleo!
					</h2>
					<p className="text-lg md:text-xl mb-8 opacity-90">
						Explora cientos de oportunidades laborales diseñadas para tu perfil.  
						Postula ahora y da el siguiente paso en tu carrera.
					</p>
					<Link
						href="/ofertas-laborales"
						className="inline-block px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
					>
						Explorar ofertas laborales
					</Link>
				</div>
			</section>
		</main>
	);
}
