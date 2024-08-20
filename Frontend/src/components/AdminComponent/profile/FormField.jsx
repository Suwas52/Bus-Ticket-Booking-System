// Reusable form field component
const FormField = ({ label, name, type, placeholder }) => (
    <Form.Group as={Row} controlId={`form${label}`}>
      <Form.Label column sm={3}>
        {label}
      </Form.Label>
      <Col sm={9}>
        <Field
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
        />
        <ErrorMessage name={name} component="div" className="text-danger" />
      </Col>
    </Form.Group>
  );

  export default FormField;