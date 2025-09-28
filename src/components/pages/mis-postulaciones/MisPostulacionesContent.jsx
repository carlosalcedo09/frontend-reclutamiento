'use client';

import { useEffect, useState } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Badge,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	Divider,
	Spinner,
} from '@heroui/react';
import {
	Building2,
	MapPin,
	Briefcase,
	Laptop,
	Brain,
	Info,
	Coins,
} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '@/lib/axios';

export default function MisPostulacionesContent() {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedApplication, setSelectedApplication] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 📡 Cargar postulaciones desde la API
	useEffect(() => {
		const fetchApplications = async () => {
			try {
				const response = await api.get('/jobapplications/my-applications/');
				if (response.status === 200) {
					// Normalizamos el análisis (puede venir como array vacío)
					const normalized = response.data.map((app) => ({
						...app,
						analysis: app.analysis?.[0] || null,
					}));
					setApplications(normalized);
				} else {
					toast.error('No se pudieron cargar tus postulaciones.');
				}
			} catch (error) {
				console.error(error);
				if (error.response?.status === 401) {
					toast.error('Debes iniciar sesión para ver tus postulaciones.');
				} else {
					toast.error('Error al cargar las postulaciones. Inténtalo más tarde.');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchApplications();
	}, []);

	const handleOpenModal = (app) => {
		setSelectedApplication(app);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedApplication(null);
	};

	return (
		<div className="max-w-[1440px] mx-auto px-6 py-10">
			<h1 className="text-3xl font-bold mb-8 text-[#003b99]">📄 Mis Postulaciones</h1>

			{loading ? (
				<div className="flex flex-col items-center mt-20 text-gray-500">
					<Spinner size="lg" />
					<p className="mt-4">Cargando tus postulaciones...</p>
				</div>
			) : applications.length === 0 ? (
				<div className="text-center mt-20 text-gray-500">
					<p>No tienes postulaciones registradas aún.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{applications.map((app) => (
						<Card
							key={app.id}
							className="shadow-md rounded-2xl border hover:shadow-lg transition-all duration-300"
						>
							<CardHeader className="flex justify-between items-start">
								<div>
									<h2 className="text-lg font-semibold text-[#003b99]">
										{app.joboffers.title}
									</h2>
									<p className="text-sm text-gray-600">
										{app.joboffers.company_name}
									</p>
								</div>
								<Badge
									color={
										app.status === 'Finalista'
											? 'success'
											: app.status === 'En revisión'
											? 'warning'
											: 'danger'
									}
									variant="flat"
								>
									{app.status}
								</Badge>
							</CardHeader>

							<CardBody className="flex flex-col justify-between text-sm text-gray-700 space-y-0.5 min-h-[220px]">
								<p>📍 {app.joboffers.location}</p>
								<p>📅 Aplicaste el: {new Date(app.created_at).toLocaleDateString()}</p>

								{app.analysis ? (
									<>
										<p>
											📊 <strong>Match score:</strong>{' '}
											{(parseFloat(app.analysis.match_score) * 100).toFixed(2)}%
										</p>

										<p>🧠 {app.analysis.observation}</p>
									</>
								) : (
									<p className="italic text-gray-500 mt-2">⏳ En evaluación...</p>
								)}

								<Button
									className="mt-auto w-full bg-[#003b99] text-white"
									size="sm"
									variant="solid"
									onPress={() => handleOpenModal(app)}
								>
									Ver detalles
								</Button>
							</CardBody>
						</Card>
					))}
				</div>
			)}

			{/* 📌 Modal Detalle */}
			<Modal
				isOpen={isModalOpen}
				onOpenChange={setIsModalOpen}
				size="5xl"
				scrollBehavior="inside"
			>
				<ModalContent>
					{selectedApplication && (
						<>
							<ModalHeader className="text-2xl font-bold text-[#003b99]">
								{selectedApplication.joboffers.title}
							</ModalHeader>
							<ModalBody>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									{/* 🧾 Columna izquierda: Información del puesto */}
									<div className="space-y-4">
										<p className="flex items-center gap-2">
											<Building2 size={18} />{' '}
											<strong>
												{selectedApplication.joboffers.company_name}
											</strong>
										</p>
										<p className="flex items-center gap-2">
											<MapPin size={18} />{' '}
											{selectedApplication.joboffers.location}
										</p>
										<p className="flex items-center gap-2">
											<Briefcase size={18} />{' '}
											{selectedApplication.joboffers.employment_type}
										</p>
										<p className="flex items-center gap-2">
											<Laptop size={18} />{' '}
											{selectedApplication.joboffers.mode}
										</p>
										<p className="flex items-center gap-2">
											<Coins size={18} /> S/.
											{selectedApplication.joboffers.salary_min} - S/.
											{selectedApplication.joboffers.salary_max}
										</p>

										<Divider />
										<p className="text-md font-semibold">
											📝 Descripción del puesto:
										</p>
										<p className="text-sm text-gray-700 leading-relaxed">
											{selectedApplication.joboffers.description}
										</p>
									</div>

									{/* 📊 Columna derecha: Análisis */}
									<div className="bg-gray-50 rounded-xl p-4 border space-y-4">
										<h3 className="text-lg font-semibold flex items-center gap-2">
											<Brain size={20} /> Resultado de Análisis
											<Tooltip content="Esto representa el ajuste entre tu perfil y la oferta.">
												<Info
													size={16}
													className="text-[#003b99] cursor-pointer"
												/>
											</Tooltip>
										</h3>

										{selectedApplication.analysis ? (
											<>
												<p className="text-4xl font-bold text-[#003b99]">
													{(
														parseFloat(selectedApplication.analysis.match_score) *
														100
													).toFixed(1)}
													%
												</p>
												<p className="text-md">
													Estado:{' '}
													<strong>
														{selectedApplication.analysis.status}
													</strong>
												</p>
												<p className="italic text-gray-600">
													💡 {selectedApplication.analysis.observation}
												</p>
											</>
										) : (
											<div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
												<Spinner size="lg" />
												<p className="mt-4">
													Tu postulación aún está siendo evaluada.
												</p>
												<p className="text-sm text-gray-400">
													Recibirás una actualización cuando el análisis
													esté disponible.
												</p>
											</div>
										)}
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="default" variant="flat" onPress={handleCloseModal}>
									Cerrar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
