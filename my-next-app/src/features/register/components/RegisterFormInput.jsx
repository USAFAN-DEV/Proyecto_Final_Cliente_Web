const RegisterFormInput = ({ inputTitle, inputType, register, placeholder, inputID }) => {
  return (
    <div className="h-[20%] w-full flex flex-col justify-center">
      <label className="block text-sm font-medium text-gray-700" htmlFor={inputID}>
        {inputTitle}
      </label>
      <input
        {...register(inputID)}
        placeholder={placeholder}
        type={inputType}
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        id={inputID}
      />
    </div>
  );
};

export default RegisterFormInput;
