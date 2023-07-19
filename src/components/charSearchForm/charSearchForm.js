import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./charSearchForm.scss";
import { Formik, Field, Form, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import MarvelService from "../../services/MarvelService";

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = MarvelService();

  const onCharLoaded = (char) => {
    setChar(char.data.results)
  };

  const updateChar = (res) => {
    
    clearError();
    getCharacterByName(res).then(onCharLoaded);
  };

  const errorMessage = error ? "ERROR" : null;
  const displayMessage = () => {
    if (!char) {
      return null
    } 

    if (char.length > 0) {
      return (
        <div className="char__search-wrapper">
          <div className="char__search-success">
            {`There is! Visit ${char[0].name} page`}
          </div>

          <Link to={`/characters/${char[0].id}`} className="button button__secondary">
            <div className="inner">to page</div>
          </Link>
        </div>
      );
    } else if (char.length === 0) {
      return (
        <div className="char__search-error">
          The character was not found. Check the name and try again
        </div>
      );
    } 
  };

  return (
    <div className="char__search-form">
    <Formik
      initialValues={{ charName: "" }}
      validationSchema={Yup.object({
        charName: Yup.string()
          .max(30, "Must be 30 characters or less")
          .min(3, "Min should be 3 characters ")
          .required("This field is required"),
      })}
      onSubmit={({charName}) => {
        updateChar(charName)
      }}
    >
        <Form >
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button type="submit" className="button button__main" disabled={loading}>
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage
            component="div"
            name="charName"
            className="char__search-error"
          />
        </Form>
    </Formik>
    {errorMessage}
    {displayMessage()}
    </div>
    
  );
};

export default CharSearchForm;
