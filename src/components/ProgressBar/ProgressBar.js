
const ProgressBar = ({ step, totalSteps }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-600 text-white font-bold">
        {step}
      </div>
      <p className="text-lg font-semibold text-gray-700">Author's Name</p>
    </div>
    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-4 relative">
      <div
        className="h-2 bg-yellow-600 rounded-full absolute"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;