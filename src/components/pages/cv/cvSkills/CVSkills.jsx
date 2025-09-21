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
	Select,
	SelectItem,
	Spinner,
} from '@heroui/react';
import api from '@/lib/axios';
import { toast } from 'react-toastify';

export default function CVSkills({ candidate, onSkillAdded }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [skillsOptions, setSkillsOptions] = useState([]);
	const [formData, setFormData] = useState({
		skill: '',
		proficiency_level: 1,
	});

	// Abrir modal y cargar opciones de habilidades
	const handleOpen = async () => {
		setIsOpen(true);
		try {
			const res = await api.get('/skills/'); // endpoint para listar skills
			setSkillsOptions(res.data);
		} catch (error) {
			console.error(error);
			toast.error('Error al cargar habilidades');
		}
	};

	const handleSave = async () => {
		setLoading(true);
		try {
			await api.post('/candidate-skills/add-skill/', formData);
			toast.success('Habilidad agregada');
			setIsOpen(false);
			setFormData({ skill: '', proficiency_level: 1 });
			onSkillAdded();
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
				<h2 className="text-lg font-bold">Habilidades</h2>
			</CardHeader>
			<CardBody>
				{candidate.skills?.length > 0 ? (
					<ul className="flex flex-wrap gap-2">
						{candidate.skills.map((skill) => (
							<li
								key={skill.id}
								className="px-3 py-1 bg-gray-100 rounded-full text-sm border"
							>
								{skill.skill_name} (Nivel {skill.proficiency_level})
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">No hay habilidades registradas.</p>
				)}

				<Button className="mt-4 bg-[#003b99] text-white" onPress={handleOpen}>
					Agregar habilidad
				</Button>
			</CardBody>

			{/* Modal */}
			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					<ModalHeader>Agregar Habilidad</ModalHeader>
					<ModalBody className="space-y-4">
						<Select
							label="Habilidad"
							value={formData.skill}
							onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
						>
							{skillsOptions.map((s) => (
								<SelectItem key={s.id} value={s.id}>
									{s.name}
								</SelectItem>
							))}
						</Select>

						<Input
							type="number"
							label="Nivel de dominio (1-5)"
							min={1}
							max={5}
							value={formData.proficiency_level}
							onChange={(e) =>
								setFormData({
									...formData,
									proficiency_level: Number(e.target.value),
								})
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
