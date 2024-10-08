import { useState } from "react";
import styles from "./style.module.css";
import { API_URL } from "../../constants";
import Dropzone from "react-dropzone";

export default function AddEducationForm({ setShowForm, addEducation }) {
  const [course, setCourse] = useState("");
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [logo, setLogo] = useState(null);

  const handleAddEducation = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course", course);
    formData.append("school", school);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("grade", grade);
    if (logo) {
      formData.append("logo", logo);
    }

    try {
      const response = await fetch(`${API_URL}/resume/education`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newEducation = await response.json();
        addEducation(newEducation);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleAddEducation}>
      <div className={styles.formBody}>
        {/* Form Fields */}
        <div className={styles.inputs}>
          <label htmlFor="course">Course: </label>
          <input
            type="text"
            name="course"
            id="course"
            placeholder="Add course name..."
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="school">School: </label>
          <input
            type="text"
            name="school"
            id="school"
            placeholder="Add school name..."
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="startDate">Start Date: </label>
          <input
            type="text"
            name="startDate"
            id="startDate"
            placeholder="Ex: October 2021..."
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="endDate">End Date: </label>
          <input
            type="text"
            name="endDate"
            id="endDate"
            placeholder="Ex: October 2022..."
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="grade">Grade: </label>
          <input
            type="text"
            name="grade"
            id="grade"
            placeholder="Add grade..."
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>

        {/* Logo Upload Section */}
        <div className={styles.inputs}>
          <label htmlFor="logo">Logo: </label>
          <Dropzone onDrop={(acceptedFiles) => setLogo(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <section className={styles.dropzoneContainer} {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={styles.dropzoneContent}>
                  <p className={styles.dropzoneText}>
                    Drag & drop your file here, or{" "}
                    <span className={styles.browseText}>browse</span> to select
                    a file.
                  </p>
                  {logo && (
                    <p className={styles.fileName}>
                      Selected file: {logo.name}
                    </p>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>

      <div className={styles.formButtons}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
