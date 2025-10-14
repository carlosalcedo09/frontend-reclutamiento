'use client';

import { useEffect, useState } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Button,
	Chip,
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
	FileText,
	Calendar,
	TrendingUp,
	Loader2,
	Lightbulb,
	ClipboardList,
	UserX,
	UserCheck,
	XCircle,
	CheckCircle,
} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '@/lib/axios';

export default function MisPostulacionesContent() {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedApplication, setSelectedApplication] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(null);

	const statusOptions = [
		'En evaluación',
		'Evaluado',
		'Aprobado',
		'Rechazado',
		'Contratado',
		'No contratado',
	];

	// 📡 Cargar postulaciones desde la API
	const fetchApplications = async (status = null) => {
		setLoading(true);
		try {
			const query = status ? `?status=${encodeURIComponent(status)}` : '';
			const response = await api.get(`/jobapplications/my-applications/${query}`);
			if (response.status === 200) {
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

	useEffect(() => {
		fetchApplications();
	}, []);

	const handleFilter = (status) => {
		if (status === selectedStatus) {
			setSelectedStatus(null);
			fetchApplications();
		} else {
			setSelectedStatus(status);
			fetchApplications(status);
		}
	};

	const handleOpenModal = (app) => {
		setSelectedApplication(app);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedApplication(null);
	};

	// 🔹 Configuración visual de estados
	const getAnalysisStatusConfig = (status) => {
		switch (status) {
			case 'En evaluación':
				return {
					icon: <Loader2 size={16} className="animate-spin text-yellow-500" />,
					color: 'text-yellow-600',
					label: 'En evaluación',
				};
			case 'Evaluado':
				return {
					icon: <Brain size={16} className="text-blue-500" />,
					color: 'text-blue-600',
					label: 'Evaluado',
				};
			case 'Aprobado':
				return {
					icon: <CheckCircle size={16} className="text-green-600" />,
					color: 'text-green-600',
					label: 'Aprobado',
				};
			case 'Rechazado':
				return {
					icon: <XCircle size={16} className="text-red-600" />,
					color: 'text-red-600',
					label: 'Rechazado',
				};
			case 'Contratado':
				return {
					icon: <UserCheck size={16} className="text-green-700" />,
					color: 'text-green-700 font-semibold',
					label: 'Contratado',
				};
			case 'No contratado':
				return {
					icon: <UserX size={16} className="text-gray-500" />,
					color: 'text-gray-500',
					label: 'No contratado',
				};
			default:
				return {
					icon: <Info size={16} className="text-gray-400" />,
					color: 'text-gray-500',
					label: status || 'Desconocido',
				};
		}
	};

	return (
		<div className="max-w-[1440px] mx-auto px-6 py-10">
			<h1 className="text-3xl font-bold mb-6 text-[#003b99] flex items-center gap-2">
				<FileText size={28} /> Mis Postulaciones
			</h1>

			{/* 🔹 Chips de filtros */}
			<div className="flex flex-wrap gap-2 mb-6">
				{statusOptions.map((status) => (
					<Chip
						key={status}
						variant={selectedStatus === status ? 'solid' : 'bordered'}
						color={selectedStatus === status ? 'primary' : 'default'}
						className="cursor-pointer"
						onClick={() => handleFilter(status)}
					>
						{status}
					</Chip>
				))}
				{selectedStatus && (
					<Button size="sm" variant="light" onPress={() => handleFilter(selectedStatus)}>
						Quitar filtro
					</Button>
				)}
			</div>

			{loading ? (
				<div className="flex flex-col items-center mt-20 text-gray-500">
					<Spinner size="lg" />
					<p className="mt-4 flex items-center gap-2">Cargando tus postulaciones...</p>
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
							className="shadow-md rounded-2xl border hover:shadow-lg transition-all duration-300 p-5"
						>
							<CardHeader className="flex justify-between items-start">
								<div className="space-y-1">
									<h2 className="text-lg font-semibold text-[#003b99]">
										{app.joboffers.title}
									</h2>
									<p className="text-sm text-gray-600">
										{app.joboffers.company_name}
									</p>
								</div>
							</CardHeader>

							<CardBody className="flex flex-col text-sm text-gray-700 space-y-3">
								<div className="flex flex-col gap-1">
									<p className="flex items-center gap-2">
										<MapPin size={16} className="text-gray-500" /> {app.joboffers.location}
									</p>
									{/* <p className="flex items-center gap-2">
										<Calendar size={16} className="text-gray-500" /> Aplicaste el:{' '}
										{new Date(app.created_at).toLocaleDateString()}
									</p> */}
								</div>

								<Divider />

								{app.analysis ? (
									<div className="space-y-1">
										<p className="flex items-center gap-2">
											<TrendingUp size={16} className="text-green-600" />{' '}
											<strong>Match score:</strong>{' '}
											{(parseFloat(app.analysis.fairness_overall_score)).toFixed(2)}%
										</p>

										{(() => {
											const { icon, color, label } = getAnalysisStatusConfig(app.analysis.status);
											return (
												<p className={`flex items-center gap-2 ${color}`}>
													{icon} {label}
												</p>
											);
										})()}

										<p className="flex items-center gap-2 text-gray-700">
											<Brain size={16} className="text-purple-600" />{' '}
											{app.analysis.observation || 'Sin observaciones'}
										</p>
									</div>
								) : (
									<p className="italic text-gray-500 flex items-center gap-2">
										<Loader2 size={16} className="animate-spin text-gray-400" /> En evaluación...
									</p>
								)}

								<Button
									className="mt-4 w-full bg-[#003b99] text-white"
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
			<Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} size="5xl" scrollBehavior="inside">
				<ModalContent>
					{selectedApplication && (
						<>
							<ModalHeader className="text-2xl font-bold text-[#003b99]">
								{selectedApplication.joboffers.title}
							</ModalHeader>
							<ModalBody>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-4">
										<p className="flex items-center gap-2">
											<Building2 size={18} /> <strong>{selectedApplication.joboffers.company_name}</strong>
										</p>
										<p className="flex items-center gap-2">
											<MapPin size={18} /> {selectedApplication.joboffers.location}
										</p>
										<p className="flex items-center gap-2">
											<Briefcase size={18} /> {selectedApplication.joboffers.employment_type}
										</p>
										<p className="flex items-center gap-2">
											<Laptop size={18} /> {selectedApplication.joboffers.mode}
										</p>
										<p className="flex items-center gap-2">
											<Coins size={18} /> S/.{selectedApplication.joboffers.salary_min} - S/.{selectedApplication.joboffers.salary_max}
										</p>

										<Divider />
										<p className="text-md font-semibold flex items-center gap-2">
											<ClipboardList size={16} /> Descripción del puesto:
										</p>
										<p className="text-sm text-gray-700 leading-relaxed">
											{selectedApplication.joboffers.description}
										</p>
									</div>

									<div className="bg-gray-50 rounded-xl p-4 border space-y-4">
										<h3 className="text-lg font-semibold flex items-center gap-2">
											<Brain size={20} /> Resultado de Análisis
											<Tooltip content="Esto representa el ajuste entre tu perfil y la oferta.">
												<Info size={16} className="text-[#003b99] cursor-pointer" />
											</Tooltip>
										</h3>

										{selectedApplication.analysis ? (
											<>
												<p className="text-4xl font-bold text-[#003b99]">
													{(parseFloat(selectedApplication.analysis.fairness_overall_score)).toFixed(2)}%
												</p>
												<p className="text-md">
													Estado: <strong>{selectedApplication.analysis.status}</strong>
												</p>
												<p className="italic text-gray-600 flex items-center gap-2">
													<Lightbulb size={16} /> {selectedApplication.analysis.observation || 'Sin observaciones'}
												</p>
											</>
										) : (
											<div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
												<Spinner size="lg" />
												<p className="mt-4 flex items-center gap-2">
													<Loader2 size={16} className="animate-spin" /> Tu postulación aún está siendo evaluada.
												</p>
												<p className="text-sm text-gray-400">Recibirás una actualización cuando el análisis esté disponible.</p>
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
