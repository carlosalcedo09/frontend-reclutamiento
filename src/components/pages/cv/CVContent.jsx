'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import CVResumen from './cvResume/CVResume';
import CVExperiencia from './cvExperience/CVExperience';
import CVEducacion from './cvEducation/CVEducation';
import CVSkills from './cvSkills/CVSkills';
import CVCertificates from './cvCertificates/cvCertifcates';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spinner,
} from '@heroui/react';
import { toast } from 'react-toastify';
import {
	User,
	MapPin,
	GraduationCap,
	Calendar,
	Globe,
	Briefcase,
	Image as ImageIcon,
} from 'lucide-react';

export default function CVContent() {
	const [cvData, setCvData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		try {
			const res = await api.get('/users/profile/');
			setCvData(res.data);
		} catch (error) {
			console.error('Error al cargar el CV', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (!cvData) return <p className="text-center mt-10 text-gray-500">Cargando CV...</p>;

	const candidate = cvData.candidate;

	const handleSavePhoto = async () => {
		if (!selectedFile) {
			toast.error('Selecciona una imagen primero');
			return;
		}
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append('photograph', selectedFile);

			await api.patch('/candidates/update-profile/', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			toast.success('Foto actualizada correctamente');
			setIsModalOpen(false);
			setSelectedFile(null);
			fetchData();
		} catch (error) {
			console.error(error);
			toast.error('Error al actualizar la foto');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-[1440px] mx-auto px-6 py-10">
			{/* Cabecera del candidato */}
			<div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
				<div className="relative flex flex-col items-center w-full">
					<div
						className="relative group cursor-pointer"
						onClick={() => setIsModalOpen(true)}
					>
						<img
							src={candidate.photograph || '/avatar-placeholder.png'}
							alt="Foto de perfil"
							className="w-32 h-32 rounded-full border-4 border-[#003b99] object-cover"
						/>
						<div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
							<ImageIcon className="w-6 h-6 text-white" />
						</div>
					</div>
					<p className="text-xs text-gray-500 mt-2">Haz click para cambiar</p>
				</div>

				<div>
					<h1 className="text-3xl font-bold text-[#003b99] flex items-center gap-2">
						<User className="w-7 h-7 text-[#003b99]" /> {candidate.name}
					</h1>
					<p className="text-gray-600 mt-2">
						{candidate.short_bio || 'Biografía no registrada'}
					</p>
					<div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-700">
						<span className="flex items-center gap-1">
							<MapPin className="w-4 h-4 text-gray-500" />
							{candidate.location || 'Ubicación no registrada'}
						</span>
						<span className="flex items-center gap-1">
							<GraduationCap className="w-4 h-4 text-gray-500" />
							{candidate.education_level || 'Educación no registrada'}
						</span>
						<span className="flex items-center gap-1">
							<Calendar className="w-4 h-4 text-gray-500" />
							{candidate.birth_date || 'Fecha no registrada'}
						</span>
					</div>
					<div className="flex gap-4 mt-3">
						{candidate.linkedin_url && (
							<a
								href={candidate.linkedin_url}
								target="_blank"
								className="flex items-center gap-1 text-blue-600 underline"
							>
								<Globe className="w-4 h-4" /> LinkedIn
							</a>
						)}
						{candidate.portfolio_url && (
							<a
								href={candidate.portfolio_url}
								target="_blank"
								className="flex items-center gap-1 text-blue-600 underline"
							>
								<Briefcase className="w-4 h-4" /> Portafolio
							</a>
						)}
					</div>
				</div>
			</div>

			{/* Modal para editar foto */}
			<Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
				<ModalContent>
					<ModalHeader>Cambiar Foto de Perfil</ModalHeader>
					<ModalBody>
						<Input
							type="file"
							accept="image/*"
							onChange={(e) => setSelectedFile(e.target.files[0])}
						/>
						{selectedFile && (
							<div className="mt-4">
								<p className="text-sm text-gray-600">Vista previa:</p>
								<img
									src={URL.createObjectURL(selectedFile)}
									alt="preview"
									className="w-24 h-24 rounded-full border mt-2 object-cover"
								/>
							</div>
						)}
					</ModalBody>
					<ModalFooter>
						<Button variant="flat" onPress={() => setIsModalOpen(false)}>
							Cancelar
						</Button>
						<Button
							className="bg-[#003b99] text-white"
							onPress={handleSavePhoto}
							disabled={loading}
						>
							{loading ? <Spinner size="sm" /> : 'Guardar'}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Grid en dos columnas */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Columna izquierda */}
				<div className="space-y-6 md:col-span-1">
					<CVResumen candidate={candidate} />
					<CVSkills candidate={candidate} onSkillAdded={fetchData} />
				</div>

				{/* Columna derecha */}
				<div className="space-y-6 md:col-span-2">
					<CVEducacion candidate={candidate} onEducationAdded={fetchData} />
					<CVExperiencia candidate={candidate} onExperienceAdded={fetchData} />
					<CVCertificates candidate={candidate} onCertificateAdded={fetchData} />
				</div>
			</div>
		</div>
	);
}
