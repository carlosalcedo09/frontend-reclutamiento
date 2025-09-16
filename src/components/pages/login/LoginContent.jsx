'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EmailIcon from '@/components/icons/EmailIcon.svg';
import PasswordIcon from '@/components/icons/PasswordIcon.svg';
import OnboardingSwiper from '@/components/login/OnboardingSwiper';
import style from '@/components/pages/login/LoginContent.module.scss';
import InputField from '@/components/ui/InputField';

const LoginContent = () => {
	const router = useRouter();
	const login = () => {
		router.push('dashboard/results', { scroll: false, shallow: false });
	};
	return (
		<section className="LoginContent flex h-full">
			<OnboardingSwiper />

			<div className="w-full flex justify-center items-center ">
				<div className="p-8 w-full max-w-[456px]">
					<form>
						<div className="text-[2rem] font-bold text-center mb-3">
							<img
								src="https://s3.amazonaws.com/remanso.com.pe/wp-content/uploads/2023/03/25063043/logo-1.svg"
								alt="El Remanso Camposanto"
								className="mx-auto"
							/>
						</div>
						<div className="text-[2rem] font-bold text-center mb-3">¡Bienvenido!</div>
						<div className="ttext-base font-medium text-center mb-9">
							Ingresa a tu cuenta
						</div>
						<InputField
							type="text"
							name="email"
							className="mb-5"
							label="Correo electrónico"
							icon={<EmailIcon className="w-6 h-6 mr-1" />}
						/>
						<InputField
							type="password"
							name="password"
							className="mb-2"
							label="Contraseña"
							icon={<PasswordIcon className="w-6 h-6 mr-1" />}
						/>
						<div className="text-xs text-right font-medium mb-5">
							¿Olvidaste tu contraseña?
						</div>
						<button
							type="button"
							onClick={() => login()}
							className="w-full block p-2 bg-black text-center rounded-xl text-white font-bold mb-7"
						>
							Iniciar Sesión
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};
export default LoginContent;
