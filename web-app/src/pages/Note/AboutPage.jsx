import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";
import OftadehBreadcrumbs from "../../components/OftadehBreadcrumbs/OftadehBreadcrumbs";

const AboutPage = props => {
  const editor = useRef(null);
  const [bodyPost, setBodyPost] = useState(
    
  );

  const { history } = props;

  return (
    <OftadehLayout>
      <h1>Notes</h1>
      <OftadehBreadcrumbs path={history} />
      <JoditEditor
        ref={editor}
        value={bodyPost}
        config={{
          readonly: false,
          style: {
            height: "350px"
          }
        }}
        tabIndex={1}
        onBlur={value => setBodyPost(value)}
        onChange={value => {}}
      />
    </OftadehLayout>
  );
};

export default AboutPage;
