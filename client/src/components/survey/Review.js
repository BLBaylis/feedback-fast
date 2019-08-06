import React from 'react';

const Review = ({ formProps }) => {
  const {
    surveyName,
    surveySubject,
    surveyBody,
    surveyRecipients
  } = formProps.values;
  console.log(formProps);
  return (
    <React.Fragment>
      <h1>Review</h1>
      <div>Survey Name</div>
      <div>{surveyName}</div>
      <div>Subject</div>
      <div>{surveySubject}</div>
      <div>Body</div>
      <div>{surveyBody}</div>
      <div>Recipients</div>
      <div>{surveyRecipients}</div>
    </React.Fragment>
  );
};

export default Review;
