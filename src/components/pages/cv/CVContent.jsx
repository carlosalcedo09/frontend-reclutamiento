'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import CVResumen from './cvResume/CVResume';
import CVExperiencia from './cvExperience/CVExperience';
import CVEducacion from './cvEducation/CVEducation';
import CVSkills from './cvSkills/CVSkills';
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

			// reutilizamos tu endpoint PATCH
			await api.patch('/candidates/update-profile/', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			toast.success('Foto actualizada correctamente');
			setIsModalOpen(false);
			setSelectedFile(null);
			fetchData(); // refrescar la data
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
				<div className="relative">
					<img
						src={candidate.photograph || '/avatar-placeholder.png'}
						alt="Foto de perfil"
						className="w-32 h-32 rounded-full border-4 border-[#003b99] object-cover cursor-pointer"
						onClick={() => setIsModalOpen(true)}
					/>
					<p className="text-xs text-center text-gray-500 mt-2">Haz click para cambiar</p>
				</div>
				<div>
					<h1 className="text-3xl font-bold text-[#003b99]">{candidate.name}</h1>
					<p className="text-gray-600 mt-2">
						{candidate.short_bio || 'Biografía no registrada'}
					</p>
					<div className="flex gap-6 mt-4 text-sm text-gray-700">
						<span>📍 {candidate.location || 'Ubicación no registrada'}</span>
						<span>🎓 {candidate.education_level || 'Educación no registrada'}</span>
						<span>📅 {candidate.birth_date}</span>
					</div>
					<div className="flex gap-4 mt-3">
						{candidate.linkedin_url && (
							<a
								href={candidate.linkedin_url}
								target="_blank"
								className="text-blue-600 underline"
							>
								LinkedIn
							</a>
						)}
						{candidate.portfolio_url && (
							<a
								href={candidate.portfolio_url}
								target="_blank"
								className="text-blue-600 underline"
							>
								Portafolio
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
				</div>

				{/* Columna derecha */}
				<div className="space-y-6 md:col-span-2">
					<CVSkills candidate={candidate} onSkillAdded={fetchData} />
					<CVExperiencia candidate={candidate} onExperienceAdded={fetchData} />
					<CVEducacion candidate={candidate} onEducationAdded={fetchData} />
				</div>
			</div>
		</div>
	);
}
