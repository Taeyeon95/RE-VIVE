import { ProfileSettingsForm } from '../components/settings/ProfileSettingsForm';
import { GoalSettingsForm } from '../components/settings/GoalSettingsForm';
import { AccessibilitySettingsForm } from '../components/settings/AccessibilitySettingsForm';
import { AccountSection } from '../components/settings/AccountSection';
import { DataResetSection } from '../components/settings/DataResetSection';
import type { AccessibilitySettings, GoalItem, UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  activeGoals: GoalItem[];
  accountEmail: string | null;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogOut: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onRestartQuitDate: () => void;
  onUpdateGoal: (id: string, updates: Partial<GoalItem>) => void;
  onCreateGoal: (goal: Omit<GoalItem, 'id' | 'status' | 'createdAt'>) => void;
  onDeleteGoal: (id: string) => void;
  onUpdateAccessibility: (updates: Partial<AccessibilitySettings>) => void;
  onResetAll: () => void;
}

export function SettingsPage({
  profile,
  activeGoals,
  accountEmail,
  onOpenLogin,
  onOpenSignup,
  onLogOut,
  onUpdateProfile,
  onRestartQuitDate,
  onUpdateGoal,
  onCreateGoal,
  onDeleteGoal,
  onUpdateAccessibility,
  onResetAll,
}: Props) {
  return (
    <div className="flex flex-col gap-8 p-5 pb-24">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">설정</h1>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">계정</h2>
        <AccountSection
          email={accountEmail}
          onOpenLogin={onOpenLogin}
          onOpenSignup={onOpenSignup}
          onLogOut={onLogOut}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">프로필</h2>
        <ProfileSettingsForm profile={profile} onSave={onUpdateProfile} onRestartQuitDate={onRestartQuitDate} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">목표 물건</h2>
        <GoalSettingsForm
          activeGoals={activeGoals}
          onUpdateGoal={onUpdateGoal}
          onCreateGoal={onCreateGoal}
          onDeleteGoal={onDeleteGoal}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">접근성</h2>
        <AccessibilitySettingsForm accessibility={profile.accessibility} onChange={onUpdateAccessibility} />
      </section>

      <DataResetSection onResetAll={onResetAll} />
    </div>
  );
}
