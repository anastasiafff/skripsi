import React from 'react'
import { Card } from './ui/card'

export const CardInformation = ({
    title,
    description,
    total,
    icon
}: {
    title: string
    description?: string
    total: number
    icon: React.ReactNode
}) => {
    return (
        <Card className="p-4">
            {/* Row container */}
            <div className="flex flex-row items-center justify-between gap-4">

                {/* Left: text */}
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                        {title}
                    </span>
                    <span className="text-lg font-semibold">
                        {total}
                    </span>
                    {description && (
                        <span className="text-xs text-muted-foreground">
                            {description}
                        </span>
                    )}
                </div>

                {/* Right: icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                    {icon}
                </div>
            </div>
        </Card>
    )
}
