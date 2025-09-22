'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 🔹 Importamos
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@heroui/react';
import { User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function NavbarApp() {
	const { data: session, status } = useSession();
	const pathname = usePathname(); 
	const isLoggedIn = status === 'authenticated';
	const userEmail = session?.user?.email;

	// 🔹 Definimos los links en un array
	const menuItems = [
		{ href: '/', label: 'Inicio' },
		{ href: '/ofertas-laborales', label: 'Ofertas Laborales' },
		{ href: '/preguntas-frecuentes', label: 'Preguntas Frecuentes' },
		...(isLoggedIn ? [{ href: '/mis-postulaciones', label: 'Mis Postulaciones' }] : []),
	];

	return (
		<Navbar
			classNames={{
				wrapper: 'max-w-[1440px] w-full mx-auto',
			}}
			isBlurred
			isBordered
			style={{ backgroundColor: '#003b99', color: 'white' }}
		>
			{/* Brand */}
			<NavbarBrand>
				<Link href="/" className="text-white font-bold text-lg">
					Recruitment Portal
				</Link>
			</NavbarBrand>

			{/* Desktop Links + Avatar */}
			<NavbarContent className="hidden md:flex gap-6" justify="end">
				{menuItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<NavbarItem key={item.href}>
							<Link
								href={item.href}
								className={`px-3 py-1 rounded-full transition-colors ${
									isActive
										? 'bg-white/90 text-[#003b99] font-semibold' // Activo → fondo blanco
										: 'text-white hover:bg-blue-800'
								}`}
							>
								{item.label}
							</Link>
						</NavbarItem>
					);
				})}

				{/* Avatar dinámico */}
				<NavbarItem>
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							{isLoggedIn ? (
								<Avatar
									isBordered
									as="button"
									size="sm"
									src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
								/>
							) : (
								<Avatar
									isBordered
									as="button"
									size="sm"
									className="bg-blue-600 text-white flex items-center justify-center"
								>
									<User size={18} />
								</Avatar>
							)}
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							{isLoggedIn ? (
								<>
									<DropdownItem key="signed" className="h-14 gap-2">
										<p className="font-semibold">Logueado como</p>
										<p className="font-semibold">{userEmail}</p>
									</DropdownItem>
									<DropdownItem key="profile">
										<Link href="/usuario/">Mi perfil</Link>
									</DropdownItem>
									<DropdownItem key="cv">
										<Link href="/usuario/cv">Mi CV</Link>
									</DropdownItem>
									<DropdownItem
										key="logout"
										color="danger"
										onClick={() => signOut({ callbackUrl: '/' })}
									>
										Log Out
									</DropdownItem>
								</>
							) : (
								<>
									<DropdownItem key="login">
										<Link href="/usuario/login" className="w-full">
											Loguearse
										</Link>
									</DropdownItem>
									<DropdownItem key="register">
										<Link href="/usuario/registro" className="w-full">
											Registrarse
										</Link>
									</DropdownItem>
								</>
							)}
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
			</NavbarContent>

			{/* Mobile */}
			<div className="md:hidden ml-auto">
				<NavbarMenuToggle />
			</div>
			<NavbarMenu className="md:hidden">
				{menuItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<NavbarMenuItem key={item.href}>
							<Link
								href={item.href}
								className={`block px-3 py-2 rounded-full ${
									isActive
										? 'bg-white text-[#003b99] font-semibold rounded-full'
										: 'text-white hover:bg-blue-800'
								}`}
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					);
				})}
			</NavbarMenu>
		</Navbar>
	);
}
