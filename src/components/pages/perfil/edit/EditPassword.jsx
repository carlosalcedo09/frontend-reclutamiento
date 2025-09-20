'use client';

import { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Spinner,
} from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react'; // 👁️ iconos
import api from '@/lib/axios';
import { toast } from 'react-toastify';

export default function EditPassword({ isOpen, onClose }) {
	const [formData, setFormData] = useState({
		current_password: '',
		new_password: '',
		confirm_password: '',
	});
	const [loading, setLoading] = useState(false);

	// Estados para visibilidad de cada input
	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});

	const handleChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const toggleVisibility = (field) => {
		setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	const handleSave = async () => {
		setLoading(true);
		try {
			await api.post('/users/change-password/', formData);
			toast.success('Contraseña actualizada correctamente');
			onClose(); // cerrar modal
			setFormData({ current_password: '', new_password: '', confirm_password: '' });
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.error || 'Error al actualizar la contraseña');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose}>
			<ModalContent>
				<ModalHeader className="text-lg font-bold">Cambiar Contraseña</ModalHeader>
				<ModalBody className="space-y-4">
					{/* Contraseña actual */}
					<Input
						type={showPassword.current ? 'text' : 'password'}
						label="Contraseña actual"
						value={formData.current_password}
						onValueChange={(val) => handleChange('current_password', val)}
						endContent={
							<button type="button" onClick={() => toggleVisibility('current')}>
								{showPassword.current ? (
									<EyeOff className="w-5 h-5 text-gray-500" />
								) : (
									<Eye className="w-5 h-5 text-gray-500" />
								)}
							</button>
						}
					/>

					{/* Nueva contraseña */}
					<Input
						type={showPassword.new ? 'text' : 'password'}
						label="Nueva contraseña"
						value={formData.new_password}
						onValueChange={(val) => handleChange('new_password', val)}
						endContent={
							<button type="button" onClick={() => toggleVisibility('new')}>
								{showPassword.new ? (
									<EyeOff className="w-5 h-5 text-gray-500" />
								) : (
									<Eye className="w-5 h-5 text-gray-500" />
								)}
							</button>
						}
					/>

					{/* Confirmar nueva contraseña */}
					<Input
						type={showPassword.confirm ? 'text' : 'password'}
						label="Confirmar nueva contraseña"
						value={formData.confirm_password}
						onValueChange={(val) => handleChange('confirm_password', val)}
						endContent={
							<button type="button" onClick={() => toggleVisibility('confirm')}>
								{showPassword.confirm ? (
									<EyeOff className="w-5 h-5 text-gray-500" />
								) : (
									<Eye className="w-5 h-5 text-gray-500" />
								)}
							</button>
						}
					/>
				</ModalBody>
				<ModalFooter>
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
