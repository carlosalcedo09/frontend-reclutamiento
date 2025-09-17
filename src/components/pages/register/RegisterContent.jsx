'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Briefcase } from 'lucide-react';
import InputField from '@/components/ui/InputField';

export default function RegisterContent() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		email: '',
		password: '',
		experience: '',
		field: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const nextStep = () => setStep((prev) => prev + 1);
	const prevStep = () => setStep((prev) => prev - 1);

	const submitForm = () => {
		console.log('Form submitted:', formData);
	};

	return (
		<section className="flex justify-center items-center py-12 px-4 bg-gray-50">
			{/* Contenedor principal */}
			<div className="w-full max-w-[1440px] bg-white rounded-2xl shadow p-10 min-h-[650px] flex flex-col">
				{/* Header */}
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold text-[#003b99]">Crear Cuenta</h1>
					<p className="text-gray-600 mt-2">Completa los pasos para registrarte</p>
				</div>

				{/* Steps Indicator */}
				<div className="flex justify-center mb-8 space-x-4">
					{['Datos Personales', 'Datos Profesionales', 'Confirmación'].map(
						(label, index) => (
							<div
								key={label}
								className={`px-4 py-2 rounded-full text-sm font-medium ${
									step === index + 1
										? 'bg-[#003b99] text-white'
										: 'bg-gray-200 text-gray-600'
								}`}
							>
								{label}
							</div>
						)
					)}
				</div>

				{/* Contenido dinámico */}
				<div className="flex-1 flex items-center justify-center">
					{step === 1 && (
						<form className="max-w-[600px] w-full space-y-6">
							<InputField
								type="text"
								name="name"
								label="Nombre"
								icon={<User className="w-5 h-5 mr-2 text-gray-500" />}
								value={formData.name}
								onChange={handleChange}
							/>
							<InputField
								type="text"
								name="lastName"
								label="Apellido"
								icon={<User className="w-5 h-5 mr-2 text-gray-500" />}
								value={formData.lastName}
								onChange={handleChange}
							/>
							<InputField
								type="email"
								name="email"
								label="Correo electrónico"
								icon={<Mail className="w-5 h-5 mr-2 text-gray-500" />}
								value={formData.email}
								onChange={handleChange}
							/>
							<InputField
								type="password"
								name="password"
								label="Contraseña"
								icon={<Lock className="w-5 h-5 mr-2 text-gray-500" />}
								value={formData.password}
								onChange={handleChange}
							/>

							<div className="flex justify-end">
								<button
									type="button"
									onClick={nextStep}
									className="px-6 py-2 bg-[#003b99] text-white rounded-lg font-semibold"
								>
									Siguiente
								</button>
							</div>
						</form>
					)}

					{step === 2 && (
						<form className="max-w-[600px] w-full space-y-6">
							<InputField
								type="text"
								name="experience"
								label="Años de experiencia"
								icon={<Briefcase className="w-5 h-5 mr-2 text-gray-500" />}
								value={formData.experience}
								onChange={handleChange}
							/>
							<InputField
								type="text"
								name="field"
								label="Área de especialidad"
								icon={<Briefcase className="w-5 h-5 mr-2 text-gray-500" />}
								value={formData.field}
								onChange={handleChange}
							/>

							<div className="flex justify-between">
								<button
									type="button"
									onClick={prevStep}
									className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium"
								>
									Volver
								</button>
								<button
									type="button"
									onClick={nextStep}
									className="px-6 py-2 bg-[#003b99] text-white rounded-lg font-semibold"
								>
									Siguiente
								</button>
							</div>
						</form>
					)}

					{step === 3 && (
						<div className="max-w-[600px] w-full space-y-6">
							<h2 className="text-xl font-semibold mb-4">Revisa tu información</h2>
							<ul className="space-y-2 text-gray-700">
								<li>
									<strong>Nombre:</strong> {formData.name} {formData.lastName}
								</li>
								<li>
									<strong>Email:</strong> {formData.email}
								</li>
								<li>
									<strong>Experiencia:</strong> {formData.experience} años
								</li>
								<li>
									<strong>Área:</strong> {formData.field}
								</li>
							</ul>

							<div className="flex justify-between mt-6">
								<button
									type="button"
									onClick={prevStep}
									className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium"
								>
									Volver
								</button>
								<button
									type="button"
									onClick={submitForm}
									className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold"
								>
									Confirmar Registro
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="text-center text-sm text-gray-500 mt-10">
					¿Ya tienes una cuenta?{' '}
					<Link href="/usuario/login" className="text-blue-600 font-medium hover:underline">
						Inicia sesión aquí
					</Link>
				</div>
			</div>
		</section>
	);
}
