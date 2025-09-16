'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@heroui/react';

export default function NavbarApp() {
	const [isLoggedIn, setIsLoggedIn] = useState(true); // o gestionarlo via provider/global state

	return (
		<Navbar
			classNames={{
				wrapper: 'max-w-[1440px] w-full mx-auto',
			}}
			isBlurred
			isBordered
			style={{ backgroundColor: '#003b99', color: 'white' }}
		>
			{/* Contenedor limitado a 1440px */}
			{/* Brand */}
			<NavbarBrand>
				<Link href="/" className="text-white font-bold text-lg">
					Recruitment Portal
				</Link>
			</NavbarBrand>

			{/* Desktop Links */}
			<NavbarContent className="hidden md:flex !justify-end flex-grow">
				<NavbarItem>
					<Link href="/" className="text-white hover:underline">
						Inicio
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/ofertas-laborales" className="text-white hover:underline">
						Ofertas Laborales
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/ofertas-laborales" className="text-white hover:underline">
						Preguntas Frecuentes
					</Link>
				</NavbarItem>
				{isLoggedIn && (
					<NavbarItem>
						<Link href="/mis-postulaciones" className="text-white hover:underline">
							Mis Postulaciones
						</Link>
					</NavbarItem>
				)}
			</NavbarContent>

			{/* Mobile Menu Toggle */}
			<div className="md:hidden ml-auto">
				<NavbarMenuToggle />
			</div>

			{/* Mobile Menu */}
			<NavbarMenu className="md:hidden">
				<NavbarMenuItem>
					<Link href="/">Inicio</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link href="/postulaciones">Postulaciones</Link>
				</NavbarMenuItem>
				{isLoggedIn && (
					<NavbarMenuItem>
						<Link href="/mis-postulaciones">Mis Postulaciones</Link>
					</NavbarMenuItem>
				)}
			</NavbarMenu>
		</Navbar>
	);
}
