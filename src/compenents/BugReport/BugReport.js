import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import './BugReport.css';
import { POST } from '../utils/API';

export function BugReport() {
  const navigate = useNavigate();

  function bugReport() {
    const title = document.getElementById("bug-title").value;
    const description = document.getElementById("bug-description").value;
    console.log(title + " " + description);

    const report = {
      "Title": title,
      "Description": description
    }

    if(!checkFields(report, ['Title', 'Description']) ) {
      alert("Please, fill all fields");
      return;
    }
    console.log(report);

    POST("reportBug",report).then((response) => {
      console.log(response);
      toast(" Report sent successfully", { type: 'success' });
      document.getElementById("bug-title").value = "";
      document.getElementById("bug-description").value = "";
      navigate('/bug');
    })
    .catch((error) => {
      console.log(error);
      toast("Report wasn't sent", { type: 'error' });
    });
  }

  function checkFields(requestObject, fields) {
    return fields.every(k => (k in requestObject && requestObject[k] && requestObject[k].trim().length > 0))
  }

  return (
    <div className="bug-report">
      <div className="bug-card">
        <h1> Report a Bug </h1>
        <form className="bug">
          <h2> Title </h2>
          <input type="text" className="bug-title" id="bug-title" />
          <h2> Description </h2>
          <textarea className="bug-description" id="bug-description"></textarea>
        </form>
        <div className="submit">
          <input type="submit" className="block-button-small" onClick={bugReport} />
        </div>
      </div>
    </div>
  );
}

