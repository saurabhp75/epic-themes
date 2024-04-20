import { createCookieSessionStorage } from '@remix-run/node'
import { z } from 'zod'

const colorThemeSchema = z.enum(['zinc', 'orange', 'green'])

export const colorThemeKey = 'colorTheme'

export const colorThemeSessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'en_colorTheme',
		sameSite: 'lax', // CSRF protection is advised if changing to 'none'
		path: '/',
		httpOnly: true,
		secrets: process.env.SESSION_SECRET.split(','),
		secure: process.env.NODE_ENV === 'production',
	},
})

export async function getColorTheme(request: Request) {
	const colorThemeSession = await colorThemeSessionStorage.getSession(
		request.headers.get('cookie'),
	)

	const result = colorThemeSchema.safeParse(
		colorThemeSession.get(colorThemeKey),
	)

	if (result.success) {
		return result.data
	}

	// Return an empty string
	return ''
}
