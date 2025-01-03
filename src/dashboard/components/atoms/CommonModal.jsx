
const CommonModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="text-black fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded p-6 w-1/3">
        <button onClick={onClose} className="absolute top-2 right-2">
          ✖
        </button>
        <h2 className="text-xl  font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default CommonModal;
