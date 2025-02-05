// RestrictedSection.tsx
import React from 'react'
import { EyeSlashIcon } from '@heroicons/react/24/outline';

type RestrictedSectionProps = {
    hasAccess: boolean,
    children: JSX.Element,
    lines?: number,
    className?: string,
    text?: string
}

export const RestrictedSection: React.FC<RestrictedSectionProps> = ({
    hasAccess,
    children,
    lines = 4,
    className = '',
    text = "You don't have access"
}) => {
    return (
        <div className={`${className} relative`}>
            {hasAccess ? (
                children
            ) : (
                <>
                    <div className="pt-5" data-testid="skeleton-container">
                        {Array.from({ length: lines }).map((_, i) => {
                            const randomWidth = Math.floor(Math.random() * (360 - 250 + 1)) + 250;
                            return (
                                <div
                                    key={i}
                                    className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
                                    style={{ maxWidth: `${randomWidth}px` }}
                                ></div>
                            );
                        })}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center font-medium text-lg text-gray-700 dark:text-gray-400 bg-white/80 dark:bg-black/50">
                        <EyeSlashIcon className="w-10 mr-3" />
                        {text}
                    </div>
                </>
            )}
        </div>
    );
};
