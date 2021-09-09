import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button } from '@gqlapp/look-client-react';
import Upload from '../containers/Upload.web';

const postFormSchema = {
  title: [required],
  content: [required]
};

const PostForm = props => {
  let { values, handleSubmit, submitting, t, setValues } = props;
  const handlePictureChange = (response, action) => {
    if (action === 'add') {
      values.pictures.push(response);
    } else {
      let filteredPictures = values.pictures.filter(picture => picture.id !== response);
      values.pictures = filteredPictures;
    }
    setValues(values);
  };
  return (
    <Form name="post" onSubmit={handleSubmit}>
      <Field name="title" component={RenderField} type="text" label={t('post.field.title')} value={values.title} />
      <Field
        name="content"
        component={RenderField}
        type="text"
        label={t('post.field.content')}
        value={values.content}
      />
      <div className="card">
        <div className="mt-5 mb-5">
          <Upload {...props} handlePictureChange={handlePictureChange} />
        </div>
      </div>
      <Button className="mt-5" color="primary" type="submit" disabled={submitting}>
        {t('post.btn.submit')}
      </Button>
    </Form>
  );
};

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  post: PropTypes.object,
  t: PropTypes.func
};

const PostFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    title: props.post && props.post.title,
    content: props.post && props.post.content,
    pictures: props.post ? props.post.pictures : []
  }),
  validate: values => validate(values, postFormSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'PostForm' // helps with React DevTools
});

export default translate('post')(PostFormWithFormik(PostForm));
