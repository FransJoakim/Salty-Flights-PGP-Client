import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-28 bg-yellow-400">
      <div
        className="h-full flex items-center p-4"
        onClick={() => navigate("/")}
      >
        <img src="./logo.png" alt="logo" className="h-16 ml-4" />
        <h1 className="ml-4 mt-2 font-face-logo text-5xl">Salty flights</h1>
      </div>
    </div>
  );
};
