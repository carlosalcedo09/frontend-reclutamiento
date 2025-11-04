'use client';

import {
	Card,
	CardHeader,
	CardBody,
	Button,
	ModalContent,
	ModalHeader,
	ModalBody,
	Modal,
	Input,
	DatePicker,
	ModalFooter,
	Spinner,
} from '@heroui/react';
import { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { toast } from 'react-toastify';
import api from '@/lib/axios';
import { Edit3, Building2, Briefcase, Calendar, FileText } from 'lucide-react'; // 👈 Íconos de lucide-react

export default function CVExperiencia({ candidate, onExperienceAdded }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		id: null,
		company_name: '',
		position: '',
		start_date: '',
		end_date: '',
		description: '',
	});

	const handleOpen = (expToEdit = null) => {
		if (expToEdit) {
			setFormData({
				id: expToEdit.id,
				company_name: expToEdit.company_name,
				position: expToEdit.position,
				start_date: expToEdit.start_date,
				end_date: expToEdit.end_date,
				description: expToEdit.description,
			});
		} else {
			setFormData({
				id: null,
				company_name: '',
				position: '',
				start_date: '',
				end_date: '',
				description: '',
			});
		}
		setIsOpen(true);
	};

	const handleSave = async () => {
		setLoading(true);
		try {
			if (formData.id) {
				await api.post('/experiences/update-experience/', formData);
				toast.success('Experiencia actualizada');
			} else {
				await api.post('/experiences/add-experience/', formData);
				toast.success('Experiencia agregada');
			}
			setIsOpen(false);
			onExperienceAdded();
		} catch (error) {
			console.error(error);
			toast.error(
				error.response?.data?.error ||
					error.response?.data?.detail ||
					'Error al guardar experiencia'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<h2 className="text-lg font-bold flex items-center gap-2">
					<Briefcase className="w-5 h-5 text-[#003b99]" />
					Experiencia laboral
				</h2>
			</CardHeader>
			<CardBody>
				{candidate.experiences?.length > 0 ? (
					<div className="relative max-h-48 overflow-y-auto rounded-lg scrollbar-custom">
						<ul className="space-y-3">
							{candidate.experiences.map((exp) => (
								<li
									key={exp.id}
									className="flex justify-between items-start p-3 border rounded-md bg-gray-50"
								>
									<div className="flex flex-col text-sm">
										<span className="font-semibold flex items-center gap-2 ">
											<Briefcase className="w-4 h-4" />
											{exp.position}
										</span>
										<span className="text-gray-600 flex items-center gap-2 text-xs">
											<Building2 className="w-3 h-3" />
											{exp.company_name}
										</span>
										<span className="text-gray-500 flex items-center gap-2 text-xs">
											<Calendar className="w-3 h-3" />
											{exp.start_date} - {exp.end_date || 'Actual'}
										</span>
										{exp.description && (
											<p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
												<FileText className="w-3 h-3" /> {exp.description}
											</p>
										)}
									</div>
									<Button
										isIconOnly
										size="sm"
										variant="light"
										className="text-blue-600"
										onPress={() => handleOpen(exp)}
									>
										<Edit3 className="w-4 h-4" />
									</Button>
								</li>
							))}
						</ul>
						{candidate.experiences.length > 4 && (
							<div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t pointer-events-none" />
						)}
					</div>
				) : (
					<p className="text-gray-500">No hay experiencias registradas.</p>
				)}
				<Button className="mt-4 bg-[#003b99] text-white" onPress={() => handleOpen()}>
					Agregar experiencia
				</Button>
			</CardBody>

			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					<ModalHeader>
						{formData.id ? 'Editar Experiencia' : 'Agregar Experiencia'}
					</ModalHeader>
					<ModalBody className="space-y-4">
						<Input
							type="text"
							label="Nombre de la empresa"
							value={formData.company_name}
							onChange={(e) =>
								setFormData({ ...formData, company_name: e.target.value })
							}
							startContent={<Building2 className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							type="text"
							label="Posición"
							value={formData.position}
							onChange={(e) => setFormData({ ...formData, position: e.target.value })}
							startContent={<Briefcase className="w-4 h-4 text-gray-500" />}
						/>

						<DatePicker
							label="Fecha de inicio"
							value={formData.start_date ? parseDate(formData.start_date) : null}
							onChange={(date) =>
								setFormData({
									...formData,
									start_date: date ? date.toString() : '',
								})
							}
							startContent={<Calendar className="w-4 h-4 text-gray-500" />}
						/>
						<DatePicker
							label="Fecha de fin"
							value={formData.end_date ? parseDate(formData.end_date) : null}
							onChange={(date) =>
								setFormData({
									...formData,
									end_date: date ? date.toString() : '',
								})
							}
							startContent={<Calendar className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							type="text"
							label="Descripción"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							startContent={<FileText className="w-4 h-4 text-gray-500" />}
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
