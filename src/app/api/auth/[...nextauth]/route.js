import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import api from '@/lib/axios';

const API_URL = 'http://127.0.0.1:8000/api/users';

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET, // 👈 aquí también

	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const res = await api.post(`/login/`, {
						username: credentials.username,
						password: credentials.password,
					});

					const user = res.data; // { access, refresh, id, username, email, dni }

					if (user && user.access) {
						return user;
					}
					return null;
				} catch (err) {
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.access = user.access;
				token.refresh = user.refresh;
				token.id = user.id;
				token.username = user.username;
				token.email = user.email;
				token.dni = user.dni;
				token.accessExpires = Date.now() + 60 * 60 * 1000; // 1h
			}

			// 🔄 Refresh automático
			if (Date.now() > token.accessExpires) {
				try {
					const res = await axios.post(`http://127.0.0.1:8000/api/token/refresh/`, {
						refresh: token.refresh,
					});
					token.access = res.data.access;
					token.accessExpires = Date.now() + 60 * 60 * 1000;
				} catch (e) {
					return { ...token, error: 'RefreshAccessTokenError' };
				}
			}

			return token;
		},
		async session({ session, token }) {
			if (!token) return null;
			session.user = {
				id: token.id,
				username: token.username,
				email: token.email,
				dni: token.dni,
			};
			session.access = token.access;
			session.refresh = token.refresh;
			return session;
		},
	},
};

// 👇 Aquí está la diferencia clave para App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
