type IllustrationMesProps = {
    svg: React.ReactNode
    title: string
    description?: string
}

export default function IllustrationMes({ svg, title, description }: IllustrationMesProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">

            <div className="w-64 h-64 mb-4 flex items-center justify-center">
                {svg}
            </div>

            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {title}
            </h2>

            {description && (
                <p className="text-sm text-gray-500 mt-1">
                    {description}
                </p>
            )}
        </div>
    )
}