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
	Calendar,
	DatePicker,
	ModalFooter,
	Spinner,
} from '@heroui/react';
import { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { toast } from 'react-toastify';
import api from '@/lib/axios';

export default function CVExperiencia({ candidate, onExperienceAdded }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [experiences, setExperiences] = useState([]);

	const [formData, setFormData] = useState({
		company_name: '',
		position: '',
		start_date: '',
		end_date: '',
		description: '',
	});

	const handleSave = async () => {
		setLoading(true);
		try {
			await api.post('/experiences/add-experience/', formData);
			toast.success('Experiencia agregada');
			setIsOpen(false);
			setFormData({
				company_name: '',
				position: '',
				start_date: '',
				end_date: '',
				description: '',
			});
			onExperienceAdded();
		} catch (error) {
			console.error(error);
			toast.error(
				error.response?.data?.error ||
					error.response?.data?.detail || // por si DRF devuelve "detail"
					'Error al agregar habilidad'
			);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Card>
			<CardHeader>
				<h2 className="text-lg font-bold">Experiencia laboral</h2>
			</CardHeader>
			<CardBody>
				{candidate.experiences?.length > 0 ? (
					<ul className="list-disc pl-5">
						{candidate.experiences.map((exp) => (
							<li key={exp.id}>
								<strong>{exp.position}</strong> en {exp.company_name} (
								{exp.start_date} - {exp.end_date || 'Actual'})
							</li>
						))}
					</ul>
				) : (
					<p>No hay experiencias registradas.</p>
				)}
				<Button className="mt-4 bg-[#003b99] text-white" onPress={() => setIsOpen(true)}>
					Agregar experiencia
				</Button>
			</CardBody>

			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					<ModalHeader>Agregar Experiencia</ModalHeader>
					<ModalBody className="space-y-4">
						<Input
							type="text"
							label="Nombre de la empresa"
							value={formData.company_name}
							onChange={(e) =>
								setFormData({ ...formData, company_name: e.target.value })
							}
						/>
						<Input
							type="text"
							label="Posicion"
							value={formData.position}
							onChange={(e) => setFormData({ ...formData, position: e.target.value })}
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
						<Input
							type="text"
							label="Descripción"
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
