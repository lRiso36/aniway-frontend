import type { AnimeType } from '../../types/AnimeType.types';
import type {
  UserAnimeEntry,
  UserAnimeStatus,
} from '../../types/UserAnimeEntryType.types';
import { useState } from 'react';
import { NumberStepper } from '../ui/NumberStepper';
import { useLogModal } from '../../hooks/useLogModal';
import { StatusDropdown } from '../ui/StatusDropdwon';
import { FieldLabel } from '../ui/LogFieldLabel';
import type { LogFormData } from '../../types/LogFormData.types';
import { statusOptions } from '../../data/statusOptions';
import { Heart } from 'lucide-react';
import { useToggleFavorite } from '../../hooks/useToggleFavorite';

type LogModalTypes = {
  isOpen: boolean;
  onClose: () => void;
  anime: AnimeType;
  currentEntry?: UserAnimeEntry;
  onSave: (updated: UserAnimeEntry) => void;
};

export const LogModal = ({
  isOpen,
  onClose,
  currentEntry,
  anime,
  onSave,
}: LogModalTypes) => {
  const initialFormData: LogFormData = {
    status: currentEntry?.status ?? undefined,
    currentEpisode: currentEntry?.currentEpisode ?? 0,
    score: currentEntry?.score ?? 0,
    startDate: currentEntry?.startDate ?? '',
    finishDate: currentEntry?.finishDate ?? '',
    totalRewatches: currentEntry?.totalRewatches ?? 0,
    notes: currentEntry?.notes ?? '',
  };
  const [formData, setFormData] = useState<LogFormData>(initialFormData);
  const { isFavorite, setIsFavorite } = useToggleFavorite(
    anime._id,
    currentEntry?.isFavorite ?? false
  );

  const updateField = <K extends keyof LogFormData>(
    key: K,
    value: LogFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const todayString = () => new Date().toISOString().split('T')[0]; // "2026-08-23"

  const handleStatusChange = (newStatus: UserAnimeStatus) => {
    setFormData((prev) => {
      const next = { ...prev, status: newStatus };

      if (newStatus === 'completed' && anime.episodeCount) {
        next.currentEpisode = anime.episodeCount;
        next.finishDate = todayString();
      }
      if (newStatus === 'watching' || newStatus === 'rewatching') {
        next.startDate = todayString();
      }

      return next;
    });
  };

  const { isSaving, handleSave } = useLogModal(anime, currentEntry, onSave);

  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto"
      onMouseDown={handleBackdropMouseDown}
    >
      <div className="bg-[#1e1e2e] rounded-xl w-full max-w-3xl border border-white/10">
        {/* outer wrapper — poster is positioned relative to this */}
        <div className="relative rounded-t-xl">
          {/* banner */}
          <div className="h-40 sm:h-50 relative overflow-hidden rounded-t-xl mb-8 sm:mb-12">
            {anime.bannerImage && (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${anime.bannerImage})` }}
                />
                <div className="absolute inset-0 bg-[#1e1e2e]/60" />
              </>
            )}

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 w-7 h-7 rounded-md bg-black/30 flex items-center justify-center text-white/70 hover:text-white transition-colors z-20"
            >
              ✕
            </button>

            {/* title + heart + save — pinned to banner's bottom edge */}
            <div className="absolute bottom-3 left-28 sm:left-44 right-4 sm:right-6 flex items-center gap-2 sm:gap-4 z-20">
              <p className="text-white font-semibold text-sm sm:text-lg flex-1 min-w-0 line-clamp-3 drop-shadow-lg">
                {anime.titleEnglish ?? anime.titleRomaji}
              </p>
              <Heart
                className={`w-4 h-4 sm:w-5.5 sm:h-5.5 shrink-0 cursor-pointer transition-transform duration-200 hover:scale-125 active:scale-90 ${isFavorite ? 'text-red-400' : 'text-white'} transition`}
                {...(isFavorite ? { fill: 'currentColor' } : {})}
                onClick={() => setIsFavorite(!isFavorite)}
              />
              <button
                onClick={() => handleSave(formData)}
                disabled={isSaving}
                className={`bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shrink-0 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* poster — sibling of banner, escapes below it freely */}
          <img
            src={anime.coverLarge}
            alt={anime.titleEnglish ?? anime.titleRomaji}
            className="absolute bottom-0 translate-y-1/6 left-4 sm:left-8 w-20 sm:w-28 aspect-[3/4] object-cover rounded-lg z-30 shadow-lg"
          />
        </div>

        {/* fields */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <div>
            <FieldLabel>Status</FieldLabel>
            <StatusDropdown
              value={formData.status}
              onChange={handleStatusChange}
              options={statusOptions}
            />
          </div>

          <div>
            <FieldLabel>Score</FieldLabel>
            <NumberStepper
              value={formData.score}
              onChange={(newScore) => updateField('score', newScore)}
              max={10}
              step={0.1}
            />
          </div>

          <div>
            <FieldLabel>Episode Progress</FieldLabel>
            <NumberStepper
              value={formData.currentEpisode}
              onChange={(newCurr) => updateField('currentEpisode', newCurr)}
              max={anime.episodeCount ?? 0}
            />
          </div>

          <div>
            <FieldLabel>Start Date</FieldLabel>
            <input
              type="date"
              value={formData.startDate}
              onChange={(newStart) =>
                updateField('startDate', newStart.target.value)
              }
              className="bg-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 border border-white/10 w-full"
            />
            <button
              onClick={() => updateField('startDate', '')}
              className="text-white/30 hover:text-white/60 transition-colors shrink-0"
            >
              ✕
            </button>
          </div>

          <div>
            <FieldLabel>Finish Date</FieldLabel>
            <input
              type="date"
              value={formData.finishDate}
              onChange={(newEnd) =>
                updateField('startDate', newEnd.target.value)
              }
              className="bg-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 border border-white/10 w-full"
            />
          </div>

          <div>
            <FieldLabel>Total Rewatches</FieldLabel>
            <NumberStepper
              value={formData.totalRewatches}
              onChange={(newRewatch) =>
                updateField('totalRewatches', newRewatch)
              }
              max={1000}
            />
          </div>

          <div className="sm:col-span-3">
            <FieldLabel>Notes</FieldLabel>
            <textarea
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={3}
              className="bg-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 border border-white/10 w-full resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
