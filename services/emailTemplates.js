const keys = require('../config/keys');

module.exports = survey => `<html>
            <body>
                <div style="text-align: center">
                    <h3>Tell us about your experience!</h3>
                    <p>${survey.body}</p>
                    <div><a href=${keys.formRedirect}/api/surveys/feedback>YES</a></div> 
                    <div><a href=${keys.formRedirect}/api/surveys/feedback>NO</a></div> 
                </div>
            </body>
        </html>`;
