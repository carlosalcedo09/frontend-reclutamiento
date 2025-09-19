'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User } from 'lucide-react';
import InputField from '@/components/ui/InputField';
import api from '@/lib/axios';
import { getToken } from 'next-auth/jwt';
import { Select, SelectItem } from '@heroui/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function RegisterContent() {
	const [step, setStep] = useState(1);
	const router = useRouter();
	const [formData, setFormData] = useState({
		// User
		username: '',
		password: '',
		email: '',
		// Candidate
		name: '',
		lastName: '',
		document_type: '',
		document_number: '',
		country: '',
		gender: '',
		birth_date: '',
		education_level: '',
		location: '',
		short_bio: '',
		experience_years: '',
		avaliability: '',
		linkedin_url: '',
		portfolio_url: '',
	});
	const countries = [
		{ code: 'Perú', name: 'Perú' },
		{ code: 'Chile', name: 'Chile' },
		{ code: 'Ecuador', name: 'Ecuador' },
		// ...puedes agregar más según lo que necesites
	];
	const genders = [
		{ code: 'Masculino', name: 'Masculino' },
		{ code: 'Femenino', name: 'Femenino' },
	];
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

	const normalizeUrl = (url) => {
		if (!url) return '';
		if (!/^https?:\/\//i.test(url)) {
			return `https://${url}`;
		}
		return url;
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelectChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	const nextStep = () => setStep((prev) => prev + 1);
	const prevStep = () => setStep((prev) => prev - 1);

	const submitForm = async () => {
		const dataToSend = {
			...formData,
			linkedin_url: normalizeUrl(formData.linkedin_url),
			portfolio_url: normalizeUrl(formData.portfolio_url),
		};

		try {
			const response = await api.post('/users/register/', dataToSend);
			console.log('Form submitted successfully:', response.data);
			if (response.status == 201) {
				toast.success('Registro exitoso. Por favor, inicia sesión.');
				router.push('/usuario/login');
			} else {
				toast.error('Error en el registro. Inténtalo de nuevo.');
			}
		} catch (error) {
			toast.error('Error en el registro. Inténtalo de nuevo.');
		}
	};

	return (
		<section className="flex justify-center items-center py-12 px-4 bg-gray-50">
			<div className="w-full max-w-[1440px] bg-white rounded-2xl shadow p-10 min-h-[650px] flex flex-col">
				{/* Header */}
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold text-[#003b99]">Crear Cuenta</h1>
					<p className="text-gray-600 mt-2">Completa los pasos para registrarte</p>
				</div>

				{/* Steps */}
				<div className="flex justify-center mb-8 space-x-4">
					{['Cuenta', 'Personales', 'Profesionales', 'Confirmación'].map(
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
					{/* Paso 1 - Cuenta */}
					{step === 1 && (
						<form className="max-w-[600px] w-full space-y-6">
							<InputField
								type="text"
								name="username"
								label="Usuario"
								icon={<User className="w-5 h-5 mr-2 text-gray-500" />}
								value={formData.username}
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

					{/* Paso 2 - Personales */}
					{step === 2 && (
						<form className="max-w-[900px] w-full space-y-6">
							<div className="grid grid-cols-2 gap-6">
								<InputField
									name="name"
									label="Nombre"
									value={formData.name}
									onChange={handleChange}
								/>
								<InputField
									name="lastName"
									label="Apellido"
									value={formData.lastName}
									onChange={handleChange}
								/>
								<Select
									name="document_type"
									label="Tipo de documento"
									labelPlacement="outside"
									placeholder="Seleccionar"
									selectedKeys={[formData.document_type]} // 👈 en lugar de value
									onSelectionChange={(keys) =>
										handleSelectChange('document_type', Array.from(keys)[0])
									}
									className="!rounded-md"
								>
									<SelectItem key="Dni">Dni</SelectItem>
									<SelectItem key="Carnet extranjeria">
										Carnet extranjeria
									</SelectItem>
									<SelectItem key="Pasaporte">Pasaporte</SelectItem>
								</Select>
								<InputField
									name="document_number"
									label="Número de documento"
									value={formData.document_number}
									onChange={handleChange}
								/>
								<Select
									name="country"
									label="País"
									labelPlacement="outside"
									placeholder="Seleccionar"
									selectedKeys={[formData.country]}
									onSelectionChange={(keys) =>
										setFormData({ ...formData, country: Array.from(keys)[0] })
									}
								>
									<SelectItem key="">Seleccionar</SelectItem>
									{countries.map((c) => (
										<SelectItem key={c.code}>{c.name}</SelectItem>
									))}
								</Select>
								<Select
									name="gender"
									label="Género"
									labelPlacement="outside"
									placeholder="Seleccionar"
									selectedKeys={[formData.gender]}
									onSelectionChange={(keys) =>
										setFormData({ ...formData, gender: Array.from(keys)[0] })
									}
								>
									<SelectItem key="">Seleccionar</SelectItem>
									{genders.map((g) => (
										<SelectItem key={g.code}>{g.name}</SelectItem>
									))}
								</Select>
								<InputField
									type="date"
									name="birth_date"
									label="Fecha de nacimiento"
									value={formData.birth_date}
									onChange={handleChange}
								/>
								<InputField
									name="location"
									label="Dirección"
									value={formData.location}
									onChange={handleChange}
								/>
							</div>

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

					{/* Paso 3 - Profesionales */}
					{step === 3 && (
						<form className="max-w-[900px] w-full space-y-6">
							<div className="grid grid-cols-2 gap-6">
								<Select
									name="education_level"
									label="Nivel de educación"
									labelPlacement="outside"
									placeholder="Seleccionar"
									selectedKeys={[formData.education_level]}
									onSelectionChange={(keys) =>
										setFormData({
											...formData,
											education_level: Array.from(keys)[0],
										})
									}
								>
									<SelectItem key="">Seleccionar</SelectItem>
									{educationLevels.map((edu) => (
										<SelectItem key={edu.code}>{edu.name}</SelectItem>
									))}
								</Select>
								<InputField
									name="short_bio"
									label="Breve biografía"
									value={formData.short_bio}
									onChange={handleChange}
								/>
								<InputField
									name="experience_years"
									label="Años de experiencia"
									value={formData.experience_years}
									onChange={handleChange}
								/>
								<Select
									name="avaliability"
									label="Disponibilidad"
									labelPlacement="outside"
									placeholder="Seleccionar"
									selectedKeys={[formData.avaliability]}
									onSelectionChange={(keys) =>
										setFormData({
											...formData,
											avaliability: Array.from(keys)[0],
										})
									}
								>
									<SelectItem key="">Seleccionar</SelectItem>
									{jobTypes.map((job) => (
										<SelectItem key={job.code}>{job.name}</SelectItem>
									))}
								</Select>
								<InputField
									name="linkedin_url"
									label="LinkedIn"
									value={formData.linkedin_url}
									onChange={handleChange}
								/>
								<InputField
									name="portfolio_url"
									label="Portafolio"
									value={formData.portfolio_url}
									onChange={handleChange}
								/>
							</div>

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

					{/* Paso 4 - Confirmación */}
					{step === 4 && (
						<div className="max-w-[800px] w-full space-y-6">
							<h2 className="text-xl font-semibold mb-4">Revisa tu información</h2>

							<div className="grid grid-cols-2 gap-4 text-gray-700">
								<p>
									<strong>Usuario:</strong> {formData.username}
								</p>
								<p>
									<strong>Email:</strong> {formData.email}
								</p>
								<p>
									<strong>Nombre:</strong> {formData.name} {formData.lastName}
								</p>
								<p>
									<strong>Documento:</strong> {formData.document_type}{' '}
									{formData.document_number}
								</p>
								<p>
									<strong>País:</strong> {formData.country}
								</p>
								<p>
									<strong>Género:</strong> {formData.gender}
								</p>
								<p>
									<strong>Nacimiento:</strong> {formData.birth_date}
								</p>
								<p>
									<strong>Dirección:</strong> {formData.location}
								</p>
								<p>
									<strong>Educación:</strong> {formData.education_level}
								</p>
								<p>
									<strong>Experiencia:</strong> {formData.experience_years} años
								</p>
								<p>
									<strong>Disponibilidad:</strong> {formData.avaliability}
								</p>
								<p>
									<strong>LinkedIn:</strong> {formData.linkedin_url}
								</p>
								<p>
									<strong>Portafolio:</strong> {formData.portfolio_url}
								</p>
								<p className="col-span-2">
									<strong>Bio:</strong> {formData.short_bio}
								</p>
							</div>

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
					<Link
						href="/usuario/login"
						className="text-blue-600 font-medium hover:underline"
					>
						Inicia sesión aquí
					</Link>
				</div>
			</div>
		</section>
	);
}
