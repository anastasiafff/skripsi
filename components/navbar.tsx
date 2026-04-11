"use client"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { useEffect, useRef, useState } from "react"

const Logo = (props: React.SVGAttributes<SVGElement>) => {
    return (
        <svg
            fill="none"
            height="1em"
            viewBox="0 0 324 323"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect fill="currentColor" height="323" rx="161.5" width="323" />
            <circle cx="162" cy="161.5" fill="white" r="60" />
        </svg>
    )
}

const HamburgerIcon = ({
    className,
    ...props
}: React.SVGAttributes<SVGElement>) => (
    <svg
        className={cn("pointer-events-none", className)}
        fill="none"
        height={16}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={16}
        {...props}
    >
        <path d="M4 6H20" />
        <path d="M4 12H20" />
        <path d="M4 18H20" />
    </svg>
)

export interface NavbarNavLink {
    href: string
    label: string
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode
    logoHref?: string
    navigationLinks?: NavbarNavLink[]
}

const defaultNavigationLinks: NavbarNavLink[] = [
    { href: "/produk", label: "Product" },
    { href: "/rekomendasi", label: "Cari Rekomendasi" },
    { href: "/artikel", label: "Artikel" },
    { href: "/review", label: "Review Saya" },
]

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
    (
        {
            className,
            logo = <Logo />,
            logoHref = "/",
            navigationLinks = defaultNavigationLinks,
            ...props
        },
        ref
    ) => {
        const pathname = usePathname()

        const [isMobile, setIsMobile] = useState(false)
        const containerRef = useRef<HTMLElement>(null)

        useEffect(() => {
            const checkWidth = () => {
                if (containerRef.current) {
                    const width = containerRef.current.offsetWidth
                    setIsMobile(width < 768)
                }
            }

            checkWidth()

            const resizeObserver = new ResizeObserver(checkWidth)

            if (containerRef.current) {
                resizeObserver.observe(containerRef.current)
            }

            return () => resizeObserver.disconnect()
        }, [])

        const combinedRef = React.useCallback(
            (node: HTMLElement | null) => {
                containerRef.current = node

                if (typeof ref === "function") {
                    ref(node)
                } else if (ref) {
                    ref.current = node
                }
            },
            [ref]
        )

        const isActive = (href: string) => {
            if (href === "/") return pathname === "/"
            return pathname.startsWith(href)
        }

        return (
            <header
                className={cn(
                    "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-4 md:px-6",
                    className
                )}
                ref={combinedRef}
                {...props}
            >
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between">

                    {/* Left */}
                    <div className="flex items-center gap-6">

                        {/* Mobile menu */}
                        {isMobile && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                        <HamburgerIcon />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent align="start" className="w-48 p-2">
                                    <NavigationMenu>
                                        <NavigationMenuList className="flex-col items-start gap-1">

                                            {navigationLinks.map((link, i) => (
                                                <NavigationMenuItem key={i} className="w-full">
                                                    <Link
                                                        href={link.href}
                                                        className={cn(
                                                            "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                                            isActive(link.href)
                                                                ? "bg-accent text-accent-foreground"
                                                                : "text-foreground/80 hover:bg-accent"
                                                        )}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </NavigationMenuItem>
                                            ))}

                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </PopoverContent>
                            </Popover>
                        )}

                        {/* Logo */}
                        <Link
                            href={logoHref}
                            className="flex items-center gap-2 font-bold text-xl"
                        >
                            <span className="text-2xl">{logo}</span>
                            <span className="hidden sm:inline">Skincare Finder</span>
                        </Link>

                        {/* Desktop menu */}
                        {!isMobile && (
                            <NavigationMenu>
                                <NavigationMenuList>

                                    {navigationLinks.map((link, i) => (
                                        <NavigationMenuItem key={i}>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    "inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors",
                                                    isActive(link.href)
                                                        ? "bg-accent text-accent-foreground"
                                                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuItem>
                                    ))}

                                </NavigationMenuList>
                            </NavigationMenu>
                        )}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm">
                            Sign In
                        </Button>

                        <Button size="sm">
                            Get Started
                        </Button>
                    </div>

                </div>
            </header>
        )
    }
)

Navbar.displayName = "Navbar"