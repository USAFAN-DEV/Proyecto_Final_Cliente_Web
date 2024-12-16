const SpecificProyectoCrearAlbaranInputForm = ({ inputTitle, inputID, inputType, register, placeholder }) => {
  return (
    <div className=" w-[80%] h-[10vh] mr-[5%]">
      <label className="block text-base" htmlFor={inputID}>
        {inputTitle}
      </label>
      <input
        placeholder={placeholder}
        id={inputID}
        type={inputType}
        {...register(inputID)}
        className="mt-[1vh] block w-full h-[4.5vh] pl-[2%] pr-[2%] rounded-sm bg-slate-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default SpecificProyectoCrearAlbaranInputForm;
