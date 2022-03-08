// @ts-nocheck
import { React, useState, useEffect } from "react";
import {
  Textarea,
  TextField,
  Form,
  CheckboxField,
  FieldGroup,
} from "@contentful/forma-36-react-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
interface FieldProps {
  sdk: FieldExtensionSDK;
}
const Field = (props: FieldProps) => {
  const [field, setField] = useState(
    props.sdk.field.getValue() ?? { title: "", description: "" }
  );

  const { hideTextLabel = "Hide", showTextLabel = "Show" } = props.sdk.parameters.instance;
  const [agreeTerms, setTerms] = useState(true);

  useEffect(() => {
    props.sdk.window.startAutoResizer();
  }, []);

  useEffect(() => {
    if (!!agreeTerms) {
      props.sdk.field.removeValue();
      setField({ title: "", description: "" })
    }
  }, [agreeTerms])


  const handleDescriptionChange = (e) => {
    const value = {
      ...field,
      description: e.target.value,
    };
    props.sdk.field.setValue(value);
    setField(value);
  };

  const handleTitleChange = (e) => {
    const value = {
      ...field,
      title: e.target.value,
    };
    props.sdk.field.setValue(value);
    setField(value);
  };

  return (
    <Form className="cond-wrap">
      <FieldGroup>
        <CheckboxField
          labelText={agreeTerms ? hideTextLabel : showTextLabel}
          value="Yes"
          onChange={(e) => setTerms(!agreeTerms)}
          checked={agreeTerms}
          id="termsCheckboxYesNo"
        />
        {agreeTerms && (
          <div className="cond-fields">
            <TextField
              onChange={handleTitleChange}
              textInputProps={{ placeholder: "Title" }}
              value={field.title}
              id="title"
            />
            <Textarea
              placeholder="Description"
              onChange={handleDescriptionChange}
              value={field.description}
              id="description"
            />
          </div>
        )}
        </FieldGroup>
    </Form>
  );
};
export default Field;
