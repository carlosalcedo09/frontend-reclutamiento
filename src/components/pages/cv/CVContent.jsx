'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Avatar } from '@heroui/react';
import api from '@/lib/axios';

export default function CVContent() {
	const [cvData, setCvData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get('/users/profile/');
				setCvData(res.data);
			} catch (error) {
				console.error('Error al cargar el CV', error);
			}
		};
		fetchData();
	}, []);

	if (!cvData) {
		return <p className="text-center mt-10 text-gray-500">Cargando CV...</p>;
	}

	const candidate = cvData.candidate;

	return (
		<div className="max-w-[1440px] mx-auto px-6 py-10">
			{/* Encabezado con nombre y datos principales */}
			<div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
				<Avatar
					className="w-32 h-32 rounded-full border-4 border-[#003b99]"
					src={candidate.photograph || '/avatar-placeholder.png'}
				/>
				<div>
					<h1 className="text-3xl font-bold text-[#003b99]">{candidate.name}</h1>
					<p className="text-gray-600 mt-2">
						{candidate.short_bio || 'Biografía no registrada'}
					</p>
					<div className="flex gap-6 mt-4 text-sm text-gray-700">
						<span>📍 {candidate.location || 'Ubicación no registrada'}</span>
						<span>🎓 {candidate.education_level || 'Educación no registrada'}</span>
						<span>📅 {candidate.birth_date}</span>
					</div>
					<div className="flex gap-4 mt-3">
						{candidate.linkedin_url && (
							<a
								href={candidate.linkedin_url}
								target="_blank"
								className="text-blue-600 underline"
							>
								LinkedIn
							</a>
						)}
						{candidate.portfolio_url && (
							<a
								href={candidate.portfolio_url}
								target="_blank"
								className="text-blue-600 underline"
							>
								Portafolio
							</a>
						)}
					</div>
				</div>
			</div>

			{/* Contenido en dos columnas */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Columna izquierda */}
				<div className="md:col-span-1 space-y-6">
					<Card>
						<CardHeader>
							<h2 className="text-lg font-bold">Resumen</h2>
						</CardHeader>
						<CardBody>
							<p>
								<strong>Años de experiencia:</strong>{' '}
								{candidate.experience_years || '0'}
							</p>
							<p>
								<strong>Disponibilidad:</strong> {candidate.avaliability || '-'}
							</p>
							<p>
								<strong>Recomendación:</strong>{' '}
								{candidate.has_recommendation ? 'Sí' : 'No'}
							</p>
						</CardBody>
					</Card>
				</div>

				{/* Columna derecha */}
				<div className="md:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<h2 className="text-lg font-bold">Experiencia laboral</h2>
						</CardHeader>
						<CardBody>
							{candidate.experiences?.length > 0 ? (
								<ul className="space-y-3">
									{candidate.experiences.map((exp) => (
										<li key={exp.id}>
											<p className="font-semibold">{exp.position}</p>
											<p className="text-sm text-gray-600">
												{exp.company_name} ({exp.start_date} -{' '}
												{exp.end_date || 'Actual'})
											</p>
											<p className="text-sm">{exp.description}</p>
										</li>
									))}
								</ul>
							) : (
								<p className="text-gray-500">No hay experiencias registradas.</p>
							)}
							<Button className="mt-4 bg-[#003b99] text-white">
								Agregar experiencia
							</Button>
						</CardBody>
					</Card>

					<Card>
						<CardHeader>
							<h2 className="text-lg font-bold">Educación</h2>
						</CardHeader>
						<CardBody>
							{candidate.educations?.length > 0 ? (
								<ul className="space-y-3">
									{candidate.educations.map((edu) => (
										<li key={edu.id}>
											<p className="font-semibold">{edu.degree}</p>
											<p className="text-sm text-gray-600">
												{edu.institution} ({edu.start_date} -{' '}
												{edu.end_date || (edu.is_study ? 'En curso' : '')})
											</p>
											<p className="text-sm">{edu.description}</p>
										</li>
									))}
								</ul>
							) : (
								<p className="text-gray-500">No hay estudios registrados.</p>
							)}
							<Button className="mt-4 bg-[#003b99] text-white">
								Agregar educación
							</Button>
						</CardBody>
					</Card>

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
											{skill.skill.name} (Nivel {skill.proficiency_level})
										</li>
									))}
								</ul>
							) : (
								<p className="text-gray-500">No hay habilidades registradas.</p>
							)}
							<Button className="mt-4 bg-[#003b99] text-white">
								Agregar habilidad
							</Button>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}
