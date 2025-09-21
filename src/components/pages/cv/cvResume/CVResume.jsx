'use client';

import { Card, CardHeader, CardBody, Button } from '@heroui/react';

export default function CVResumen({ candidate }) {
	return (
		<Card>
			<CardHeader>
				<h2 className="text-lg font-bold">Resumen profesional</h2>
			</CardHeader>
			<CardBody>
				<p className='my-2'>
					<strong>Biografía:</strong> {candidate.short_bio || 'No registrada'}
				</p>
				<p className='my-2'>
					<strong>Años de experiencia:</strong> {candidate.experience_years || '0'}
				</p>
				<p className='my-2'>
					<strong>Disponibilidad:</strong> {candidate.avaliability || '-'}
				</p>
				<p className='my-2'>
					<strong>Recomendación:</strong> {candidate.has_recommendation ? 'Sí' : 'No'}
				</p>

				<div className="flex gap-4 mt-2">
					{candidate.linkedin_url && (
						<a href={candidate.linkedin_url} target="_blank" className="text-blue-600">
							LinkedIn
						</a>
					)}
					{candidate.portfolio_url && (
						<a href={candidate.portfolio_url} target="_blank" className="text-blue-600">
							Portafolio
						</a>
					)}
				</div>

				<Button className="mt-4 bg-[#003b99] text-white">Editar</Button>
			</CardBody>
		</Card>
	);
}
