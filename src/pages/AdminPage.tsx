import { useEffect, useState } from 'react';
import {
  fetchAdminUsers,
  fetchAdminUserDetail,
  deleteAdminUser,
  type AdminUserSummary,
  type AdminUserDetail,
} from '../lib/adminApi';
import { cardClass, inputClass } from '../styles/formStyles';

function formatDate(iso: string | null): string {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('ko-KR');
}

interface DetailViewProps {
  uid: string;
  onBack: () => void;
  onDeleted: () => void;
}

function AdminUserDetailView({ uid, onBack, onDeleted }: DetailViewProps) {
  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
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

  return (
    <div className="flex flex-col gap-gutter">
      <button type="button" onClick={onBack} className="text-label-lg text-on-surface-variant self-start">
        ← 목록으로
      </button>

      <div className={`${cardClass} flex flex-col gap-2 p-4`}>
        <h3 className="text-headline-md text-primary">{user.email}</h3>
        <p className="text-label-sm text-on-surface-variant">가입일 {formatDate(user.createdAt)}</p>
        {user.isAdmin && <span className="text-label-sm text-secondary font-bold">관리자</span>}
      </div>

      <div className={`${cardClass} flex flex-col gap-2 p-4`}>
        <h4 className="text-label-lg text-primary">프로필</h4>
        {profile ? (
          <ul className="text-body-md text-on-surface flex flex-col gap-1">
            <li>금연 시작일: {formatDate(profile.quitDateTime)}</li>
            <li>나이: {profile.age}</li>
            <li>하루 평균 흡연량: {profile.cigarettesPerDay}개비</li>
            <li>
              가격: {profile.pricePerPack.toLocaleString()}원 / {profile.cigarettesPerPack}개비
            </li>
            <li>금연 이유: {profile.quitReason}</li>
            {profile.bodyConditions.length > 0 && <li>불편한 신체 부위: {profile.bodyConditions.join(', ')}</li>}
          </ul>
        ) : (
          <p className="text-body-md text-on-surface-variant">아직 온보딩을 완료하지 않았어요</p>
        )}
      </div>

      <div className={`${cardClass} flex flex-col gap-2 p-4`}>
        <h4 className="text-label-lg text-primary">목표 물건 ({goals.length})</h4>
        {goals.length === 0 && <p className="text-body-md text-on-surface-variant">없음</p>}
        {goals.map((g) => (
          <div key={g.id} className="border-outline-variant flex items-center justify-between border-t pt-2 first:border-t-0 first:pt-0">
            <span className="text-body-md">
              {g.name} ({g.status === 'achieved' ? '달성' : '진행중'})
            </span>
            <span className="text-label-sm text-on-surface-variant">{g.targetPrice.toLocaleString()}원</span>
          </div>
        ))}
      </div>

      <div className={`${cardClass} flex flex-col gap-2 p-4`}>
        <h4 className="text-label-lg text-primary">충동 대응 기록 ({cravingEvents.length})</h4>
        {cravingEvents.length === 0 && <p className="text-body-md text-on-surface-variant">없음</p>}
        {cravingEvents.slice(0, 20).map((e) => (
          <div key={e.id} className="border-outline-variant flex items-center justify-between border-t pt-2 first:border-t-0 first:pt-0">
            <span className="text-body-md">{new Date(e.timestamp).toLocaleString('ko-KR')}</span>
            <span className="text-label-sm text-on-surface-variant">{e.completed ? '참음' : '포기'}</span>
          </div>
        ))}
      </div>

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
