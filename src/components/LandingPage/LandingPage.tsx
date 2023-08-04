import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { setGameResults } from "../../store/action.ts";
import { authService } from "../../services/authService.ts";
import { ButtonWithShadow, StyledSelect } from "../../MuiStyles/MuiStyles.tsx";
import background from "../../../public/background2.jpg";
import logo from "../../../public/logo.png";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const handleStartGame = async () => {
    const results = await authService.question(
      selectedCategory,
      selectedDifficulty,
    );
    if (results !== undefined) {
      dispatch(setGameResults(results));
      navigate("/game");
    } else {
      console.error("No game results received.");
    }
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleDifficultyChange = (event: any) => {
    setSelectedDifficulty(event.target.value);
  };

  return (
    <div className="relative h-screen">
      <img src={background} alt="background" className="w-full z-0 h-screen" />
      <div className="flex flex-col absolute inset-0 justify-center items-center">
        <img
          src={logo}
          alt="logo"
          className="w-2/3 h-full object-contain z-10 sm:w-1/2 sm:h-auto md:w-1/3  lg:w-1/4 lg:h-auto"
        />
        <div className="mt-8 w-1/2">
          <StyledSelect
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            renderValue={(value: unknown) =>
              value === "" ? "Category" : String(value)
            }
            className="mb-4"
          >
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
            <MenuItem value="Geography">Geography</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Politics">Politics</MenuItem>
          </StyledSelect>
          <StyledSelect
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            displayEmpty
            renderValue={(value: unknown) =>
              value === "" ? "Difficulty" : String(value)
            }
            className="mb-4"
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </StyledSelect>
          <ButtonWithShadow
            variant="contained"
            className="w-full"
            onClick={handleStartGame}
          >
            Start Game
          </ButtonWithShadow>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
