import { useState, useCallback } from 'react';
import { ResumeModal } from './ResumeModal';
import type { ResumeContent } from '../../types/content';

function IconDocument() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

interface ResumeButtonProps {
  resume: ResumeContent;
  className?: string;
}

export function ResumeButton({ resume, className }: ResumeButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        <IconDocument /> Резюме
      </button>
      {open && <ResumeModal resume={resume} onClose={close} />}
    </>
  );
}
