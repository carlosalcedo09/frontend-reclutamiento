'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input, Button, Spinner, Card, CardBody } from '@heroui/react';
import api from '@/lib/axios';
import { toast } from 'react-toastify';

export default function ResetPasswordContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const [formData, setFormData] = useState({
		new_password: '',
		confirm_password: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!token) {
			toast.error('Token no válido o faltante.');
			router.push('/login');
		}
	}, [token, router]);

	const handleChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async () => {
		if (!formData.new_password || !formData.confirm_password) {
			toast.warning('Debes ingresar y confirmar la nueva contraseña.');
			return;
		}
		if (formData.new_password !== formData.confirm_password) {
			toast.warning('Las contraseñas no coinciden.');
			return;
		}

		setLoading(true);
		try {
			console.log(formData.new_password);
			await api.post('/users/confirm-password/', {
				token,
				new_password: formData.new_password,
			});

			toast.success('Tu contraseña ha sido restablecida correctamente.');
			router.push('/usuario/login');
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.error || 'Error al restablecer la contraseña.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
			<Card className="max-w-md w-full shadow-md rounded-2xl">
				<CardBody className="p-6 space-y-4">
					<h2 className="text-2xl font-bold text-center text-[#003b99]">
						Restablecer contraseña
					</h2>
					<p className="text-sm text-gray-600 text-center">
						Ingresa tu nueva contraseña para continuar.
					</p>

					<Input
						type="password"
						label="Nueva contraseña"
						value={formData.new_password}
						onValueChange={(val) => handleChange('new_password', val)}
					/>
					<Input
						type="password"
						label="Confirmar contraseña"
						value={formData.confirm_password}
						onValueChange={(val) => handleChange('confirm_password', val)}
					/>

					<Button
						className="w-full bg-[#003b99] text-white font-semibold mt-2"
						onPress={handleSubmit}
						disabled={loading}
					>
						{loading ? <Spinner size="sm" /> : 'Guardar nueva contraseña'}
					</Button>
				</CardBody>
			</Card>
		</div>
	);
}
