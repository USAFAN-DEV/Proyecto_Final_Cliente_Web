const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="w-32 h-32 border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;

// ! inset-0: Establece top: 0, right: 0, bottom: 0 y left: 0, haciendo que el elemento ocupe toda la pantalla.
