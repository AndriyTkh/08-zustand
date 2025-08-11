"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import { CreateNoteDto } from "@/types/CreateNoteDto";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";

const TAG_OPTIONS = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string()
    .max(500, "Content must be at most 500 characters")
    .notRequired(),
  tag: Yup.string()
    .oneOf(TAG_OPTIONS, "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [formData, setFormData] = useState<CreateNoteDto>(draft);
  const [errors, setErrors] = useState<Partial<CreateNoteDto>>({});

  useEffect(() => {
    setFormData(draft);
  }, [draft]);


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDraft({ [name]: value });
  }

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back(); 
    },
  });

  async function handleSubmit(form: FormData) {
    const values: CreateNoteDto = {
      title: form.get("title") as string,
      content: (form.get("content") as string) || "",
      tag: form.get("tag") as string,
    };

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      mutation.mutate(values);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Partial<CreateNoteDto> = {};
        err.inner.forEach((e) => {
          if (e.path) {
            newErrors[e.path as keyof CreateNoteDto] = e.message;
          }
        });
        setErrors(newErrors);
      }
    }
  }


  function handleCancel() {
    router.back();
  }

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={css.input}
        />
        {errors.title && <div className={css.error}>{errors.title}</div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={5}
          value={formData.content}
          onChange={handleChange}
          className={css.textarea}
        />
        {errors.content && <div className={css.error}>{errors.content}</div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={css.select}
        >
          {TAG_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.tag && <div className={css.error}>{errors.tag}</div>}
      </div>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Note"}
        </button>

        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
