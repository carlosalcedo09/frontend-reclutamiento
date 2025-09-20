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
		{ code: 'Secundaria', name: 'Secundaria' },
		{ code: 'Técnico', name: 'Técnico' },
		{ code: 'Licenciatura', name: 'Licenciatura' },
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
		avaliability: '',
		short_bio: '',
		linkedin_url: '',
		portfolio_url: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (candidate) {
			setFormData({
				education_level: candidate.education_level || '',
				experience_years: candidate.experience_years || '',
				avaliability: candidate.avaliability || '',
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
			const response = await api.patch('/candidates/update-profile/', formData);
			toast.success('Datos profesionales actualizados correctamente');
			onSave(response.data); // Actualiza el estado del perfil en PerfilContent
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
						selectedKeys={[formData.avaliability]}
						onSelectionChange={(keys) =>
							handleChange('avaliability', Array.from(keys)[0])
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
