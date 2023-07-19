import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./charSearchForm.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";

const CharSearchForm = () => {
  const [charId, setCharId] = useState("");
  const [isFoundCharacter, setFoundCharacter] = useState(null);
  const { error, loading, getCharacterByName, clearError } = useMarvelService();

  const handleResponse = (res) => {
    if (res.data.count) {
      const charID = res.data.results[0].id;

      setFoundCharacter(true);
      setCharId(charID);
    } else {
      setFoundCharacter(false);
    }
  };

  const displayMessage = (charName) => {
    if (isFoundCharacter) {
      return (
        <div className="char__search-wrapper">
          <div className="char__search-success">
            {`There is! Visit ${charName} page`}
          </div>

          <Link to={`${charId}`} className="button button__secondary">
            <div className="inner">to page</div>
          </Link>
        </div>
      );
    } else if (isFoundCharacter === false) {
      return (
        <div className="char__search-error">
          The character was not found. Check the name and try again
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Formik
      initialValues={{ charName: "" }}
      validationSchema={Yup.object({
        charName: Yup.string()
          .max(30, "Must be 30 characters or less")
          .min(3, "Min should be 3 characters ")
          .required("This field is required"),
      })}
      onSubmit={(values) => {
        getCharacterByName(values.charName).then(handleResponse);
      }}
    >
      {({ errors, values }) => (
        <Form className="char__search-form">
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
            <button type="submit" className="button button__main">
              <div className="inner">find</div>
            </button>
          </div>
          <ErrorMessage
            component="div"
            name="charName"
            className="char__search-error"
          />
          {errors.charName ? null : displayMessage(values.charName)}
        </Form>
      )}
    </Formik>
  );
};

export default CharSearchForm;
