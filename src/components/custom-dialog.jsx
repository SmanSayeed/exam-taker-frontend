export function CustomDialog({ children, isOpen, setIsOpen, title, description }) {

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${isOpen ? "visible" : "hidden"
                }`}
            onClick={() => setIsOpen(false)}
        >
            <div
                className="bg-white max-w-md w-[95%] rounded-md shadow-lg p-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button>
                {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
                {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
                {children}
            </div>
        </div>
    );
}