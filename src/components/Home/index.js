import { useNavigate } from 'react-router-dom';

function Home() {
const navigate = useNavigate();

  const handleClick = () => {
    navigate("/movies");
  };
  return (
    <div className="comp orange">
      <h1>Home Component</h1>
      <button onClick={handleClick}>Movie_Routing</button>
    </div>
  );
}

export default Home;
