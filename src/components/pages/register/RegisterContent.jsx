'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input, Select, SelectItem, Button } from '@heroui/react';
import api from '@/lib/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterContent() {
	const [step, setStep] = useState(1);
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const [formData, setFormData] = useState({
		username: '',
		password: '',
		email: '',
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

	const handleInputChange = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleSelectChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	const validateStep = () => {
		const inputs = document.querySelectorAll(
			`[data-step="${step}"] input, [data-step="${step}"] select`
		);
		for (let input of inputs) {
			if (!input.checkValidity()) {
				input.reportValidity();
				return false;
			}
		}
		return true;
	};

	const nextStep = () => {
		if (validateStep()) setStep((prev) => prev + 1);
	};
	const prevStep = () => setStep((prev) => prev - 1);

	const submitForm = async () => {
		const dataToSend = {
			...formData,
			linkedin_url: normalizeUrl(formData.linkedin_url),
			portfolio_url: normalizeUrl(formData.portfolio_url),
		};

		try {
			const response = await api.post('/users/register/', dataToSend);

			if (response.status === 201) {
				toast.success('Registro exitoso. Por favor, inicia sesión.');
				router.push('/usuario/login');
			} else {
				if (response.data && response.data.message) {
					toast.error(response.data.message);
				}
			}
		} catch (error) {
			// Si el backend envía {"message": "Este DNI ya fue registrado"}
			if (error.response && error.response.data && error.response.data.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error('Error en el registro. Inténtalo de nuevo.');
			}
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
					{/* Paso 1 */}
					{step === 1 && (
						<form data-step="1" className="max-w-[600px] w-full space-y-6">
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu usuario"
								name="username"
								label="Usuario"
								isRequired
								value={formData.username}
								onValueChange={(val) => handleInputChange('username', val)}
							/>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu correo electrónico"
								name="email"
								type="email"
								label="Correo electrónico"
								isRequired
								value={formData.email}
								onValueChange={(val) => handleInputChange('email', val)}
							/>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu contraseña"
								name="password"
								endContent={
									<button
										aria-label="toggle password visibility"
										className="focus:outline-none"
										type="button"
										onClick={toggleVisibility}
									>
										{isVisible ? (
											<EyeOff className="w-5 h-5 text-gray-400 pointer-events-none" />
										) : (
											<Eye className="w-5 h-5 text-gray-400 pointer-events-none" />
										)}
									</button>
								}
								type={isVisible ? 'text' : 'password'}
								label="Contraseña"
								isRequired
								value={formData.password}
								onValueChange={(val) => handleInputChange('password', val)}
							/>

							<div className="flex justify-end">
								<Button color={'primary'} onPress={nextStep}>
									Siguiente
								</Button>
							</div>
						</form>
					)}

					{/* Paso 2 */}
					{step === 2 && (
						<form
							data-step="2"
							className="max-w-[900px] w-full  grid grid-cols-2 gap-6"
						>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu nombre"
								name="name"
								label="Nombre"
								isRequired
								value={formData.name}
								onValueChange={(val) => handleInputChange('name', val)}
							/>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu apellido"
								name="lastName"
								label="Apellido"
								isRequired
								value={formData.lastName}
								onValueChange={(val) => handleInputChange('lastName', val)}
							/>
							<Select
								className="py-2"
								labelPlacement="outside"
								placeholder="Selecciona un tipo de documento"
								label="Tipo de documento"
								selectedKeys={[formData.document_type]}
								onSelectionChange={(keys) =>
									handleSelectChange('document_type', Array.from(keys)[0])
								}
								isRequired
							>
								<SelectItem key="Dni">Dni</SelectItem>
								<SelectItem key="Carnet extranjeria">Carnet extranjeria</SelectItem>
								<SelectItem key="Pasaporte">Pasaporte</SelectItem>
							</Select>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu número de documento"
								name="document_number"
								label="Número de documento"
								isRequired
								value={formData.document_number}
								onValueChange={(val) => handleInputChange('document_number', val)}
							/>
							<Select
								labelPlacement="outside"
								placeholder="Selecciona un país"
								className="py-2"
								label="País"
								selectedKeys={[formData.country]}
								onSelectionChange={(keys) =>
									handleSelectChange('country', Array.from(keys)[0])
								}
								isRequired
							>
								{countries.map((c) => (
									<SelectItem key={c.code}>{c.name}</SelectItem>
								))}
							</Select>
							<Select
								className="py-2"
								label="Género"
								labelPlacement="outside"
								placeholder="Selecciona un género"
								selectedKeys={[formData.gender]}
								onSelectionChange={(keys) =>
									handleSelectChange('gender', Array.from(keys)[0])
								}
								isRequired
							>
								{genders.map((g) => (
									<SelectItem key={g.code}>{g.name}</SelectItem>
								))}
							</Select>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu fecha de nacimiento"
								type="date"
								name="birth_date"
								label="Fecha de nacimiento"
								isRequired
								value={formData.birth_date}
								onValueChange={(val) => handleInputChange('birth_date', val)}
							/>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu dirección"
								name="location"
								label="Dirección"
								isRequired
								value={formData.location}
								onValueChange={(val) => handleInputChange('location', val)}
							/>

							<div className="col-span-2 flex justify-between">
								<Button onPress={prevStep} variant="flat">
									Volver
								</Button>
								<Button color={'primary'} onPress={nextStep}>
									Siguiente
								</Button>
							</div>
						</form>
					)}

					{/* Paso 3 */}
					{step === 3 && (
						<form data-step="3" className="max-w-[900px] w-full grid grid-cols-2 gap-6">
							<Select
								className="py-2"
								labelPlacement="outside"
								placeholder="Selecciona tu nivel de educación"
								label="Nivel de educación"
								selectedKeys={[formData.education_level]}
								onSelectionChange={(keys) =>
									handleSelectChange('education_level', Array.from(keys)[0])
								}
								isRequired
							>
								{educationLevels.map((edu) => (
									<SelectItem key={edu.code}>{edu.name}</SelectItem>
								))}
							</Select>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa una breve biografía"
								name="short_bio"
								label="Breve biografía"
								isRequired
								value={formData.short_bio}
								onValueChange={(val) => handleInputChange('short_bio', val)}
							/>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tus años de experiencia"
								name="experience_years"
								label="Años de experiencia"
								isRequired
								value={formData.experience_years}
								onValueChange={(val) => handleInputChange('experience_years', val)}
							/>
							<Select
								className="py-2"
								label="Disponibilidad"
								labelPlacement="outside"
								placeholder="Selecciona tu disponibilidad"
								selectedKeys={[formData.avaliability]}
								onSelectionChange={(keys) =>
									handleSelectChange('avaliability', Array.from(keys)[0])
								}
								isRequired
							>
								{jobTypes.map((job) => (
									<SelectItem key={job.code}>{job.name}</SelectItem>
								))}
							</Select>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa tu URL de LinkedIn"
								name="linkedin_url"
								label="LinkedIn"
								isRequired
								value={formData.linkedin_url}
								onValueChange={(val) => handleInputChange('linkedin_url', val)}
							/>
							<Input
								className="py-2"
								labelPlacement="outside"
								placeholder="Ingresa la URL de tu portafolio"
								name="portfolio_url"
								label="Portafolio"
								isRequired
								value={formData.portfolio_url}
								onValueChange={(val) => handleInputChange('portfolio_url', val)}
							/>

							<div className="col-span-2 flex justify-between">
								<Button onPress={prevStep} variant="flat">
									Volver
								</Button>
								<Button color={'primary'} onPress={nextStep}>
									Siguiente
								</Button>
							</div>
						</form>
					)}

					{/* Paso 4 */}
					{step === 4 && (
						<div className="max-w-[800px] w-full space-y-6">
							<h2 className="text-xl font-semibold mb-4">Revisa tu información</h2>
							<div className="grid grid-cols-2 gap-4 text-gray-700">
								{' '}
								<p>
									{' '}
									<strong>Usuario:</strong> {formData.username}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Email:</strong> {formData.email}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Nombre:</strong> {formData.name} {formData.lastName}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Documento:</strong> {formData.document_type}{' '}
									{formData.document_number}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>País:</strong> {formData.country}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Género:</strong> {formData.gender}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Nacimiento:</strong> {formData.birth_date}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Dirección:</strong> {formData.location}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Educación:</strong> {formData.education_level}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Experiencia:</strong> {formData.experience_years} años{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Disponibilidad:</strong> {formData.avaliability}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>LinkedIn:</strong> {formData.linkedin_url}{' '}
								</p>{' '}
								<p>
									{' '}
									<strong>Portafolio:</strong> {formData.portfolio_url}{' '}
								</p>{' '}
								<p className="col-span-2">
									{' '}
									<strong>Bio:</strong> {formData.short_bio}{' '}
								</p>{' '}
							</div>
							<div className="flex justify-between mt-6">
								<Button onPress={prevStep} variant="flat">
									Volver
								</Button>
								<Button color="success" onPress={submitForm}>
									Confirmar Registro
								</Button>
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
