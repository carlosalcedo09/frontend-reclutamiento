'use client';

import {
	Card,
	CardHeader,
	CardBody,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Input,
	DatePicker,
	ModalContent,
	Checkbox,
	Spinner,
} from '@heroui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { parseDate } from '@internationalized/date';
import {
	Edit3,
	GraduationCap,
	Building2,
	BookOpen,
	Calendar,
	FileText,
} from 'lucide-react'; // 👈 íconos para educación
import api from '@/lib/axios';

export default function CVEducacion({ candidate, onEducationAdded }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		id: null,
		institution: '',
		degree: '',
		field_of_study: '',
		start_date: '',
		end_date: '',
		is_study: false,
		description: '',
	});

	// Abrir modal para agregar o editar
	const handleOpen = (eduToEdit = null) => {
		if (eduToEdit) {
			setFormData({
				id: eduToEdit.id,
				institution: eduToEdit.institution,
				degree: eduToEdit.degree,
				field_of_study: eduToEdit.field_of_study,
				start_date: eduToEdit.start_date,
				end_date: eduToEdit.end_date,
				is_study: eduToEdit.is_study,
				description: eduToEdit.description,
			});
		} else {
			setFormData({
				id: null,
				institution: '',
				degree: '',
				field_of_study: '',
				start_date: '',
				end_date: '',
				is_study: false,
				description: '',
			});
		}
		setIsOpen(true);
	};

	// Guardar (crear o editar)
	const handleSave = async () => {
		setLoading(true);
		try {
			if (formData.id) {
				await api.post('/educations/update-education/', formData);
				toast.success('Educación actualizada');
			} else {
				await api.post('/educations/add-education/', formData);
				toast.success('Educación agregada');
			}

			setIsOpen(false);
			onEducationAdded();
		} catch (error) {
			console.error('❌ Error en educación:', error.response?.data || error);
			toast.error(
				error.response?.data?.error ||
					error.response?.data?.detail ||
					'Error al guardar educación'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<h2 className="text-lg font-bold flex items-center gap-2">
					<GraduationCap className="w-5 h-5 text-[#003b99]" />
					Educación
				</h2>
			</CardHeader>
			<CardBody>
				{candidate.educations?.length > 0 ? (
					<ul className="space-y-3">
						{candidate.educations.map((edu) => (
							<li
								key={edu.id}
								className="flex justify-between items-start p-3 border rounded-md bg-gray-50"
							>
								<div className="flex flex-col text-sm">
									<span className="font-semibold flex items-center gap-2 ">
										<FileText className="w-4 h-4" />
										{edu.degree}
									</span>
									<span className="text-gray-600 flex items-center gap-2 text-xs">
										<Building2 className="w-3 h-3" />
										{edu.institution}
									</span>
									<span className="text-gray-600 flex items-center gap-2 text-xs">
										<BookOpen className="w-3 h-3" />
										{edu.field_of_study}
									</span>
									<span className="text-gray-500 flex items-center gap-2 text-xs">
										<Calendar className="w-3 h-3" />
										{edu.start_date} -{' '}
										{edu.end_date || (edu.is_study ? 'En curso' : 'Finalizado')}
									</span>
									{edu.description && (
										<p className="text-xs text-gray-500 mt-1">
											{edu.description}
										</p>
									)}
								</div>
								<Button
									isIconOnly
									size="sm"
									variant="light"
									className="text-blue-600"
									onPress={() => handleOpen(edu)}
								>
									<Edit3 className="w-4 h-4" />
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">No hay estudios registrados.</p>
				)}
				<Button className="mt-4 bg-[#003b99] text-white" onPress={() => handleOpen()}>
					Agregar educación
				</Button>
			</CardBody>

			{/* Modal */}
			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					<ModalHeader>
						{formData.id ? 'Editar Educación' : 'Agregar Educación'}
					</ModalHeader>
					<ModalBody className="space-y-4">
						<Input
							label="Institución"
							type="text"
							value={formData.institution}
							onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
							startContent={<Building2 className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							label="Grado"
							type="text"
							value={formData.degree}
							onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
							startContent={<GraduationCap className="w-4 h-4 text-gray-500" />}
						/>
						<Input
							label="Campo de Estudio"
							type="text"
							value={formData.field_of_study}
							onChange={(e) =>
								setFormData({ ...formData, field_of_study: e.target.value })
							}
							startContent={<BookOpen className="w-4 h-4 text-gray-500" />}
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
						<Checkbox
							isSelected={formData.is_study}
							onValueChange={(value) => setFormData({ ...formData, is_study: value })}
						>
							¿Actualmente estudias?
						</Checkbox>
						<Input
							label="Descripción"
							type="text"
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
