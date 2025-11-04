'use client';

import { Card, CardHeader, CardBody, Button } from '@heroui/react';

export default function CVResumen({ candidate }) {
	return (
		<Card>
			<CardHeader>
				<h2 className="mt-2 mx-2 text-lg font-bold">Resumen profesional</h2>
			</CardHeader>
			<CardBody>
				<div className="relative max-h-32 overflow-y-auto rounded-md scrollbar-custom px-2 py-1 scrollbar-custom ">
					<p className="text-gray-700">
						<strong>Biografía:</strong> {candidate.short_bio || 'No registrada'}
					</p>

					{/* Efecto fade/blur inferior cuando hay overflow */}
					{candidate.short_bio && candidate.short_bio.length > 200 && (
						<div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t" />
					)}
				</div>
				<p className="m-2">
					<strong>Años de experiencia:</strong> {candidate.experience_years || '0'}
				</p>
				<p className="m-2">
					<strong>Disponibilidad:</strong> {candidate.avaliability || '-'}
				</p>
				<p className="m-2">
					<strong>Recomendación:</strong> {candidate.has_recommendation ? 'Sí' : 'No'}
				</p>

				<div className="flex gap-4 m-2">
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
			</CardBody>
		</Card>
	);
}
