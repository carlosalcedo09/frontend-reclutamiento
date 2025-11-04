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
import api from '@/lib/axios';
import { toast } from 'react-toastify';

export default function ForgotPasswordModal({ isOpen, onClose }) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (!email) {
			toast.warning('Por favor ingresa tu correo electrónico');
			return;
		}

		setLoading(true);
		try {
			// ✅ Llama a tu nueva API Django
			await api.post('/users/recovery-password/', { email });

			toast.success(
				'Si el correo está registrado, se ha enviado un enlace para restablecer tu contraseña.'
			);
			setEmail('');
			onClose();
		} catch (error) {
			console.error(error);
			toast.error(
				error.response?.data?.error ||
					'Hubo un error al procesar tu solicitud. Intenta nuevamente.'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose}>
			<ModalContent>
				<ModalHeader className="text-lg font-bold text-[#003b99]">
					Recuperar contraseña
				</ModalHeader>

				<ModalBody className="space-y-4">
					<p className="text-sm text-gray-600">
						Ingresa tu correo electrónico registrado. Te enviaremos un enlace
						para restablecer tu contraseña.
					</p>

					<Input
						type="email"
						label="Correo electrónico"
						placeholder="ejemplo@correo.com"
						value={email}
						onValueChange={setEmail}
					/>
				</ModalBody>

				<ModalFooter>
					<Button variant="flat" onPress={onClose}>
						Cancelar
					</Button>
					<Button
						className="bg-[#003b99] text-white font-semibold"
						onPress={handleSubmit}
						disabled={loading}
					>
						{loading ? <Spinner size="sm" /> : 'Enviar'}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
