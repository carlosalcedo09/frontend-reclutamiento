'use client';

import { Accordion, AccordionItem, Card } from '@heroui/react';
import { HelpCircle, Briefcase, UserPlus, CheckCircle, Settings, Bell } from 'lucide-react';

export default function FrequentlyAskedQuestions() {
	return (
		<main className="py-16 w-full max-w-[1440px] px-6 mx-auto">
			{/* Encabezado */}
			<section className="text-center mb-12">
				<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
					Preguntas Frecuentes
				</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Aquí encontrarás respuestas a las dudas más comunes sobre nuestra plataforma de
					postulaciones. Si no encuentras lo que buscas, no dudes en contactarnos.
				</p>
			</section>

			{/* FAQ en acordeón */}
			<Card className="p-6 shadow-lg rounded-2xl">
				<Accordion selectionMode="multiple">
					<AccordionItem
						key="1"
						aria-label="¿Qué es Recruitment Portal?"
						title={
							<div className="flex items-center gap-2">
								<HelpCircle size={20} className="text-blue-600" />
								<span>¿Qué es Recruitment Portal?</span>
							</div>
						}
					>
						Recruitment Portal es una plataforma diseñada para facilitar el proceso de
						búsqueda de empleo y reclutamiento. Te permite explorar vacantes, postularte
						en línea y dar seguimiento a tus postulaciones desde un solo lugar.
					</AccordionItem>

					<AccordionItem
						key="2"
						aria-label="¿Cómo puedo registrarme?"
						title={
							<div className="flex items-center gap-2">
								<UserPlus size={20} className="text-green-600" />
								<span>¿Cómo puedo registrarme?</span>
							</div>
						}
					>
						Para registrarte, haz clic en el botón circular de perfil (arriba a la
						derecha) y selecciona <span className="font-semibold">"Crear cuenta"</span>.
						Completa tu información y empieza a explorar oportunidades laborales de
						inmediato.
					</AccordionItem>

					<AccordionItem
						key="3"
						aria-label="¿Cómo postulo a una vacante?"
						title={
							<div className="flex items-center gap-2">
								<Briefcase size={20} className="text-purple-600" />
								<span>¿Cómo postulo a una vacante?</span>
							</div>
						}
					>
						Una vez registrado, accede a la sección de "Postulaciones", selecciona la
						oferta que te interese y sigue los pasos para enviar tu postulación en
						minutos.
					</AccordionItem>

					<AccordionItem
						key="4"
						aria-label="¿Puedo dar seguimiento a mis postulaciones?"
						title={
							<div className="flex items-center gap-2">
								<CheckCircle size={20} className="text-teal-600" />
								<span>¿Puedo dar seguimiento a mis postulaciones?</span>
							</div>
						}
					>
						Sí, desde tu panel de usuario puedes consultar el estado de todas tus
						postulaciones, recibir notificaciones y mantener un control del proceso en
						tiempo real.
					</AccordionItem>

					<AccordionItem
						key="5"
						aria-label="¿Puedo editar mi perfil después del registro?"
						title={
							<div className="flex items-center gap-2">
								<Settings size={20} className="text-orange-600" />
								<span>¿Puedo editar mi perfil después del registro?</span>
							</div>
						}
					>
						Claro, puedes actualizar tu información personal y profesional en cualquier
						momento desde la sección de configuración de tu cuenta.
					</AccordionItem>

					<AccordionItem
						key="6"
						aria-label="¿Cómo recibo notificaciones de mis postulaciones?"
						title={
							<div className="flex items-center gap-2">
								<Bell size={20} className="text-red-600" />
								<span>¿Cómo recibo notificaciones de mis postulaciones?</span>
							</div>
						}
					>
						Recibirás alertas en tu panel de usuario y, si lo deseas, también por correo
						electrónico para que nunca pierdas el seguimiento de tus procesos.
					</AccordionItem>
				</Accordion>
			</Card>

			{/* CTA */}
			<section className="text-center mt-16">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">¿Listo para comenzar?</h2>
				<p className="text-gray-600 mb-6">
					Crea tu cuenta desde el botón circular de perfil y descubre todas las vacantes
					disponibles en nuestra plataforma.
				</p>
				<a
					href="/postulaciones"
					className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all"
				>
					Explorar ofertas laborales
				</a>
			</section>
		</main>
	);
}
