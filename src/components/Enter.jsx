import { useNavigate } from "react-router";

function Enter() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/home");

  return (
    <>
      <div className='enter'>
        <div className='rl' onClick={handleClick}>
          <h1>Välkommen</h1>
          <p>Tryck för att komma vidare</p>
        </div>
      </div>
    </>
  );
}

export default Enter;
