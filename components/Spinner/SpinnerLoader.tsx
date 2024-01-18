type SPinner = {
  height?: string;
  width?: string;
};
import "./spinnerLoader.css";
const LoadingSpinner = ({ height = "100vh", width = "100%" }: SPinner) => {
  return (
    <div
      className="flex items-center justify-center z-50 relative"
      style={{
        height,
        width,
      }}
    >
      <span className="loader">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
