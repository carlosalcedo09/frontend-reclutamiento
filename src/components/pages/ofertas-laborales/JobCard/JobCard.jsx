'use client';

import {
	Send,
	Heart,
	House,
	Building,
	Gpu,
	Clock2,
	ClockFading,
	MailWarning,
	BadgeCheck,
	HatGlasses,
	MailCheck,
	TriangleAlert,
} from 'lucide-react';
import api from '@/lib/axios';

export default function JobCard({
	ofert,
	isLoggedIn,
	setModalConfirmContent,
	setIsModalConfirmOpen,
	onOpenModal,
}) {
	return (
		<div
			className="bg-white border p-6 sm:p-8 rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
			onClick={() => onOpenModal(ofert)}
		>
			<div className="flex justify-between items-center gap-2">
				<div className="flex items-center gap-2">
					<h1 className="sm:text-lg font-semibold text-black">{ofert.title}</h1>
					{ofert.is_urgent && (
						<span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
							Urgente
						</span>
					)}
				</div>

				<div className="flex items-center gap-2">
					<div
						className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
						onClick={async (e) => {
							e.stopPropagation();
							if (!isLoggedIn) {
								setModalConfirmContent({
									icon: <HatGlasses className="w-6 h-6 text-blue-900" />,
									title: 'Debes iniciar sesión',
									description:
										'Para enviar tu postulación, primero debes iniciar sesión en el sistema.',
									textbutton: 'Ir a iniciar sesión',
									onAction: () => (window.location.href = '/usuario/login'),
								});
								setIsModalConfirmOpen(true);
								return;
							}

							try {
								const res = await api.post('/jobapplications/', {
									joboffers_id: ofert.id,
								});

								if (res.status === 201 || res.status === 200) {
									setModalConfirmContent({
										icon: <MailCheck className="w-6 h-6 text-blue-900" />,
										title: 'Postulación enviada',
										description:
											'Tu postulación ha sido enviada correctamente, recuerda revisar la sección Mis Postulaciones y ver tu progreso',
										textbutton: 'Aceptar',
										onAction: () => setIsModalConfirmOpen(false),
									});
									setIsModalConfirmOpen(true);
								}
							} catch (error) {
								if (error.response?.status === 400) {
									setModalConfirmContent({
										icon: <MailWarning className="w-6 h-6 text-yellow-600" />,
										title: 'Ya postulaste',
										description:
											error.response.data?.non_field_errors?.[0] ||
											'Ya tienes una postulación para esta oferta, accede a mis postulaciones para ver su estado',
										textbutton: 'Ir a Mis Postulaciones',
										onAction: () =>
											(window.location.href = '/mis-postulaciones'),
									});
								} else {
									setModalConfirmContent({
										icon: <TriangleAlert className="w-6 h-6 text-red-600" />,
										title: 'Error al enviar postulación',
										description:
											'Hubo un problema al enviar tu postulación. Intenta nuevamente.',
										textbutton: 'Aceptar',
										onAction: () => setIsModalConfirmOpen(false),
									});
								}
								setIsModalConfirmOpen(true);
							}
						}}
					>
						<Send className="w-4 h-4 text-gray-900" />
					</div>

					<div
						className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
						onClick={(e) => {
							e.stopPropagation();
							console.log('Me gusta acción para:', ofert.id);
						}}
					>
						<Heart className="w-4 h-4 text-gray-900" />
					</div>
				</div>
			</div>

			<div className="flex items-center gap-2 py-2">
				<div className="bg-blue-900 w-7 h-7 flex items-center justify-center rounded-full">
					<BadgeCheck className="w-4 h-4 text-white" />
				</div>
				<p className="text-black text-sm">{ofert.company_name}</p>
			</div>

			<p className="text-gray-600 text-sm">{ofert.location}</p>
			<div className="relative max-h-32 overflow-y-auto rounded-md scrollbar-custom px-2 py-1">
				<p className="py-3 text-gray-700 text-sm">{ofert.description}</p>
				{ofert.description && ofert.description.length > 150 && (
					<div className="absolute bottom-0 left-0 w-full h-8 pointer-events-none" />
				)}
			</div>

			<div className="flex items-center gap-2 py-1">
				{ofert.mode === 'Remoto' && <House className="w-4 h-4 text-gray-500" />}
				{ofert.mode === 'Presencial' && <Building className="w-4 h-4 text-gray-500" />}
				{ofert.mode === 'Híbrido' && <Gpu className="w-4 h-4 text-gray-500" />}
				<p className="text-gray-600 text-sm">{ofert.mode}</p>
			</div>

			<div className="flex items-center gap-2">
				{ofert.employment_type === 'Full-Time' && (
					<Clock2 className="w-4 h-4 text-gray-500" />
				)}
				{ofert.employment_type === 'Part-Time' && (
					<ClockFading className="w-4 h-4 text-gray-500" />
				)}
				<p className="text-gray-600 text-sm">{ofert.employment_type}</p>
			</div>
			<div className="flex items-center gap-2 py-5">
				<p className="text-gray-400 text-sm">Publicado el {ofert.start_date}</p>
			</div>
		</div>
	);
}
