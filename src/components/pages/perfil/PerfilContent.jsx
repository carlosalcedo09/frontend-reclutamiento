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
} from '@heroui/react';
import { useState } from 'react';
import { User, Briefcase, Shield } from 'lucide-react';

export default function PerfilContent() {
	const [isOpen, setIsOpen] = useState(false);

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
					<Card className="mt-6 shadow-md rounded-2xl">
						<CardBody className="p-6 space-y-4">
							<div>
								<p className="text-sm text-gray-500">Nombre completo</p>
								<p className="font-semibold">Juan Pérez</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Correo electrónico</p>
								<p className="font-semibold">juan.perez@example.com</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Teléfono</p>
								<p className="font-semibold">+51 999 888 777</p>
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
					<Card className="mt-6 shadow-md rounded-2xl">
						<CardBody className="p-6 space-y-4">
							<div>
								<p className="text-sm text-gray-500">Ocupación</p>
								<p className="font-semibold">Desarrollador Full Stack</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Experiencia</p>
								<p className="font-semibold">3 años en desarrollo web</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Habilidades</p>
								<p className="font-semibold">React, Node.js, SQL</p>
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
								<p className="font-semibold">01/08/2025</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Autenticación en dos pasos</p>
								<p className="font-semibold">Desactivada</p>
							</div>
							<Button
								className="bg-[#003b99] text-white font-semibold"
								onPress={() => setIsOpen(true)}
							>
								Cambiar contraseña
							</Button>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>

			{/* Modal para cambiar contraseña */}
			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					<ModalHeader className="text-lg font-bold">Cambiar Contraseña</ModalHeader>
					<ModalBody className="space-y-4">
						<Input type="password" label="Contraseña actual" />
						<Input type="password" label="Nueva contraseña" />
						<Input type="password" label="Confirmar nueva contraseña" />
					</ModalBody>
					<ModalFooter>
						<Button variant="flat" onPress={() => setIsOpen(false)}>
							Cancelar
						</Button>
						<Button className="bg-[#003b99] text-white font-semibold">Guardar</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</section>
	);
}
