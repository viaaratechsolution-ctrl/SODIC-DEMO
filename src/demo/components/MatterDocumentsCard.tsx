import React, { useRef, useState } from 'react';
import {
  Download,
  Eye,
  FileText,
  MoreVertical,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { MatterDocument } from '../demoTypes';

interface MatterDocumentsCardProps {
  documents: MatterDocument[];
  allowUpload?: boolean;
  onAddDocument?: (doc: MatterDocument) => void;
  onRemoveDocument?: (docId: string) => void;
  onShowToast: (msg: string) => void;
}

export const MatterDocumentsCard: React.FC<MatterDocumentsCardProps> = ({
  documents,
  allowUpload = false,
  onAddDocument,
  onRemoveDocument,
  onShowToast,
}) => {
  const { t, pick } = useLanguage();
  const docsT = t.demoUi.documents;
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onAddDocument) return;

    const ext = file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOC';
    const sizeLabel =
      file.size >= 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(12, Math.round(file.size / 1024))} KB`;

    onAddDocument({
      id: `doc-${Date.now()}`,
      name: file.name,
      nameEn: file.name,
      type: ext,
      size: sizeLabel,
      statusLabel: 'تم الرفع',
      statusLabelEn: 'Uploaded',
      url: URL.createObjectURL(file),
    });
    e.target.value = '';
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-2.5 text-start">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <FileText className="size-3.5 text-slate-500" />
          <h5 className="text-[13px] font-bold text-slate-900 tabular-nums">
            {docsT.title(documents.length)}
          </h5>
        </div>
        <span dir="ltr" className="text-[10px] font-medium text-slate-400">
          PDF / DOC
        </span>
      </div>

      {documents.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 text-center">
          {docsT.empty}
        </p>
      ) : (
        <div className="space-y-2">
          {documents.map((doc) => {
            const isPdf = doc.type === 'PDF';
            const menuOpen = openMenuId === doc.id;
            const docName = pick(doc.name, doc.nameEn);
            const docStatus = pick(doc.statusLabel, doc.statusLabelEn);

            return (
              <div
                key={doc.id}
                className="relative rounded-xl border border-slate-100 bg-slate-50/75 px-3 py-2.5 flex items-center gap-2.5"
              >
                <span
                  className={`px-1.5 py-1 rounded-md text-[9.5px] font-extrabold shrink-0 ${
                    isPdf
                      ? 'bg-[#fde8e8] text-[#b42318]'
                      : 'bg-[#e3f5f1] text-[#0b7a6c]'
                  }`}
                >
                  {doc.type}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] font-bold text-slate-900 truncate">
                    {docName}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 tabular-nums">
                    {doc.size} · {docStatus}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenMenuId((prev) => (prev === doc.id ? null : doc.id))}
                  aria-label={docsT.optionsLabel(docName)}
                  aria-expanded={menuOpen}
                  className="min-w-[36px] min-h-[36px] -me-1 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer shrink-0"
                >
                  <MoreVertical className="size-4" />
                </button>

                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute end-2 top-11 z-30 w-36 rounded-xl bg-white border border-slate-200 shadow-lg p-1"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setOpenMenuId(null);
                        onShowToast(docsT.previewToast(docName));
                      }}
                      className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <Eye className="size-3.5 text-teal-600" />
                      <span>{docsT.preview}</span>
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setOpenMenuId(null);
                        onShowToast(docsT.downloadToast(docName));
                      }}
                      className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <Download className="size-3.5 text-teal-600" />
                      <span>{docsT.download}</span>
                    </button>
                    {onRemoveDocument && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setOpenMenuId(null);
                          onRemoveDocument(doc.id);
                        }}
                        className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-[#b42318] hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                        <span>{t.demoUi.common.delete}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {allowUpload && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            onChange={handleUploadChange}
            className="hidden"
            aria-label={docsT.uploadAriaLabel}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full min-h-[72px] rounded-xl border border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-300 flex flex-col items-center justify-center gap-1 py-3 px-4 transition cursor-pointer"
          >
            <UploadCloud className="size-5 text-[#0d9488]" />
            <span className="text-[11.5px] font-bold text-[#0d9488]">
              {docsT.uploadTitle}
            </span>
            <span className="text-[9.5px] text-slate-400">
              {docsT.uploadSubtitle}
            </span>
          </button>
        </>
      )}
    </div>
  );
};
