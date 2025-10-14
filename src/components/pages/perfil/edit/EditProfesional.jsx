'use client';

import { useState, useEffect } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Select,
	SelectItem,
	Spinner,
} from '@heroui/react';
import api from '@/lib/axios';
import { toast } from 'react-toastify';

export default function EditProfesional({ isOpen, onClose, candidate, onSave }) {
	const educationLevels = [
		{ code: 'Bachiller', name: 'Bachiller' },
		{ code: 'Especialidad', name: 'Especialidad' },
		{ code: 'Diplomado', name: 'Diplomado' },
		{ code: 'Maestría', name: 'Maestría' },
		{ code: 'Doctorado', name: 'Doctorado' },
	];
	const jobTypes = [
		{ code: 'Part-Time', name: 'Part-Time' },
		{ code: 'Full-Time', name: 'Full-Time' },
	];

	const [formData, setFormData] = useState({
		education_level: '',
		experience_years: '',
		availability: '',
		short_bio: '',
		linkedin_url: '',
		portfolio_url: '',
	});
	const [cvFile, setCvFile] = useState(null); // 🆕 nuevo estado para archivo

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (candidate) {
			setFormData({
				education_level: candidate.education_level || '',
				experience_years: candidate.experience_years || '',
				availability: candidate.availability || '',
				short_bio: candidate.short_bio || '',
				linkedin_url: candidate.linkedin_url || '',
				portfolio_url: candidate.portfolio_url || '',
			});
		}
	}, [candidate]);

	const handleChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSave = async () => {
		setLoading(true);
		try {
			const payload = new FormData(); // 🆕 usamos FormData
			for (const key in formData) {
				if (formData[key] !== undefined && formData[key] !== null) {
					payload.append(key, formData[key]);
				}
			}

			if (cvFile) {
				payload.append('cv_file', cvFile); // 🆕 subimos el archivo
			}

			const response = await api.patch('/candidates/update-profile/', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			toast.success('Datos profesionales actualizados correctamente');
			onSave(response.data); // actualizar vista del perfil
			onClose();
		} catch (error) {
			console.error(error);
			toast.error('Error al actualizar datos profesionales');
		} finally {
			setLoading(false);
		}
	};
	
	return (
		<Modal isOpen={isOpen} onOpenChange={onClose}>
			<ModalContent>
				<ModalHeader className="text-lg font-bold">Editar Datos Profesionales</ModalHeader>
				<ModalBody className="space-y-4">
					<Select
						label="Nivel educativo"
						selectedKeys={[formData.education_level]}
						onSelectionChange={(keys) =>
							handleChange('education_level', Array.from(keys)[0])
						}
					>
						{educationLevels.map((e) => (
							<SelectItem key={e.code}>{e.name}</SelectItem>
						))}
					</Select>

					<Input
						label="Años de experiencia"
						value={formData.experience_years}
						onValueChange={(val) => handleChange('experience_years', val)}
					/>

					<Select
						label="Disponibilidad"
						selectedKeys={[formData.availability]}
						onSelectionChange={(keys) =>
							handleChange('availability', Array.from(keys)[0])
						}
					>
						{jobTypes.map((j) => (
							<SelectItem key={j.code}>{j.name}</SelectItem>
						))}
					</Select>

					<Input
						label="Biografía"
						value={formData.short_bio}
						onValueChange={(val) => handleChange('short_bio', val)}
					/>
					<Input
						label="LinkedIn"
						value={formData.linkedin_url}
						onValueChange={(val) => handleChange('linkedin_url', val)}
					/>
					<Input
						label="Portafolio"
						value={formData.portfolio_url}
						onValueChange={(val) => handleChange('portfolio_url', val)}
					/>
					{/* 🆕 Campo de subida de archivo */}
					<div className="flex flex-col gap-2 mt-2">
						<label className="text-sm text-gray-600 font-medium">
							Subir CV (PDF o Word)
						</label>
						<input
							type="file"
							accept=".pdf,.doc,.docx"
							onChange={(e) => setCvFile(e.target.files[0])}
							className="border border-gray-300 rounded-lg p-2 text-sm"
						/>
						{candidate?.cv_file && (
							<a
								href={candidate.cv_file}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 text-sm hover:underline"
							>
								Ver CV actual
							</a>
						)}
					</div>
				</ModalBody>
				<ModalFooter className="flex items-center gap-2">
					<Button variant="flat" onPress={onClose}>
						Cancelar
					</Button>
					<Button
						className="bg-[#003b99] text-white font-semibold"
						onPress={handleSave}
						disabled={loading}
					>
						{loading ? <Spinner size="sm" /> : 'Guardar'}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
