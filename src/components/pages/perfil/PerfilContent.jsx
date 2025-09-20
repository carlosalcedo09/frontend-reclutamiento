'use client';

import {
	Tabs,
	Tab,
	Card,
	CardBody,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Spinner,
} from '@heroui/react';
import { useEffect, useState } from 'react';
import { User, Briefcase, Shield, Edit2 } from 'lucide-react';
import api from '@/lib/axios';
import EditPersonal from './edit/EditPersonal';
import EditProfesional from './edit/EditProfesional';
import EditPassword from './edit/EditPassword';

export default function PerfilContent() {
	const [isOpen, setIsOpen] = useState(false);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [editPersonalOpen, setEditPersonalOpen] = useState(false);
	const [editProfesionalOpen, setEditProfesionalOpen] = useState(false);
	const [editPasswordOpen, setEditPasswordOpen] = useState(false);

	const handleUpdatePersonal = (updatedData) => {
		setProfile((prev) => ({
			...prev,
			candidate: { ...prev.candidate, ...updatedData },
		}));
	};

	const handleUpdateProfesional = (updatedData) => {
		setProfile((prev) => ({
			...prev,
			candidate: { ...prev.candidate, ...updatedData },
		}));
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await api.get('/users/profile/');
				setProfile(response.data);
			} catch (error) {
				console.error('Error cargando perfil:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, []);

	if (loading) {
		return <Spinner size="lg" className="flex items-center justify-center h-screen" />;
	}

	// destructuring de datos
	const user = profile;
	const candidate = profile?.candidate;

	return (
		<section className="w-full max-w-[1440px] mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold mb-8 text-center">Mi Perfil</h1>

			<Tabs aria-label="Perfil" variant="underlined" fullWidth>
				{/* Datos Personales */}
				<Tab
					key="personal"
					title={
						<div className="flex items-center gap-2">
							<User className="w-4 h-4" />
							<span>Datos Personales</span>
						</div>
					}
				>
					<Card className="mt-6 shadow-md rounded-2xl relative">
						<Button
							size="md"
							className="absolute z-10 top-2 right-2 bg-blue-600 text-white cursor-pointer"
							onPress={() => setEditPersonalOpen(true)}
						>
							<Edit2 className="w-4 h-4" />
							Editar
						</Button>
						<CardBody className="p-6 space-y-4">
							<div>
								<p className="text-sm text-gray-500">Nombre completo</p>
								<p className="font-semibold">{candidate?.name || '-'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Correo electrónico</p>
								<p className="font-semibold">{user?.email || '-'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Documento</p>
								<p className="font-semibold">
									{candidate?.document_type} - {candidate?.document_number}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">País</p>
								<p className="font-semibold">{candidate?.country || '-'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Dirección</p>
								<p className="font-semibold">{candidate?.location || '-'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Sexo</p>
								<p className="font-semibold">{candidate?.gender || '-'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Fecha de nacimiento</p>
								<p className="font-semibold">{candidate?.birth_date || '-'}</p>
							</div>
						</CardBody>
					</Card>
				</Tab>

				{/* Datos Profesionales */}
				<Tab
					key="profesional"
					title={
						<div className="flex items-center gap-2">
							<Briefcase className="w-4 h-4" />
							<span>Datos Profesionales</span>
						</div>
					}
				>
					<Card className="mt-6 shadow-md rounded-2xl relative">
						<Button
							size="md"
							className="absolute z-10 top-2 right-2 bg-blue-600 text-white cursor-pointer "
							onPress={() => setEditProfesionalOpen(true)}
						>
							<Edit2 className="w-4 h-4" />
							Editar
						</Button>
						<CardBody className="p-6 space-y-4">
							<div>
								<p className="text-sm text-gray-500">Nivel educativo</p>
								<p className="font-semibold">{candidate?.education_level || '-'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Años de experiencia</p>
								<p className="font-semibold">
									{candidate?.experience_years || '0'}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Disponibilidad</p>
								<p className="font-semibold">{candidate?.avaliability || '-'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Biografía</p>
								<p className="font-semibold">{candidate?.short_bio || '-'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">LinkedIn</p>
								<a
									href={candidate?.linkedin_url}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold text-blue-600 hover:underline"
								>
									{candidate?.linkedin_url || '-'}
								</a>
							</div>
							<div>
								<p className="text-sm text-gray-500">Portafolio</p>
								<a
									href={candidate?.portfolio_url}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold text-blue-600 hover:underline"
								>
									{candidate?.portfolio_url || '-'}
								</a>
							</div>
						</CardBody>
					</Card>
				</Tab>

				{/* Seguridad */}
				<Tab
					key="seguridad"
					title={
						<div className="flex items-center gap-2">
							<Shield className="w-4 h-4" />
							<span>Seguridad</span>
						</div>
					}
				>
					<Card className="mt-6 shadow-md rounded-2xl">
						<CardBody className="p-6 space-y-4">
							<div>
								<p className="text-sm text-gray-500">Último cambio de contraseña</p>
								<p className="font-semibold">
									{user?.last_password_change
										? new Date(user.last_password_change).toLocaleDateString()
										: 'Nunca cambiada'}
								</p>
							</div>

							<Button
								className="bg-[#003b99] text-white font-semibold"
								onPress={() => setEditPasswordOpen(true)}
							>
								Cambiar contraseña
							</Button>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>

			<EditPassword isOpen={editPasswordOpen} onClose={() => setEditPasswordOpen(false)} />

			<EditPersonal
				isOpen={editPersonalOpen}
				onClose={() => setEditPersonalOpen(false)}
				candidate={candidate}
				onSave={(updatedData) => handleUpdatePersonal(updatedData)}
			/>
			<EditProfesional
				isOpen={editProfesionalOpen}
				onClose={() => setEditProfesionalOpen(false)}
				candidate={candidate}
				onSave={(updatedData) => handleUpdateProfesional(updatedData)}
			/>
		</section>
	);
}
