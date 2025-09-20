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
} from '@heroui/react';
import { toast } from 'react-toastify';
import api from '@/lib/axios';

export default function EditPersonal({ isOpen, onClose, candidate, onSave }) {
    const [loading, setLoading] = useState(false);
	const countries = [
		{ code: 'Perú', name: 'Perú' },
		{ code: 'Chile', name: 'Chile' },
		{ code: 'Ecuador', name: 'Ecuador' },
	];
	const genders = [
		{ code: 'Masculino', name: 'Masculino' },
		{ code: 'Femenino', name: 'Femenino' },
	];
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		gender: '',
		birth_date: '',
		country: '',
	});

	useEffect(() => {
		if (candidate) {
			setFormData({
				name: candidate.name || '',
				location: candidate.location || '',
				gender: candidate.gender || '',
				birth_date: candidate.birth_date || '',
				country: candidate.country || '',
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

			toast.success('Datos personales actualizados correctamente');
			onSave(response.data); // Actualiza el estado del perfil en PerfilContent
			onClose();
		} catch (error) {
			console.error(error);
			toast.error('Error al actualizar datos personales');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose}>
			<ModalContent>
				<ModalHeader className="text-lg font-bold">Editar Datos Personales</ModalHeader>
				<ModalBody className="space-y-4">
					<Input
						label="Nombre completo"
						value={formData.name}
						onValueChange={(val) => handleChange('name', val)}
					/>
					<Select
						label="País"
						selectedKeys={[formData.country]}
						onSelectionChange={(keys) => handleChange('country', Array.from(keys)[0])}
					>
						{countries.map((c) => (
							<SelectItem key={c.code} value={c.code}>
								{c.name}
							</SelectItem>
						))}
					</Select>
					<Input
						label="Dirección"
						value={formData.location}
						onValueChange={(val) => handleChange('location', val)}
					/>
					<Select
						label="Sexo"
						selectedKeys={[formData.gender]}
						onSelectionChange={(keys) => handleChange('gender', Array.from(keys)[0])}
					>
						{genders.map((g) => (
							<SelectItem key={g.code} value={g.code}>
								{g.name}
							</SelectItem>
						))}
					</Select>
					<Input
						type="date"
						label="Fecha de nacimiento"
						value={formData.birth_date}
						onValueChange={(val) => handleChange('birth_date', val)}
					/>
				</ModalBody>
				<ModalFooter>
					<Button variant="flat" onPress={onClose}>
						Cancelar
					</Button>
					<Button className="bg-[#003b99] text-white font-semibold" onPress={handleSave}>
						Guardar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
