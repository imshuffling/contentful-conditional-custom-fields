// @ts-nocheck
import { useState, useEffect } from "react";
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
  const { sdk } = props;
  const [agreeTerms, setTerms] = useState(true);
  const [field, setField] = useState(
    sdk.field.getValue() ?? { open: false, title: "", description: "" }
  );

  const { hideTextLabel = "Hide", showTextLabel = "Show" } = sdk.parameters.instance;

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, []);

  useEffect(() => {
    if (!agreeTerms) {
      sdk.field.removeValue();
      setField({ open: false, title: "", description: "" })
    }
  }, [agreeTerms])


  const handleDescriptionChange = (e) => {
    const value = {
      ...field,
      open: true,
      description: e.target.value,
    };
    sdk.field.setValue(value);
    setField(value);
  };

  const handleTitleChange = (e) => {
    const value = {
      ...field,
      open: true,
      title: e.target.value,
    };
    sdk.field.setValue(value);
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
