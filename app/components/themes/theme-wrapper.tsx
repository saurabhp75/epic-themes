import '#app/components/themes/themes.css'
import { cn } from '#app/utils/misc'

export function ThemeWrapper({
	theme,
	children,
}: Readonly<{
	theme: string
	children: React.ReactNode
}>) {
	return <div className={cn(theme && `theme-${theme}`)}>{children}</div>
}
