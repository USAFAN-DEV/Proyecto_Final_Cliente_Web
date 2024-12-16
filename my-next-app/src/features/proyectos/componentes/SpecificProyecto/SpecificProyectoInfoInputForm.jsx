const SpecificProyectoInfoInputForm = ({ inputTitle, inputID, inputType, register, placeholder, disabled }) => {
  return (
    <div className=" h-full w-full flex flex-col justify-center mr-[2vw]">
      <label className="block text-base" htmlFor={inputID}>
        {inputTitle}
      </label>
      <input
        placeholder={placeholder}
        id={inputID}
        type={inputType}
        {...register(inputID)}
        disabled={disabled}
        className="mt-[1vh] block w-full h-[4.5vh] pl-[2%] pr-[2%] rounded-sm bg-slate-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default SpecificProyectoInfoInputForm;
