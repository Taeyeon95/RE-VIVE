import { useEffect, useState } from 'react';
import {
  fetchAdminUsers,
  fetchAdminUserDetail,
  deleteAdminUser,
  type AdminUserSummary,
  type AdminUserDetail,
} from '../lib/adminApi';
import { cardClass, inputClass } from '../styles/formStyles';
import { HomePage } from './HomePage';
import { StatsPage } from './StatsPage';
import { SettingsPage } from './SettingsPage';
import type { CravingEvent, GoalItem } from '../types';

function formatDate(iso: string | null): string {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('ko-KR');
}

const noop = () => {};
const noopLogEvent = (): CravingEvent => ({ id: '', timestamp: '', completed: false, moneySaved: 0 });

type PreviewTab = 'home' | 'stats' | 'settings';
const PREVIEW_TABS: { key: PreviewTab; label: string }[] = [
  { key: 'home', label: '홈' },
  { key: 'stats', label: '통계' },
  { key: 'settings', label: '설정' },
];

interface DetailViewProps {
  uid: string;
  onBack: () => void;
  onDeleted: () => void;
}

function AdminUserDetailView({ uid, onBack, onDeleted }: DetailViewProps) {
  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [previewTab, setPreviewTab] = useState<PreviewTab>('home');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchAdminUserDetail(uid).then(setDetail);
  }, [uid]);

  const handleDelete = async () => {
    if (!confirm('이 사용자의 계정과 모든 데이터를 영구히 삭제할까요?')) return;
    setDeleting(true);
    await deleteAdminUser(uid);
    onDeleted();
  };

  if (!detail) {
    return <p className="text-body-md text-on-surface-variant p-4">불러오는 중...</p>;
  }

  const { user, profile, goals, cravingEvents } = detail;
  const activeGoals: GoalItem[] = goals.filter((g) => g.status === 'active');
  const achievedGoals: GoalItem[] = goals.filter((g) => g.status === 'achieved');

  return (
    <div className="flex flex-col gap-gutter">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-label-lg text-on-surface-variant">
          ← 목록으로
        </button>
        {user.isAdmin && <span className="text-label-sm text-secondary font-bold">관리자</span>}
      </div>

      <div className={`${cardClass} p-4`}>
        <h3 className="text-headline-md text-primary">{user.email}</h3>
        <p className="text-label-sm text-on-surface-variant">가입일 {formatDate(user.createdAt)}</p>
      </div>

      {!profile ? (
        <p className="text-body-md text-on-surface-variant p-4">아직 온보딩을 완료하지 않았어요</p>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-label-sm text-on-surface-variant">이 계정에 로그인했을 때 보이는 화면 (읽기 전용)</span>
            <div className="flex gap-1">
              {PREVIEW_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setPreviewTab(tab.key)}
                  className={`text-label-sm rounded-full px-3 py-1 ${
                    previewTab === tab.key ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* pointer-events-none makes every button/input inside purely visual */}
          <div className="border-outline-variant pointer-events-none overflow-hidden rounded-2xl border bg-surface">
            {previewTab === 'home' && (
              <HomePage
                profile={profile}
                activeGoals={activeGoals}
                achievedGoals={achievedGoals}
                events={cravingEvents}
                logEvent={noopLogEvent}
                achieveGoal={noop}
                onGoToSettings={noop}
              />
            )}
            {previewTab === 'stats' && (
              <StatsPage profile={profile} events={cravingEvents} achievedGoals={achievedGoals} onDeleteEvent={noop} />
            )}
            {previewTab === 'settings' && (
              <SettingsPage
                profile={profile}
                activeGoals={activeGoals}
                accountEmail={user.email}
                onOpenLogin={noop}
                onOpenSignup={noop}
                onLogOut={noop}
                onUpdateProfile={noop}
                onRestartQuitDate={noop}
                onUpdateGoal={noop}
                onCreateGoal={noop}
                onDeleteGoal={noop}
                onUpdateAccessibility={noop}
                onResetAll={noop}
              />
            )}
          </div>
        </div>
      )}

      {!user.isAdmin && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-label-lg bg-error text-on-error rounded-xl py-3 disabled:opacity-40"
        >
          {deleting ? '삭제 중...' : '계정 삭제'}
        </button>
      )}
    </div>
  );
}

export function AdminPage() {
  const [users, setUsers] = useState<AdminUserSummary[] | null>(null);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadUsers = () => {
    setUsers(null);
    fetchAdminUsers().then(setUsers);
  };

  useEffect(loadUsers, []);

  const filteredUsers = users?.filter((u) => u.email.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className="px-container-margin flex flex-col gap-gutter pt-unit pb-28">
      <h2 className="text-headline-lg-mobile text-primary">관리자</h2>

      {selectedUid ? (
        <AdminUserDetailView
          uid={selectedUid}
          onBack={() => setSelectedUid(null)}
          onDeleted={() => {
            setSelectedUid(null);
            loadUsers();
          }}
        />
      ) : (
        <>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이메일로 검색"
            className={inputClass}
          />

          {users === null && <p className="text-body-md text-on-surface-variant">불러오는 중...</p>}
          {users !== null && users.length === 0 && (
            <p className="text-body-md text-on-surface-variant">가입한 사용자가 없어요</p>
          )}
          {users !== null && users.length > 0 && filteredUsers?.length === 0 && (
            <p className="text-body-md text-on-surface-variant">검색 결과가 없어요</p>
          )}
          {filteredUsers?.map((u) => (
            <button
              key={u.uid}
              type="button"
              onClick={() => setSelectedUid(u.uid)}
              className={`${cardClass} flex flex-col gap-1 p-4 text-left`}
            >
              <div className="flex items-center justify-between">
                <span className="text-label-lg text-primary">{u.email}</span>
                {u.isAdmin && <span className="text-label-sm text-secondary font-bold">관리자</span>}
              </div>
              <span className="text-label-sm text-on-surface-variant">
                가입 {formatDate(u.createdAt)} · 금연 시작 {formatDate(u.quitDateTime)} · 목표 {u.goalCount}개 · 기록{' '}
                {u.cravingCount}개
              </span>
            </button>
          ))}
        </>
      )}
    </div>
  );
}
