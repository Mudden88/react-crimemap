import styled from "styled-components";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";

function UserName() {
  const [submittedName, setSubmittedName] = useState("");

  const Paragraph = styled.p`
    border-bottom: 1px solid var(--orange-color);
    width: fit-content;
    margin-left: 10px;
    font-size: 18px;
  `;

  const Hellomessage = ({ userName }) => {
    return <Paragraph>Hej {userName || "Anonym"}!</Paragraph>;
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
