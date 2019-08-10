module.exports = arr => arr.filter(({ email: currEmail, surveyId: currSurveyId }, index) => {
  // if last element in arr, keep it
  if (index === arr.length - 1) {
    return true;
  }
  // if there are no other elements with same email further on in arr, keep it
  const remainingElementsArr = arr.slice(index + 1);
  const remainingElementsEmailArr = remainingElementsArr.map(({ email }) => email);
  if (remainingElementsEmailArr.indexOf(currEmail) === -1) {
    return true;
  }
  // get all elements with matching email further on in arr
  const elementsWithMatchingEmails = remainingElementsArr.filter(
    ({ email }) => email === currEmail,
  );
    /* if any of the other elements with matching email also have matching surveyId,
      drop this element */
  return !elementsWithMatchingEmails.some(({ surveyId }) => surveyId === currSurveyId);
});
