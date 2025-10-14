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
	Select,
	SelectItem,
	Spinner,
} from '@heroui/react';
import { Edit3 } from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'react-toastify';

const PROFICIENCY_OPTIONS = [
	{ value: 1, label: 'Básico' },
	{ value: 2, label: 'Intermedio' },
	{ value: 3, label: 'Avanzado' },
];

export default function CVSkills({ candidate, onSkillAdded }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [skillsOptions, setSkillsOptions] = useState([]);
	const [formData, setFormData] = useState({
		id: null,
		skill: '',
		proficiency_level: 1,
	});

	// Abrir modal
	const handleOpen = async (skillToEdit = null) => {
		try {
			const res = await api.get('/skills/');
			setSkillsOptions(res.data);

			if (skillToEdit) {
				setFormData({
					id: skillToEdit.id, // CandidateSkill.id
					skill: String(skillToEdit.skill), // Skill.id
					proficiency_level: skillToEdit.proficiency_level,
				});
			} else {
				setFormData({ id: null, skill: '', proficiency_level: 1 });
			}

			setIsOpen(true);
		} catch (error) {
			console.error(error);
			toast.error('Error al cargar habilidades');
		}
	};

	// Guardar (crear o editar)
	const handleSave = async () => {
		setLoading(true);
		try {
			if (formData.id) {
				// 🔧 usar nuevo endpoint update-skill
				await api.post('/candidate-skills/update-skill/', {
					id: formData.id,
					proficiency_level: formData.proficiency_level,
				});
				toast.success('Habilidad actualizada');
			} else {
				await api.post('/candidate-skills/add-skill/', {
					skill: formData.skill,
					proficiency_level: formData.proficiency_level,
				});
				toast.success('Habilidad agregada');
			}

			setIsOpen(false);
			onSkillAdded();
		} catch (error) {
			console.error('❌ Error en handleSave:', error.response?.data || error);
			toast.error(
				error.response?.data?.error ||
					error.response?.data?.detail ||
					'Error al guardar habilidad'
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
								className="px-3 py-1 bg-gray-100 rounded-full text-sm border flex gap-2 items-center"
							>
								<span>
									{skill.skill_name} (Nivel {skill.proficiency_label})
								</span>
								<Button
									isIconOnly
									size="sm"
									variant="light"
									className="text-blue-600"
									onPress={() => handleOpen(skill)}
								>
									<Edit3 className="w-4 h-4" />
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">No hay habilidades registradas.</p>
				)}

				<Button className="mt-4 bg-[#003b99] text-white" onPress={() => handleOpen()}>
					Agregar habilidad
				</Button>
			</CardBody>

			{/* Modal */}
			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					<ModalHeader>
						{formData.id ? 'Editar Habilidad' : 'Agregar Habilidad'}
					</ModalHeader>
					<ModalBody className="space-y-4">
						<Select
							label="Habilidad"
							selectedKeys={formData.skill ? [formData.skill] : []}
							isDisabled={!!formData.id}
							onSelectionChange={(keys) =>
								setFormData({ ...formData, skill: Array.from(keys)[0] })
							}
						>
							{skillsOptions.map((s) => (
								<SelectItem key={s.id}>{s.name}</SelectItem>
							))}
						</Select>

						<Select
							label="Nivel de dominio"
							selectedKeys={[String(formData.proficiency_level)]}
							onChange={(e) =>
								setFormData({
									...formData,
									proficiency_level: Number(e.target.value),
								})
							}
						>
							{PROFICIENCY_OPTIONS.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</Select>
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
