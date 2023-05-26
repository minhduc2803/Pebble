import { shareVideo } from 'app/actions/video';
import { VideoFormData } from 'app/types/video';
import { alertSuccess } from 'app/utils/alert';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';

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
                <div>
                  <label>Youtube URL</label>
                  <Field name="url" component="input" />
                </div>
                <div>
                  <label>Title</label>
                  <Field name="title" component="input" />
                </div>
                <div>
                  <label>Desription</label>
                  <Field name="desription" component="textarea" />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" type="submit">
                  Share
                </Button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  );
};

export default ShareVideoModal;
