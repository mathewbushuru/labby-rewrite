export class Question {
    insertQuestion(newQuestion, result) {
        // con.query('CALL insertQuestion(?, ?)', [newQuestion.question_id, newQuestion.question_title], (err, res) => {
        //     if (err) {
        //         console.log('error: ', err);
        //         result(err, null);
        //     } else {
        //         console.log(res.insertId);
        //         result(null, res.insertId);
        //     }
        // };
        result(null, { result: `Question ${newQuestion.question_title} Saved Successfully` });
    }
}
