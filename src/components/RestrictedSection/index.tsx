// RestrictedSection.tsx
import React from 'react'
import { EyeSlashIcon } from '@heroicons/react/24/outline';

type RestrictedSectionProps = {
    hasAccess: boolean,
    children: JSX.Element,
    minHeight?: string,
    className?: string,
    text?: string
}

export const RestrictedSection: React.FC<RestrictedSectionProps> = ({
    hasAccess,
    children,
    minHeight = '75px',
    className = '',
    text = "You don't have access"
}) => {
    return (
        <div className={`${className} relative`} style={{ minHeight }}>
            {hasAccess ? (
                children
            ) : (
                <>
                    <div className="absolute inset-0 flex items-center justify-center font-medium text-md text-gray-400 dark:text-gray-400 bg-transparent">
                        <EyeSlashIcon className="w-8 mr-3" />
                        {text}
                    </div>
                </>
            )}
        </div>
    );
};
