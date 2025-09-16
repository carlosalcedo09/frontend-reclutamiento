'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Solicitudes from '@/components/icons/Solicitudes.svg'
import UserIcons from '@/components/icons/UserIcons.svg';
import CloseIcon from '@/components/icons/CloseIcon.svg';
import GestionCuentas from '@/components/icons/GestionCuentas.svg'

import './layout.scss';
import { useState } from 'react';
const navItemsEspecial = [
	{ label: 'Mi cuenta', href: '/admin-panel/account', icon: <UserIcons className="w-6 h-6" /> },
];

const navItems = [
	{ label: 'Gestion de cuentas', href: '/admin-panel/account-management', icon: <GestionCuentas className="w-6 h-6" /> },
	{ label: 'Solicitudes de registro', href: '/admin-panel/record-requests', icon: <Solicitudes className="w-6 h-6" />}
];

const footerItems = [
	{ label: 'Mi cuenta', href: '/admin-panel/account', icon: <UserIcons /> },
	{ label: 'Gestion de cuentas', href: '/admin-panel/account-management', icon: <GestionCuentas /> },
	{ label: 'Solicitudes de registro', href: '/admin-panel/record-requests', icon: <Solicitudes className="w-6 h-6" />}
];

const DashboardLayout = (props) => {
	const { children } = props;

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathname = usePathname();

	return (
		<div className="dsh">
			<aside className={`dsh_sidebar ${isSidebarOpen ? 'active' : ''}`}>
				<button className="side_close" onClick={() => setIsSidebarOpen(false)}>
					<CloseIcon className="w-6 h-[initial] text-black" />
				</button>
				<div className="text-[2rem] font-bold text-center mb-3">
							<img
								src="https://s3.amazonaws.com/remanso.com.pe/wp-content/uploads/2023/03/25063043/logo-1.svg"
								alt="El Remanso Camposanto"
								className="mx-auto"
							/>
				</div>
				<div className="side_links">
					{navItemsEspecial.map((item, index) => (
						<Link
							href={item?.href}
							key={'navItem-' + index}
							className={`side_links_item ${pathname === item.href ? 'active' : ''}`}
						>
							{item?.icon}
							<div className="text">{item?.label}</div>
						</Link>
					))}

					<div className="border-t border-gray-300 my-3"></div>
					
					{navItems.map((item, index) => (
						<Link
							href={item?.href}
							key={'navItem-' + index}
							className={`side_links_item ${pathname === item.href ? 'active' : ''}`}
						>
							{item?.icon}
							<div className="text">{item?.label}</div>
						</Link>
					))}
				</div>

				<div className="side_cta">
					<button className="w-full block p-2 bg-black text-center rounded-xl text-white font-bold mb-7">Cerrar sesión</button>
				</div>
			</aside>
			
			<main className="dsh_main">
				<div className="dsh_main_content">{children}</div>
				<div className="dsh_main_footer">
					{footerItems.map((item, index) => (
						<Link
							href={item?.href}
							key={'navItem-' + index}
							className={`link_item ${pathname === item.href ? 'active' : ''}`}
						>
							<div className="icon">{item?.icon}</div>
							<div className="text">{item?.label}</div>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
