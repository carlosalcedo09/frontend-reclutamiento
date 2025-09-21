'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
import api from '@/lib/axios';

export default function NavbarApp() {
	const { data: session, status } = useSession();
	const [cvData, setCvData] = useState(null);

	const isLoggedIn = status === 'authenticated';
	const userEmail = session?.user?.email;
	const fetchData = async () => {
		try {
			const res = await api.get('/users/profile/');
			setCvData(res.data);
		} catch (error) {
			console.error('Error al cargar el CV', error);
		}
	};
	useEffect(() => {
		if (isLoggedIn) {
			fetchData();
		}
	}, [isLoggedIn]);

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
				{menuItems.map((item) => (
					<NavbarItem key={item.href}>
						<Link href={item.href} className="text-white hover:underline">
							{item.label}
						</Link>
					</NavbarItem>
				))}

				{/* Avatar dinámico */}
				<NavbarItem>
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							{isLoggedIn ? (
								<Avatar
									isBordered
									as="button"
									size="sm"
									src={
										cvData?.candidate?.photograph ||
										'https://i.pravatar.cc/150?u=a042581f4e29026704d'
									}
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
				{menuItems.map((item) => (
					<NavbarMenuItem key={item.href}>
						<Link href={item.href}>{item.label}</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
