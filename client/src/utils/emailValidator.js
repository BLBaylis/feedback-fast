export default emails => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const formattedEmails = emails.split(',').map(email => email.trim());
  const invalidEmails = formattedEmails.filter(
    email => regex.test(email) === false
  );
  const emailCountObj = formattedEmails.reduce((emailObj, currEmail) => {
    return {
      ...emailObj,
      [currEmail]: (emailObj[currEmail] || 0) + 1
    };
  }, {});
  const duplicateEmails = Object.keys(emailCountObj).filter(
    email => emailCountObj[email] > 1
  );
  const validEmails = formattedEmails.filter(email => regex.test(email));
  return { validEmails, invalidEmails, duplicateEmails };
};
