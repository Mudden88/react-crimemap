import styled from "styled-components";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { useContext } from "react";
import UsernameContext from "../UsernameContext";

function UserName() {
  const [submittedName, setSubmittedName] = useState("");
  const initialUserName = useContext(UsernameContext);

  const Paragraph = styled.p`
    width: fit-content;
    margin-left: 10px;
    font-size: 18px;
    padding: 10px;
    color: var(--main-color);
    border-radius: 16px;
  `;

  const Hellomessage = ({ userName }) => {
    return <Paragraph>Hej {userName || initialUserName}!</Paragraph>;
  };

  Hellomessage.propTypes = {
    userName: PropTypes.string.isRequired,
  };

  return (
    <>
      <Formik
        initialValues={{ userName: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            setSubmitting(false);
            setSubmittedName(values.userName);
            resetForm();
          }, 1000);
        }}
        validate={(values) => {
          const errors = {};

          if (values.userName.trim() === "") {
            errors.userName = "Vänligen fyll i ditt namn";
          }
          return errors;
        }}>
        {({ handleChange, handleSubmit, isSubmitting, values, errors }) => (
          <>
            <form onSubmit={handleSubmit}>
              <label>
                Ditt namn
                <input
                  name='userName'
                  onChange={handleChange}
                  type='text'
                  value={values.userName}
                />
              </label>
              <span className='errors'>{errors.userName}</span>
              <input
                className='submit'
                value='Skicka'
                disabled={isSubmitting}
                type='submit'
              />
            </form>
            <Hellomessage userName={submittedName} />
          </>
        )}
      </Formik>
    </>
  );
}

export default UserName;
