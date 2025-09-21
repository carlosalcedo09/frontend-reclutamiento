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
	form,
	DatePicker,
	ModalContent,
	Checkbox,
	Spinner,
} from '@heroui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { parseDate } from '@internationalized/date';
import api from '@/lib/axios';


export default function CVEducacion({ candidate, onEducationAdded }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		institution: '',
		defree: '',
		field_of_study: '',
		start_date: '',
		end_date: '',
		is_study: false,
		description: '',
	});

	const handleSave = async () => {
		setLoading(true);
		try {
			await api.post('/educations/add-education/', formData);
			toast.success('Educación agregada');
			setIsOpen(false);
			setFormData({
				institution: '',
				degree: '',
				field_of_study: '',
				start_date: '',
				end_date: '',
				is_study: false,
				description: '',
			});
			onEducationAdded();
		} catch (error) {
			toast.error('Error al agregar educación');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<h2 className="text-lg font-bold">Educación</h2>
			</CardHeader>
			<CardBody>
				{candidate.educations?.length > 0 ? (
					<ul className="list-disc pl-5">
						{candidate.educations.map((edu) => (
							<li key={edu.id}>
								<strong>{edu.degree}</strong> en {edu.institution} ({edu.start_date}{' '}
								- {edu.end_date || (edu.is_study ? 'En curso' : '')})
							</li>
						))}
					</ul>
				) : (
					<p>No hay estudios registrados.</p>
				)}
				<Button className="mt-4 bg-[#003b99] text-white" onPress={() => setIsOpen(true)}>
					Agregar educación
				</Button>
			</CardBody>
			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					<ModalHeader>Agregar Educación</ModalHeader>
					<ModalBody className="space-y-4">
						<Input
							label="Insitución"
							type="text"
							value={formData.institution}
							onChange={(e) =>
								setFormData({ ...formData, institution: e.target.value })
							}
						/>
						<Input
							label="Grado"
							type="text"
							value={formData.degree}
							onChange={(e) =>
								setFormData({ ...formData, degree: e.target.value })
							}
						/>
						<Input
							label="Campo de Estudio"
							type="text"
							value={formData.field_of_study}
							onChange={(e) =>
								setFormData({ ...formData, field_of_study: e.target.value })
							}
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
