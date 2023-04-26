import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div data-testid="spinner" className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
