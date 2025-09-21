import { Card, CardHeader, CardBody, Button } from '@heroui/react';

export default function CVEducacion({ candidate }) {
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
								<strong>{edu.degree}</strong> en {edu.institution} (
								{edu.start_date} -{' '}
								{edu.end_date || (edu.is_study ? 'En curso' : '')})
							</li>
						))}
					</ul>
				) : (
					<p>No hay estudios registrados.</p>
				)}
				<Button className="mt-4 bg-[#003b99] text-white">Agregar educación</Button>
			</CardBody>
		</Card>
	);
}
