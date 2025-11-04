'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';
import InputField from '@/components/ui/InputField';
import OnboardingSwiper from '@/components/login/OnboardingSwiper';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import ForgotPasswordModal from './ForgotPassword/ForgosPassword';

const LoginContent = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [isForgotOpen, setForgotOpen] = useState(false);
	const router = useRouter();

	const login = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await signIn('credentials', {
				redirect: false,
				username,
				password,
			});

			if (res.error) {
				toast.error('Usuario o contraseña inválidos');
			} else {
				toast.success('Inicio de sesión exitoso');
				router.push('/');
			}
		} catch (error) {
			console.error('Error en login:', error);
			toast.error('⚠️ No se pudo iniciar sesión. Verifique las credenciales.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="flex min-h-screen scrollbar-hide bg-gray-50">
			{/* Lado Izquierdo - Onboarding / Imagen */}
			<OnboardingSwiper isHiddenOnMobile={true} />

			{/* Lado Derecho - Login */}
			<div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-50">
				<div className="p-12 w-full max-w-[500px]">
					{/* Títulos */}
					<div className="text-3xl font-bold text-center mb-2">¡Bienvenido!</div>
					<div className="text-base text-gray-600 font-medium text-center mb-10">
						Ingresa a tu cuenta
					</div>

					{/* Formulario */}
					<form className="space-y-6">
						<InputField
							type="text"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							label="Nombre de usuario"
							icon={<User className="w-5 h-5 mr-2 text-gray-500" />}
						/>
						<InputField
							type="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							label="Contraseña"
							icon={<Lock className="w-5 h-5 mr-2 text-gray-500" />}
						/>

						<div className="space-y-4">
							<div
								className="text-sm text-right text-blue-600 font-medium hover:underline cursor-pointer"
								onClick={() => setForgotOpen(true)}
							>
								¿Olvidaste tu contraseña?
							</div>

							<ForgotPasswordModal
								isOpen={isForgotOpen}
								onClose={() => setForgotOpen(false)}
							/>
						</div>

						{/* Botón */}
						<button
							type="button"
							onClick={login}
							disabled={loading}
							className={`w-full py-3 ${
								loading
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-[#003b99] hover:bg-[#002a6e]'
							} text-white font-semibold rounded-xl transition-colors`}
						>
							{loading ? 'Ingresando...' : 'Iniciar Sesión'}
						</button>

						{/* Registro */}
						<div className="text-center text-sm text-gray-500">
							¿No tienes una cuenta?{' '}
							<Link
								href="/usuario/registro"
								className="text-blue-600 font-medium hover:underline"
							>
								Regístrate aquí
							</Link>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default LoginContent;
