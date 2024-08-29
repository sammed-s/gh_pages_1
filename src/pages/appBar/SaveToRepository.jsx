import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaveToRepository } from "../../redux/actions/navbarActions";
import { BeatLoader } from "react-spinners";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const formFields = [
  { label: "Author Name", type: "text", field: "name" },
  { label: "Article/Paper/Thesis Title", type: "text", field: "title" },
  { label: "Published Year", type: "number", field: "year" },
];

const SaveToRepository = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.navbar.isLoading);
  const repositoryInputs = useSelector(
    (state) => state.sourcematch.data.repositoryInputs,
  );

  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: repositoryInputs.name || "",
    title: repositoryInputs.title || "",
    year: repositoryInputs.year || "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    title: false,
    year: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    let isValid = true;
    let errors = { ...formErrors };
    errors.name = formData.name.trim() === "";
    isValid = isValid && !errors.name;
    errors.title = formData.title.trim() === "";
    isValid = isValid && !errors.title;
    const isYearValid =
      /^\d{4}$/.test(formData.year) &&
      formData.year >= 2000 &&
      formData.year <= currentYear;
    errors.year = !isYearValid;
    isValid = isValid && isYearValid;

    setFormErrors(errors);
    setIsFormValid(isValid);
  }, [formData, currentYear]);

  const handleChange = (field) => (event) => {
    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(fetchSaveToRepository(formData));
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {formFields.map(({ label, type, field }) => (
          <TextField
            key={field}
            label={label}
            variant="outlined"
            type={type}
            size="small"
            style={{ marginBottom: "10px" }}
            value={formData[field]}
            onChange={handleChange(field)}
            required
            fullWidth
            error={formErrors[field]}
            helperText={
              formErrors[field] ? `${label} is required and must be valid.` : ""
            }
            inputProps={{
              style: {
                padding: "12px 14px",
              },
            }}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? <BeatLoader color="#fff" size={12} /> : "Save"}
        </Button>
      </form>
    </Container>
  );
};

export default SaveToRepository;
