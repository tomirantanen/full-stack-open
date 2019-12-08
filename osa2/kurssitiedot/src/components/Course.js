import React from "react";

const CourseHeader = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ course }) => (
  <>
    {course.parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Total = ({ course }) => {
  const sum = course.parts
    .map(part => part.exercises)
    .reduce((a, b) => a + b, 0);

  return <b>Total of {sum} exercises</b>;
};

const Course = ({ course }) => (
  <>
    <CourseHeader course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

export default Course;
