import { useState } from "react";
import PropTypes from "prop-types";

function UserName() {
  const [user, setUser] = useState("");
  const [newUser, setNewUser] = useState("Anonym");

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewUser(user);
    setUser("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={user}
          placeholder='Ange ditt namn'
          onChange={handleChange}
        />
        <input type='submit' value='Skicka' />
      </form>
      <p className='paragraph'>Hej {newUser}! </p>
    </>
  );
}

UserName.propTypes = {
  initialUser: PropTypes.string.isRequired,
};

export default UserName;
