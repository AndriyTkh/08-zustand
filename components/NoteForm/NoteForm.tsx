'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { createNote } from '../../lib/api';
import css from './NoteForm.module.css';
import { CreateNoteDto } from '@/types/CreateNoteDto';

const TAG_OPTIONS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content must be at most 500 characters')
    .notRequired(),
  tag: Yup.string()
    .oneOf(TAG_OPTIONS, 'Invalid tag')
    .required('Tag is required'),
});

const initialValues: CreateNoteDto = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values, {
          onSuccess: () => {
            resetForm();
            onClose();
          },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field name="content" as="textarea" className={css.textarea} rows={5} />
            <ErrorMessage name="content" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" as="select" className={css.select}>
              {TAG_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create Note'}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
