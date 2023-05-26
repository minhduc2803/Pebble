import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import { Button, Modal } from 'react-bootstrap';

import { shareVideo } from 'app/actions/video';
import { VideoFormData } from 'app/types/video';
import { alertSuccess } from 'app/utils/alert';

import Field from 'app/components/form/Field';
import TextAreaField from 'app/components/form/TextAreaField';
import SubmitButton from 'app/components/form/SubmitButton';

import styles from './ShareVideoModal.module.css';

const ShareVideoModal = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (values: VideoFormData) => {
    dispatch(
      shareVideo(values, () => {
        alertSuccess('Video share successfully');
        handleClose();
      }),
    );
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Share a video
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share a Youtube video</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <Field name="url" component="input" label="Youtube URL" />
                <Field name="title" component="input" label="Title" />
                <TextAreaField name="desription" label="Desription" />
              </Modal.Body>
              <Modal.Footer className={styles.footer}>
                <SubmitButton>Share</SubmitButton>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  );
};

export default ShareVideoModal;
