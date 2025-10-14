'use client';

import { useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Spinner,
} from '@heroui/react';
import {
	Edit3,
	FileText,
	Building2,
	Hash,
	Calendar,
	Clock,
	FileDown,
} from 'lucide-react'; // 👈 Agregamos íconos
import api from '@/lib/axios';
import { toast } from 'react-toastify';

export default function CVCertificates({ candidate, onCertificateAdded }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		id: null,
		name: '',
		code: '',
		institution: '',
		date_obtained: '',
		expiration_date: '',
		certificate_file: null,
	});

	// abrir modal para agregar o editar
	const handleOpen = (certToEdit = null) => {
		if (certToEdit) {
			setFormData({
				id: certToEdit.id,
				name: certToEdit.name || '',
				code: certToEdit.code || '',
				institution: certToEdit.institution || '',
				date_obtained: certToEdit.date_obtained || '',
				expiration_date: certToEdit.expiration_date || '',
				certificate_file: null, // 👈 no cargamos archivo ya existente
			});
		} else {
			setFormData({
				id: null,
				name: '',
				code: '',
				institution: '',
				date_obtained: '',
				expiration_date: '',
				certificate_file: null,
			});
		}
		setIsOpen(true);
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'certificate_file') {
			setFormData({ ...formData, [name]: files[0] });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSave = async () => {
		setLoading(true);
		try {
			const data = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (value) data.append(key, value);
			});

			if (formData.id) {
				// 🔹 Editar
				await api.post('/certificates/update-certificate/', data, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
				toast.success('Certificado actualizado');
			} else {
				// 🔹 Crear
				await api.post('/certificates/add-certificate/', data, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
				toast.success('Certificado agregado');
			}

			setIsOpen(false);
			onCertificateAdded();
		} catch (error) {
			console.error(error);
			toast.error(
				error.response?.data?.error ||
					error.response?.data?.detail ||
					'Error al guardar certificado'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<h2 className="text-lg font-bold flex items-center gap-2">
					<FileText className="w-5 h-5 text-[#003b99]" />
					Certificados
				</h2>
			</CardHeader>
			<CardBody>
				{candidate.certificates?.length > 0 ? (
					<ul className="space-y-2">
						{candidate.certificates.map((cert) => (
							<li
								key={cert.id}
								className="p-3 border rounded-md bg-gray-50 text-sm flex justify-between items-center"
							>
								<div className="flex flex-col gap-1">
									<span className="font-semibold flex items-center gap-2">
										<FileText className="w-4 h-4 text-[#003b99]" />
										{cert.name}
									</span>
									<span className="text-gray-600 text-xs flex items-center gap-2">
										<Building2 className="w-3 h-3" /> {cert.institution}
										{cert.code && (
											<>
												<Hash className="w-3 h-3" /> Código: {cert.code}
											</>
										)}
									</span>
									<span className="text-gray-500 text-xs flex items-center gap-2">
										<Calendar className="w-3 h-3" />
										Obtenido: {cert.date_obtained || '—'}
										{cert.expiration_date && (
											<>
												<Clock className="w-3 h-3" /> Expira: {cert.expiration_date}
											</>
										)}
									</span>
									{cert.certificate_file && (
										<a
											href={cert.certificate_file}
											target="_blank"
											className="text-blue-600 text-xs underline mt-1 flex items-center gap-1"
										>
											<FileDown className="w-3 h-3" />
											Ver archivo
										</a>
									)}
								</div>
								<Button
									isIconOnly
									size="sm"
									variant="light"
									className="text-blue-600"
									onPress={() => handleOpen(cert)}
								>
									<Edit3 className="w-4 h-4" />
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">No hay certificados registrados.</p>
				)}

				<Button
					className="mt-4 bg-[#003b99] text-white"
					onPress={() => handleOpen()}
				>
					Agregar certificado
				</Button>
			</CardBody>

			{/* Modal */}
			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					<ModalHeader>
						{formData.id ? 'Editar Certificado' : 'Agregar Certificado'}
					</ModalHeader>
					<ModalBody className="space-y-4">
						<Input
							label="Nombre del certificado"
							name="name"
							value={formData.name}
							onChange={handleChange}
							startContent={<FileText className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							label="Código (opcional)"
							name="code"
							value={formData.code}
							onChange={handleChange}
							startContent={<Hash className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							label="Institución"
							name="institution"
							value={formData.institution}
							onChange={handleChange}
							startContent={<Building2 className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							type="date"
							label="Fecha de obtención"
							name="date_obtained"
							value={formData.date_obtained}
							onChange={handleChange}
							startContent={<Calendar className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							type="date"
							label="Fecha de expiración"
							name="expiration_date"
							value={formData.expiration_date}
							onChange={handleChange}
							startContent={<Clock className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							type="file"
							label="Archivo del certificado"
							name="certificate_file"
							onChange={handleChange}
							accept=".pdf,.jpg,.png,.jpeg"
							startContent={<FileDown className="w-4 h-4 text-gray-500" />}
						/>
					</ModalBody>
					<ModalFooter>
						<Button variant="flat" onPress={() => setIsOpen(false)}>
							Cancelar
						</Button>
						<Button
							className="bg-[#003b99] text-white"
							onPress={handleSave}
							disabled={loading}
						>
							{loading ? <Spinner size="sm" /> : 'Guardar'}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Card>
	);
}
